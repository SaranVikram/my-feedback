const Client = require('../models/Post')
const User = require('../models/User')

exports.mustBeLoggedIn = function (req,res,next) {
if (req.session.user) {
next()
} else {
req.flash("errors","you must be logged in")
req.session.save(function () {
  res.redirect('/')
})
}
}


exports.login = function(req,res) {
let user = new User(req.body)
user.login().then(function (result) {
  req.session.user = {_id:user.data._id, email:user.data.email, username: user.data.username}
 req.session.save(function () {
  res.redirect('/')
 })
}).catch((err) => {
  req.flash('errors',err)
  req.session.save(function () {
    res.redirect('/')
  })
})

}

exports.logout = function(req,res) {
  req.session.destroy(function () {
    res.redirect('/')
  })
  
}

exports.register = function(req, res) {
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = {_id:user.data._id, email:user.data.email, username: user.data.username}
    req.session.save(function() {
      res.redirect('/')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(error) {
      req.flash('regErrors', error)
    })
    req.session.save(function() {
      res.redirect('/')
    })
  })
}

exports.home = function(req, res) {
 if (req.session.user) {
   res.render('home-users')
   
 } else {
  res.render('Admin access',{errors:req.flash('errors'),regErrors:req.flash('regErrors')})
 }
}

exports.ifUserExists = function (req,res,next) {
 User.findByUsername(req.params.username).then(function(userDoument){
  req.profileUser = userDoument
  
  next()
 }).catch(function() {
  res.render('404')
 })
}

exports.profilePostScreen = function (req,res) {
Client.findByUserId(req.profileUser._id).then(function(posts){
 
  res.render('user-profile',{
    posts: posts,
    profileUsername: req.profileUser.username,
    
  })
}).catch(function(){
  res.render('404')
})


}