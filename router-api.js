const apiRouter = require("express").Router();
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const reviewController = require("./controllers/reviewController");
const customerController = require("./controllers/customerController");
const cors = require("cors");

apiRouter.use(
  cors({
    origin: "https://my-feedbackk.netlify.app/",
    credentials: true,
  })
);

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

module.exports = apiRouter;
