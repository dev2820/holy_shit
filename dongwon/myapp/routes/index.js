var express = require('express');
const app = express();
var router = express.Router();

router.route('/').get(function(req, res){
  console.log('no 새숀')
  if(req.session.user)
    res.redirect('/home')
  else
    res.redirect('/login')
})

router.route('/login').get(function(req,res){
  if(req.session.user)
    res.redirect('/home');
  else{
    res.sendFile(__dirname+'/image/login.html')
   }
})

router.route('/logout').get(function(req,res){
  req.session.destroy(function(){
    req.session;
  })
  res.redirect('/login');
})


router.post('/make_session',(req, res)=>{
  req.session.user = {
    "name" : "yoo",
    "id" : "won",
    "pw" : "1234"
  }
  res.redirect('/home')
})

router.route('/home').get((req, res) =>{
  res.send("home")
})



module.exports = router;
