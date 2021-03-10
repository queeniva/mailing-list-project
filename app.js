const express = require("express");
const bodyParse = require("body-parser");
const request = require("request");
const app = express();
const https = require("https")
app.use(bodyParse.urlencoded({ extended: true }))

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const finame = req.body.firstname;
    const laname = req.body.lastname;
    const email1 = req.body.EmailInput;

    const data = {
        members: [{
            "email_address": email1,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": finame,
                "LNAME": laname
            }
        }]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/88932d3f92";
    const options = {
        method: "POST",
        auth: "queeniva:7e95b781131da46ecbc1165e90517501-us1"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/sucess.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function() {
    console.log("server runing at port 3000");
})

// listId
// 88932d3f92
// Api key
// 7e95b781131da46ecbc1165e90517501-us1