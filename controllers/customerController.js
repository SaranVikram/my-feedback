const Customer = require("../models/Customer");
const accountSid = "ACed810edc89894c24dbb54e6c5db86fe0";
const authToken = "[8f44865c739efb226d07b27499ac5b5d]";
const client = require("twilio")(
  "ACed810edc89894c24dbb54e6c5db86fe0",
  "8f44865c739efb226d07b27499ac5b5d"
);

exports.createCustomerCheckin = function (req, res, next) {
  let customer = new Customer(req.body, req.apiClient._id);
  customer
    .checkin()
    .then((info) => {
      const name = info.name;
      const amount = info.amount;

      client.messages
        .create({
          body: `hello ${name} , thank you for visiting Furniture Park. Your purchase of ${amount}. please give us a review `,
          messagingServiceSid: "MG9ec45b81b7d255ad987cc777073c4203",
          to: info.number,
        })
        .then((message) => {
          console.log(message.sid);
          res.json(message.sid);
        })
        .done();
    })
    .catch((errors) => {
      res.json(errors);
    });
};
