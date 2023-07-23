const exp = require("express");
const bodyParse = require("body-parser");
const request = require("request");
const https = require("https");

const app = exp();

app.use(exp.static("public"));
app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var first = req.body.fname;
  var last = req.body.lname;
  var mail = req.body.email;
  console.log(first, last, mail);

  var data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last,
        },
      },
    ],
  };
  var data1 = JSON.stringify(data);
  console.log(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/9633e436e5?";
  const options = {
    method: "POST",
    auth: "itscharanteja:83a9c1be5eed4fe40512ab1b871cb040-us21",
  };
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/fail.html");
    }
    // response.on("data", (data) => {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(data1);
  console.log(res.statusCode);

  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Port is listening");
});

//83a9c1be5eed4fe40512ab1b871cb040-us21
// 9633e436e5
