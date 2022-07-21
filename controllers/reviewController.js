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
      <div class="">
      <meta charset="UTF-8" class="" />
      <div
        class="mj-container"
        style="
          caret-color: rgb(0, 0, 0);
          font-family: Helvetica;
          font-size: 12px;
          font-style: normal;
          font-variant-caps: normal;
          font-weight: 400;
          letter-spacing: normal;
          text-align: start;
          text-indent: 0px;
          text-transform: none;
          white-space: normal;
          word-spacing: 0px;
          -webkit-text-stroke-width: 0px;
          text-decoration: none;
          background-color: rgb(246, 246, 246);
        "
      >
        <div
          style="
            margin: 0px auto;
            max-width: 600px;
            background-color: rgb(255, 255, 255);
          "
          class=""
        >
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            align="center"
            border="0"
            style="border-collapse: collapse; font-size: 0px; width: 600px"
            class=""
          >
            <tbody class="">
              <tr class="">
                <td
                  style="
                    border-collapse: collapse;
                    text-align: center;
                    vertical-align: top;
                    direction: ltr;
                    font-size: 0px;
                    padding: 0px;
                  "
                  class=""
                >
                  <div
                    class="mj-column-per-100 outlook-group-fix"
                    style="
                      width: 600px;
                      vertical-align: top;
                      display: inline-block;
                      direction: ltr;
                      font-size: 13px;
                      text-align: left;
                    "
                  >
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      border="0"
                      style="border-collapse: collapse; vertical-align: top"
                      class=""
                    >
                      <tbody class="">
                        <tr class="">
                          <td
                            align="center"
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                              padding: 0px;
                            "
                            class=""
                          >
                            <table
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              align="center"
                              border="0"
                              style="border-collapse: collapse; border-spacing: 0px"
                              class=""
                            >
                              <tbody class="">
                                <tr class="">
                                  <td
                                    style="border-collapse: collapse; width: 600px"
                                    class=""
                                  >
                                    <img
                                      alt=""
                                      title=""
                                      height="auto"
                                      src="https://rectangled-secured-assets.s3.ap-south-1.amazonaws.com/images/email-tpl/pvt-feedback-header.jpg"
                                      width="600"
                                      style="
                                        border: none;
                                        height: auto;
                                        line-height: 13px;
                                        outline: none;
                                        text-decoration: none;
                                        border-radius: 0px;
                                        display: block;
                                        font-size: 13px;
                                        width: 600px;
                                      "
                                      class=""
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr class="">
                          <td
                            align="left"
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                              padding: 15px;
                            "
                            class=""
                          >
                            <div
                              style="
                                cursor: auto;
                                font-family: 'Helvetica Neue', Helvetica, Arial,
                                  sans-serif;
                                font-size: 14px;
                                line-height: 1.5;
                                text-align: left;
                              "
                              class=""
                            >
                              <p
                                style="
                                  display: block;
                                  margin: 10px 0px;
                                  color: rgb(88, 88, 88);
                                "
                                class=""
                              >
                                Customer Name: ${reviewData.name}<br
                                  class=""
                                />Customer Phone: +91${reviewData.phone} <br
                                  class=""
                                />Rating: ${reviewData.rating}<br
                                  class=""
                                />Feedback: ${reviewData.feedback}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr class="">
                          <td
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                            "
                            class=""
                          >
                            <p
                              style="
                                display: block;
                                margin: 0px auto;
                                color: rgb(88, 88, 88);
                                font-size: 1px;
                                border-top-width: 1px;
                                border-top-style: solid;
                                border-top-color: rgb(218, 218, 218);
                                width: 600px;
                              "
                              class=""
                            ></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style="
            margin: 0px auto;
            max-width: 600px;
            background-color: rgb(255, 255, 255);
          "
          class=""
        >
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            align="center"
            border="0"
            style="border-collapse: collapse; font-size: 0px; width: 600px"
            class=""
          >
            <tbody class="">
              <tr class="">
                <td
                  style="
                    border-collapse: collapse;
                    text-align: center;
                    vertical-align: top;
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0px;
                  "
                  class=""
                >
                  <div
                    class="mj-column-per-50 outlook-group-fix"
                    style="
                      width: 300px;
                      vertical-align: top;
                      display: inline-block;
                      direction: ltr;
                      font-size: 13px;
                      text-align: left;
                    "
                  >
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      border="0"
                      style="border-collapse: collapse"
                      class=""
                    >
                      <tbody class="">
                        <tr class="">
                          <td
                            align="center"
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                              padding: 0px 15px;
                            "
                            class=""
                          >
                            <table
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              align="center"
                              border="0"
                              style="border-collapse: collapse; border-spacing: 0px"
                              class=""
                            >
                              <tbody class="">
                                <tr class="">
                                  <td
                                    style="border-collapse: collapse; width: 300px"
                                    class=""
                                  >
                                    <!-- <img
                                      alt=""
                                      title=""
                                      height="auto"
                                      src="#"
                                      width="300"
                                      style="
                                        border: none;
                                        height: auto;
                                        line-height: 13px;
                                        outline: none;
                                        text-decoration: none;
                                        border-radius: 0px;
                                        display: block;
                                        font-size: 13px;
                                        width: 162px;
                                      "
                                      class=""
                                    /> -->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
    
                  <div
                    class="mj-column-per-50 outlook-group-fix"
                    style="
                      width: 300px;
                      vertical-align: top;
                      display: inline-block;
                      direction: ltr;
                      font-size: 13px;
                      text-align: left;
                    "
                  >
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      border="0"
                      style="border-collapse: collapse"
                      class=""
                    >
                      <tbody class="">
                        <tr class="">
                          <td
                            align="left"
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                              padding: 0px 15px;
                            "
                            class=""
                          >
                            <div
                              style="
                                cursor: auto;
                                font-family: 'Helvetica Neue', Helvetica, Arial,
                                  sans-serif;
                                font-size: 14px;
                                line-height: 1.5;
                                text-align: left;
                              "
                              class=""
                            >
                              <div
                                style="
                                  display: block;
                                  margin: 0px;
                                  color: rgb(88, 88, 88);
                                "
                                class=""
                              >
                                Get the reputation your business deserves
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr class="">
                <td
                  style="
                    border-collapse: collapse;
                    text-align: center;
                    vertical-align: top;
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0px;
                  "
                  class=""
                >
                  <div
                    class="mj-column-per-50 outlook-group-fix"
                    style="
                      width: 300px;
                      vertical-align: top;
                      display: inline-block;
                      direction: ltr;
                      font-size: 13px;
                      text-align: left;
                    "
                  >
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      border="0"
                      style="border-collapse: collapse"
                      class=""
                    >
                      <tbody class="">
                        <tr class="">
                          <td
                            align="left"
                            style="
                              border-collapse: collapse;
                              word-wrap: break-word;
                              font-size: 0px;
                              padding: 0px 15px;
                            "
                            class=""
                          >
                            <div
                              style="
                                cursor: auto;
                                font-family: 'Helvetica Neue', Helvetica, Arial,
                                  sans-serif;
                                font-size: 12px;
                                line-height: 1.5;
                                text-align: center;
                              "
                              class=""
                            >
                              <div
                                style="
                                  display: block;
                                  margin: 0px;
                                  color: rgb(88, 88, 88);
                                "
                                class=""
                              >
                                © 2021 Reviewonthego. All Rights Reserved
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <img
        src="#"
        width="1"
        height="1"
        border="0"
        alt=""
        style="
          border: 0px;
          height: auto;
          line-height: 12px;
          outline: none;
          text-decoration: none;
          caret-color: rgb(0, 0, 0);
          font-family: Helvetica;
          font-size: 12px;
          font-style: normal;
          font-variant-caps: normal;
          font-weight: 400;
          letter-spacing: normal;
          text-align: start;
          text-indent: 0px;
          text-transform: none;
          white-space: normal;
          word-spacing: 0px;
          -webkit-text-stroke-width: 0px;
          background-color: rgb(255, 255, 255);
        "
        class=""
      /><span
        style="
          caret-color: rgb(0, 0, 0);
          font-family: Helvetica;
          font-size: 12px;
          font-style: normal;
          font-variant-caps: normal;
          font-weight: 400;
          letter-spacing: normal;
          text-align: start;
          text-indent: 0px;
          text-transform: none;
          white-space: normal;
          word-spacing: 0px;
          -webkit-text-stroke-width: 0px;
          background-color: rgb(255, 255, 255);
          text-decoration: none;
          float: none;
          display: inline !important;
        "
        class=""
      ></span>
    </div>
    
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
