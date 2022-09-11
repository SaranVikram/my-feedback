const apiRouter = require("express").Router();
const postController = require("./controllers/postController");
const reviewController = require("./controllers/reviewController");
const customerController = require("./controllers/customerController");
const textLocal = require("./middleware/textlocal");

// apiRouter.use(
//   cors({
//     origin: "https://app.my-feedback.in",
//     optionsSuccessStatus: 200,
//   })
// );

apiRouter.post("/checkToken", postController.checkToken);
apiRouter.post("/login", postController.apiLogin);
apiRouter.post(
  "/customer/checkin",
  postController.apiMustBeLoggedIn,
  customerController.createCustomerCheckin
);

//get reviews route
apiRouter.get(
  "/:id/reviews",
  postController.ifClientExists,
  reviewController.apiGetReviewsByCompanyName
);

//text local trail
apiRouter.post("/textlocal", textLocal.textLocalSMS);

module.exports = apiRouter;
