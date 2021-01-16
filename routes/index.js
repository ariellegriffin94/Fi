const express = require("express");
const router = express.Router();
const db=require("../db.json")
const writeFile=require("fs").writeFile

router.post("/update_json", function (req, res, next) {
let form_data=req.body
db.push(form_data)

let formData = JSON.stringify(form_data)

  writeFile("./db.json", formData, (err) => {
    let res_obj = {};
    if (err) {
      console.log(`There was an error updating the database`);
    } else {
        console.log(`Success`);
        console.log(db.length)
    }
});
})

module.exports = router;
