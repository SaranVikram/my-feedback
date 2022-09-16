const Customer = require("../models/Customer");
const client = require("twilio")(process.env.FDBKSID, process.env.FDBKTOKEN);
const fpClient = require("twilio")(
  "AC6a9fdaaab9d15cde02f0ea710ce36d9a",
  "f328f4afceec4f8f36eaf79ec1fdbbc4"
);

exports.createCustomerCheckin = function (req, res) {
  let customer = new Customer(req.body, req.apiClient._id);
  const company = req.apiClient.company;
  const url = req.apiClient.shortLink;
  const amount = req.body.amount;
  customer
    .checkin()
    .then((info) => {
      const name = info.name;
      if ("62d24e7a99c4a13954b30eff" === req.apiClient._id) {
        fpClient.messages
          .create({
            body: `Hi ${name}, Thank you for your purchase at ${company}. Your furniture worth Rs ${amount}/- is delivered. Please review us at ${url}`,
            messagingServiceSid: "MG1b06ea823276a75869a10b409e35fe10",
            to: info.number,
          })
          .then((message) => {
            console.log(message.sid);
            res.json("Message is succesfully sent");
          })
          .catch((e) => {
            res.json(e.code);
          })
          .done();
      } else {
        client.messages
          .create({
            body: `hello ${name} , thank you for visiting ${company}.please give us a review at ${url} `,
            messagingServiceSid: "MG9ec45b81b7d255ad987cc777073c4203",
            to: info.number,
          })
          .then((message) => {
            console.log(message.sid);
            res.json("Message is succesfully sent");
          })
          .catch((e) => {
            res.json(e.code);
          })
          .done();
      }
    })
    .catch((errors) => {
      res.json(errors);
    });
};
