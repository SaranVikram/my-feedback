const clientCollection = require("../db").db().collection("clients");
const ObjectID = require("mongodb").ObjectID;
const md5 = require("md5");

let Client = function (data, file, userDetails, getAvatar) {
  this.data = data;
  this.file = file;
  this.userDetails = userDetails;
  this.errors = [];
  if (getAvatar == undefined) {
    getAvatar = false;
  }
  if (getAvatar) {
    this.getAvatar();
  }
};

Client.prototype.cleanUp = function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.company != "string") {
    this.data.company = "";
  }
  if (typeof this.data.Mobile != "string") {
    this.data.Mobile = "";
  }
  if (typeof this.data.Email != "string") {
    this.data.Email = "";
  }
  if (typeof this.data.URL != "string") {
    this.data.URL = "";
  }

  //get rid of any bogus properties
  this.data = {
    name: this.data.name.trim(),
    company: this.data.company.trim(),
    Mobile: this.data.Mobile.trim(),
    Email: this.data.Email.trim(),
    URL: `https://search.google.com/local/writereview?placeid=${this.data.URL}`.trim(),
    imagePath: this.file.filename.trim(),
    createdDate: new Date(),
    email: this.userDetails.email,
    Author: new ObjectID(this.userDetails._id),
  };
};

Client.prototype.validate = function () {
  if (this.data.name == "") {
    this.errors.push("you need to enter a name");
  }
  if (this.data.company == "") {
    this.errors.push("you need to enter a company");
  }
  if (this.data.Mobile == "") {
    this.errors.push("you need to enter a Mobile");
  }
  if (this.data.Email == "") {
    this.errors.push("you need to enter a Email");
  }
  if (this.data.URL == "") {
    this.errors.push("you need to enter a URL");
  }
};

Client.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      clientCollection
        .insertOne(this.data)
        .then(() => {
          this.getAvatar();
          resolve();
        })
        .catch(() => {
          this.errors.push("please try again later");
        });
    } else {
      reject(this.errors);
    }
  });
};

Client.findingSingleById = function (id) {
  return new Promise(function (resolve, reject) {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject();
      return;
    }
    clientCollection
      .findOneAndUpdate({ _id: new ObjectID(id) }, { $inc: { pageVisits: 1 } })
      .then((data) => {
        resolve(data.value);
      })
      .catch((err) => {
        reject();
      });
    // .aggregate([
    //   { $match: { _id: new ObjectID(id) } },
    //   // {
    //   //   $lookup: {
    //   //     from: "users",
    //   //     localField: "Author",
    //   //     foreignField: "_id",
    //   //     as: "authorDocument",
    //   //   },
    //   // },
    //   // {project: {
    //   //     title: 1,
    //   //     body: 1,
    //   //     createdDate: 1,
    //   //     Author: {$arrayElemAt: ["$authorDocument", 0]}
    //   // }}
    // ])
    // .toArray();
    // if (clients.length) {
    //   resolve(clients[0]);
    // } else {
    //   reject();
    // }
  });
};

Client.findByUserId = function (userId) {
  return new Promise(async function (resolve, reject) {
    let posts = await clientCollection
      .aggregate([
        { $match: { Author: new ObjectID(userId) } },
        { $sort: { createdDate: -1 } },
        {
          $lookup: {
            from: "users",
            localField: "Author",
            foreignField: "_id",
            as: "authorDocument",
          },
        },
        // {project: {
        //     title: 1,
        //     body: 1,
        //     createdDate: 1,
        //     Author: {$arrayElemAt: ["$authorDocument", 0]}
        // }}
      ])
      .toArray();
    resolve(posts);
  });
};

Client.prototype.login = function () {
  return new Promise((resolve, reject) => {
    clientCollection
      .findOne({ name: this.data.username })
      .then((attemptedUser) => {
        if (attemptedUser && this.data.password === attemptedUser.Mobile) {
          this.data = attemptedUser;
          this.getAvatar();
          resolve("Congrats!");
        } else {
          reject("Invalid username / password.");
        }
      })
      .catch(function (e) {
        reject("Please try again later.");
      });
  });
};

Client.prototype.getAvatar = function () {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.Email)}?s=128`;
};

//check if client exists
Client.prototype.findByCompany = function () {
  return new Promise((resolve, reject) => {
    if (typeof this.data != "string") {
      reject();
      return;
    }
    clientCollection
      .findOne({ company: this.data })
      .then((userDocument) => {
        resolve(userDocument);
      })
      .catch((e) => {
        reject();
      });
  });
};

module.exports = Client;
