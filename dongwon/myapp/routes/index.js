var express = require('express');
const path = require('path');
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
    res.sendFile(path.join(__dirname,'../public','login.html'));
  }
})

router.route('/signup').get(function(req,res){/*signup 페이지를 호스팅하는 루틴 */
  if(req.session.user)/*로그인 된 유저는 signup할 수 없도록 home으로 redirect한다. */
    res.redirect('/home');
  else{/*public내부의 signup.html페이지를 호스팅 */
    res.sendFile(path.join(__dirname,'../public','signup.html'));
  }
})

router.route('/signup').post(function(req,res){
  /* signup 로직 구현부 
   * /signup 경로로 post 요청이 들어오면 수행된다.
   * 데이터 베이스와 연동할 예정 (mariaDB)
   * 현재는 post로 보내진 name과 pass를 console에 띄우는 기능만 한다.
  */
  const name = req.body.userName || null;
  const pass = req.body.userPass || null;
  console.log(name,pass);
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
