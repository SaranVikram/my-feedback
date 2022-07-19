const Review = require("../models/Review");
const nodemailer = require("nodemailer");

exports.saveReview = function (req, res) {
  let review = new Review(req.body, req.params.company);
  review
    .create()
    .then((reviewData) => {
      // req.flash("success", `Successfully followed ${req.params.username}`)
      // req.session.save(() => res.redirect(`/profile/${req.params.username}`))
      const output = `
   <h3>${reviewData.company} Feedback </h3>
    <ul>  
      <li>Name: ${reviewData.name}</li>
      <li>Phone: ${reviewData.phone}</li>
      <li>rating: ${reviewData.rating}</li>
    </ul>
    <h3>Feedback</h3>
    <p>${reviewData.feedback}</p>
  `;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "saran3vikram@gmail.com", // generated ethereal user
          pass: process.env.EMAILPASS, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Reviewonthego" <saran3vikram@gmail.com>', // sender address
        to: `${reviewData.clientEmail}`, // list of receivers
        subject: "Feedback Form | Review-onthego", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      res.json({ success: "Updated Successfully", status: 200 });
    })
    .catch((errors) => {
      console.log(errors);
      res.send("unsuccesful");
    });
};
