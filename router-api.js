const apiRouter = require("express").Router();
const postController = require("./controllers/postController");
const reviewController = require("./controllers/reviewController");
const customerController = require("./controllers/customerController");
const cors = require("cors");

// apiRouter.use(
//   cors({
//     origin: "https://app.my-feedback.in",
//     optionsSuccessStatus: 200,
//   })
// );

apiRouter.post("/checkToken", postController.checkToken);
apiRouter.post(
  "/login",
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
  postController.apiLogin
);
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

module.exports = apiRouter;
