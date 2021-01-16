$(document).ready(function () {
  console.log("hi");
  // process the form
  $("form").submit(function (event) {
    console.log("hi");

    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
      first_name: $("input[name=name]").val(),
      last_name: $("input[name=lastname]").val(),
      address_1: $("input[name=address1]").val(),
      address_2: $("input[name=address2]").val(),
      city: $("input[name=city]").val(),
      state: $("input[name=state]").val(),
      postal_code: $("input[name=postalcode]").val(),
      phone: $("input[name=phone]").val(),
      email: $("input[name=email]").val()
    };

    // process the form
    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "http://localhost:3003/update_json", // the url where we want to POST
      data: formData, // our data object
      dataType: "json", // what type of data do we expect back from the server
      encode: true,
    })
      // using the done promise callback
      .done(function (data) {
        // log data to the console so we can see
        console.log(data);

        // here we will handle errors and validation messages
      });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});
