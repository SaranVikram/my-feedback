const customersCollection = require("../db").db().collection("customers");
const ObjectID = require("mongodb").ObjectID;
const sanitizeHTML = require("sanitize-html");

let Customer = function (data, userid) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
};

Customer.prototype.checkinCleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.number != "string") {
    this.data.number = "";
  }

  // get rid of any bogus properties
  this.data = {
    name: sanitizeHTML(this.data.name.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    number: sanitizeHTML(this.data.number.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    createdDate: new Date(),
    companyId: ObjectID(this.userid),
  };
};

Customer.prototype.checkinValidate = function () {
  if (this.data.name == "") {
    this.errors.push("You must provide a name.");
  }
  if (this.data.number == "") {
    this.errors.push("You must provide number");
  }
};

Customer.prototype.checkin = function () {
  return new Promise((resolve, reject) => {
    this.checkinCleanUp();
    this.checkinValidate();
    if (!this.errors.length) {
      customersCollection
        .insertOne(this.data)
        .then((info) => {
          resolve(info.ops[0]);
        })
        .catch((e) => {
          this.errors.push("please try again later");
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

Customer.prototype.maheshCheckin = function () {
  return new Promise((resolve, reject) => {
    this.checkinCleanUp();
    this.checkinValidate();
    if (!this.errors.length) {
      customersCollection
        .insertOne(this.data)
        .then((info) => {
          resolve(info.ops[0]);
        })
        .catch((e) => {
          this.errors.push("please try again later");
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

module.exports = Customer;
