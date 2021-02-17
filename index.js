$(document).ready(function () {
  const fs = require("fs");
  const wd_homedir = require("os").homedir();
  const appDir = (wd_home = wd_homedir + "/Documents/FI/");
  const settingsFile = `${appDir}settings.json`;
  const settings = require(settingsFile);

  $("#companyChoose").append(
    $("<option></option>").val("Select Company").html("Select Company")
  );
  $.each(settings.companyNames, function (i, p) {
    $("#companyChoose").append($("<option></option>").val(p).html(p));
  });

  $("#companyChoose").append(
    $("<option></option>").val("Add New").html("Add New")
  );

  $("#companyChoose").change(function () {
    var value = $(this).val();

    if (value === "Select Company") {
      alert("Please choose or add a new company");
      $("#companyName").addClass("hide");
    } else if (value === "Add New") {
      $("#companyForm").removeClass("hide");
      $("#select").addClass("hide");
      $("#companyName").addClass("hide");
      $("#companyChoose").addClass("hide");
    } else {
      $("#selectBut").removeClass("hide");
      $("#companyName").text(value);
      $("#companyName").removeClass("hide");
    }
  });

  $("#select").click(function () {
    $("#selectBut").addClass("hide");
    $("#companyChoose").addClass("hide");
  });

  $("#companyForm").submit(function (event) {
    let compName = $("input[name=companyname").val();
    console.log(compName);
    if (settings.companyNames.indexOf(compName) === -1) {
      settings.companyNames.push(compName);
      if (!fs.existsSync(appDir + "accounts")) {
        fs.mkdirSync(appDir + "accounts");
      }
      fs.mkdirSync(`${appDir}accounts/${compName}`);
      console.log(settings);
      fs.writeFileSync(settingsFile, JSON.stringify(settings));
    } else {
      alert("Company Already Exists");
    }
  });

  let currentYear = new Date().getFullYear();
  $("#copyrightYear").text(currentYear);

  $("#billingForm").submit(function (event) {
    var createHTML = require("create-html");

    const { shell } = require("electron"); // deconstructing assignment
    let appDir = (wd_home = wd_homedir + "/Documents/FI/");

    let firstName = $("input[name=name]").val();
    let lastName = $("input[name=lastname]").val();
    let address1 = $("input[name=address1]").val();
    let address2 = $("input[name=address2]").val();
    let city = $("input[name=city]").val();
    let state = $("input[name=state]").val();
    let postalCode = $("input[name=postalcode]").val();
    let phone = $("input[name=phone]").val();
    let email = $("input[name=email]").val();
    let totalAmount = $("input[name=totalamountdue]").val();
    let interestRate = parseFloat($("input[name=interestrate]").val());
    let dateOfFirstPayment = $("input[name=datefirstpayment").val();
    let lengthOfLoan = parseFloat($("input[name=lengthofloan").val());

    let companyName = $("#companyName").text();
    console.log("companyName");
    console.log(companyName);
    let interestPercentage = interestRate / 100;

    console.log("totalAmount - shold be number put in");
    console.log(totalAmount);

    let interest = totalAmount * interestPercentage * (lengthOfLoan / 12);

    console.log("interest");
    console.log(interest);
    let total = parseFloat(totalAmount) + parseFloat(interest);
    console.log("total amount +interest");
    console.log(total);

    let amontPerPayment = parseFloat(totalAmount) * (lengthOfLoan / 12);
    console.log("per payment");
    console.log(amontPerPayment);
    let interestPerPayment = interestPercentage * (lengthOfLoan / 12);
    console.log("interest per payment");
    console.log(interestPerPayment);
    console.log("length");
    console.log(lengthOfLoan);
    let dateArrays = [dateOfFirstPayment];
    let currentDate = dateOfFirstPayment;
    for (var i = 1; i < lengthOfLoan; i++) {
      let dateSplit = currentDate.split("-");
      let dateJoined = "";
      let month = parseInt(dateSplit[1]);
      month++;
      let year = parseInt(dateSplit[0]);

      if (month < 13) {
        if (month < 10) {
          month = "0" + month;
        }
      } else {
        month = "01";
        year++;
      }

      let newestDate = year + "-" + month + "-" + dateSplit[2];
      dateArrays.push(newestDate);
      currentDate = newestDate;
    }
    let origPaymentAmount = parseFloat(totalAmount) / parseFloat(lengthOfLoan);
    let interestAmount = parseFloat(interest) / parseFloat(lengthOfLoan);
    let paymentAmount = parseFloat(total) / parseFloat(lengthOfLoan);
    let months = {};
    months["01"] = "January";
    months["02"] = "February";
    months["03"] = "March";
    months["04"] = "April";
    months["05"] = "May";
    months["06"] = "June";
    months["07"] = "July";
    months["08"] = "August";
    months["09"] = "September";
    months["10"] = "October";
    months["11"] = "November";
    months["12"] = "December";

    let table = `<div style="text-align:center"><h1>${companyName}</h1><h2>Account Details for ${firstName} ${lastName}</h2>`;
    table += `<p><strong>Address: </strong>${address1} ${address2} ${city}, ${state} ${postalCode}</p>`;
    table += `<p><strong>Phone: </strong>${phone}`;
    table += `<p><strong>Email: </strong>${email}`;
    table += `<p><strong>Loan Amount: $</strong>${totalAmount}</p>`;
    table += `<p><strong>Total Interest: $</strong>${praseFoat(
      interest
    ).toFixed(2)}</p></div>`;
    table += `<table style="width:100%;text-align:center"><thead style="text-decoration:underline"><th>Due Date</th><th>Interest Rate</th><th>Payment</th><th>Interest Amount</th><th>Total Payment</th><th>Payments to Date</th><th>Total Remaining</th></thead><tbody>`;

    dateArrays.forEach((date, dateIdx) => {
      let paymentsToDate = paymentAmount * (dateIdx + 1);

      let remainingPayment = parseFloat(total) - parseFloat(paymentsToDate);
      let dateSplit = date.split("-");
      let body = `<div style="text-align:center"><h1>${companyName}</h1><h2 style="text-decoration:underline">Bill Details for ${firstName} ${lastName}</h2>`;
      body += `<p><strong>Address: </strong>${address1} ${address2} ${city}, ${state} ${postalCode}</p>`;
      body += `<p><strong>Phone: </strong>${phone}`;
      body += `<p><strong>Email: </strong>${email}`;
      body += `<p><strong>Payment Amount: $</strong>${parseFloat(
        origPaymentAmount
      ).toFixed(2)}</p>`;
      body += `<p><strong>Interest: $</strong>${parseFloat(
        interestAmount
      ).toFixed(2)}</p>`;
      body += `<p><strong>Total Due: $</strong>${parseFloat(
        paymentAmount
      ).toFixed(2)}</p>`;
      body += `<p><strong>Due Date: </strong>${
        months[dateSplit[1].toString()]
      } / ${dateSplit[2]} / ${dateSplit[0]}</p>`;
      body += `<p><strong>Total Amount: $</strong>${parseFloat(
        totalAmount
      ).toFixed(2)}</p>`;
      body += `<p><strong>Total Interest: $</strong>${interest.toFixed(2)}</p>`;
      body += `<p><strong>Amount Left after payment: $</strong>${remainingPayment.toFixed(
        2
      )}</p></div>`;
      table += `<tr><td>${months[dateSplit[1].toString()]} / ${
        dateSplit[2]
      } / ${
        dateSplit[0]
      }</td><td>${interestRate}%</td><td>$${origPaymentAmount.toFixed(
        2
      )}</td><td>$${interestAmount.toFixed(2)}</td><td>$${paymentAmount.toFixed(
        2
      )}</td><td>$${paymentsToDate.toFixed(
        2
      )}</td><td>$${remainingPayment.toFixed(2)}</td></tr>`;

      if (!fs.existsSync(appDir + "/bills")) {
        fs.mkdirSync(appDir + "/bills");
      }
      if (!fs.existsSync(appDir + "/bills/" + dateSplit[0])) {
        fs.mkdirSync(appDir + "/bills/" + dateSplit[0]);
      }
      if (
        !fs.existsSync(
          appDir +
            "/bills/" +
            dateSplit[0] +
            "/" +
            months[dateSplit[1].toString()]
        )
      ) {
        fs.mkdirSync(
          appDir +
            "/bills/" +
            dateSplit[0] +
            "/" +
            months[dateSplit[1].toString()]
        );
      }
      var html = createHTML({
        title: `${lastName} ${firstName} Account Information`,
        head: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
        body: body,
      });
      fs.writeFileSync(
        `${appDir}/bills/${dateSplit[0]}/${months[dateSplit[1].toString()]}/${
          dateSplit[2]
        }_${lastName}_${firstName}.html`,
        html
      );

      console.log("success");
    });

    table += "</tbody></table>";
    var html = createHTML({
      title: `Billing Information`,
      head: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
      css: "./index.css",
      body: table,
    });
    if (!fs.existsSync(appDir + "/accounts")) {
      fs.mkdirSync(appDir + "/accounts");
    }

    console.log(`${appDir}/accounts/${companyName}/${lastName}_${firstName}`);
    fs.writeFileSync(
      `${appDir}/accounts/${companyName}/${lastName}_${firstName}.html`,
      table
    );

    shell.openPath(
      `${appDir}/accounts/${companyName}/${lastName}_${firstName}.html`
    );
    shell.openPath(`${appDir}`);
    location.reload();
  });
});
