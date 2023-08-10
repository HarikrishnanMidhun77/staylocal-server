exports.composePropDetailsMail = (propObj) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  var copy =
    "<h4>Hello " +
    "Sir," +
    "<br><br>You have a new Enquiry" +
    "<br>Owned Properties: " +
    propObj.noOfProps +
    " <br>" +
    "<br>Regions: " +
    propObj.regions +
    " <br>" +
    "<br>Websites advertising on: " +
    propObj.adWebsites +
    " <br>" +
    "<br>Supports Needed: " +
    propObj.needed_supports +
    " <br>" +
    "<br>Name: " +
    propObj.name +
    " <br>" +
    "<br>Email: " +
    propObj.email +
    " <br>" +
    "<br>Phone: " +
    propObj.phone +
    " <br>" +
    "</b><br><br><br>Thanks and regards, " +
    "<br> Team GAP";

  const msg = {
    to: "hari11@mailinator.com",
    from: "harikrishnanthrippekulam@gmail.com",
    subject: "GAP support inquiry",
    text: copy,
    html: copy,
  };
  sgMail.send(msg);
  console.log("signup mail sent");
};

exports.composeContactMail = (propObj) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  var copy =
    "<h4>Hello " +
    "Sir," +
    "<br><br>You have a new Contact" +
    "<br>Name: " +
    propObj.name +
    " <br>" +
    "<br>Email: " +
    propObj.email +
    " <br>" +
    "<br>Property Name : " +
    propObj.propertyName +
    " <br>" +
    "<br>telephone: " +
    propObj.telephone +
    " <br>" +
    "<br>Message: " +
    propObj.message +
    " <br>" +
    "</b><br><br><br>Thanks and regards, " +
    "<br> Team GAP";
  console.log(`copy`, copy);
  const msg = {
    to: "hari11@mailinator.com",
    from: "harikrishnanthrippekulam@gmail.com",
    subject: "GAP User Contact",
    text: copy,
    html: copy,
  };
  sgMail.send(msg);
  console.log("signup mail sent");
};
