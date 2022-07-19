
const Client = require('../models/Post')
exports.viewCreateScreen = function (req,res) {
    
    res.render('create-client')
}

exports.create = function (req,res) {
    let client = new Client(req.body,req.session.user)
   
    client.create().then(() => {
        res.send("'new client created'")
    }).catch((err) => {
        res.send(err)
    })
}

exports.viewSingle = async function (req,res) {
    try {
      let client = await Client.findingSingleById(req.params.id)
    //  console.log(client)
       res.render('review-client',{client: client})

    } catch {
       res.render('404')
    }
}