const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const reviewController = require('./controllers/reviewController')


router.get('/', userController.home)

//user controlled routes
router.post('/register', userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)

//profile related routes
router.get('/profile/:username',userController.ifUserExists,userController.profilePostScreen)

//posts controlled routes
router.get('/create-client', userController.mustBeLoggedIn ,postController.viewCreateScreen)
router.post('/create-client',userController.mustBeLoggedIn,postController.create)
router.get('/review/:id',postController.viewSingle)

//review controlled routes
router.post('/review/:company',reviewController.saveReview)

module.exports = router