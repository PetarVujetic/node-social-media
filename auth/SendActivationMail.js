const nodemailer = require("nodemailer");
module.exports = async function sendActivationMail(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "97petar@live.com",
      pass: "rYbNfGh1JKsWtZE4",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Vujo Hacker 👻" <97petar@live.com>', // sender address
    to: user.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Activation link: http://localhost:8000/auth/${user.activationCode}`, // plain text body
    html: `<b>Hello there! Activate your account here: <a href="http://localhost:8000/auth/${user.activationCode}">Activation link</a></b> (For postman hackers: http://localhost:8000/auth/${user.activationCode})`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


