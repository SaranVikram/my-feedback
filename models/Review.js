const clientCollection = require("../db").db().collection("clients");
const reviewsCollection = require("../db").db().collection("reviews");

let Review = function (data, company) {
  this.data = data;
  this.company = company;
  this.errors = [];
};

Review.prototype.cleanUp = async function () {
  if (typeof this.data.name != "string") {
    this.data.name = "";
  }
  if (typeof this.data.phone != "string") {
    this.data.phone = "";
  }
  if (typeof this.data.feedback != "string") {
    this.data.feedback = "";
  }
};

Review.prototype.validate = async function () {
  // followedUsername must exist in database
  let reviewCompany = await clientCollection.findOne({ company: this.company });
  if (reviewCompany) {
    this.data = {
      name: this.data.name,
      phone: this.data.phone,
      feedback: this.data.feedback,
      rating: this.data.rating,
      reviewDate: new Date(),
      company: reviewCompany.company,
      clientEmail: reviewCompany.Email,
    };
  } else {
    this.errors.push("You cannot review a company which doesn't exist.");
  }
};

Review.prototype.create = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate();
    if (!this.errors.length) {
      let reviewData = this.data;
      await reviewsCollection.insertOne(reviewData);
      resolve(reviewData);
    } else {
      reject(this.errors);
    }
  });
};

Review.getPrivateFeedback = function (company) {
  return new Promise(async (resolve, reject) => {
    let reviews = await reviewsCollection
      .aggregate([
        { $match: { company } },
        { $sort: { createdDate: 1 } },
        // {
        //   $lookup: {
        //     from: "reviews",
        //     localField: "company",
        //     foreignField: "company",
        //     as: "privateFeedback",
        //   },
        // },
        // {project: {
        //     title: 1,
        //     body: 1,
        //     createdDate: 1,
        //     Author: {$arrayElemAt: ["$authorDocument", 0]}
        // }}
      ])
      .toArray();
    resolve(reviews);
  });
};

module.exports = Review;
