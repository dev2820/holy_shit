const { resolveSoa } = require('dns');
var express = require('express');
const path = require('path');
var router = express.Router();
var fs = require('fs');
router.post('/setScore',function(req, res){
    /* 갱신된 점수를 기록하세요. */
})

router.get('/getHighScore',function(req, res){
    /* login.json에서 score를 읽어와 최고점수 유저의 이름과 score를 반환한다.*/
    fs.readFile(path.join(__dirname,'../data/login.json'), (err, data)=>{
        if(err)
            console.log(err);

        var string = data.toString();
        const person = JSON.parse(string);

        champion = person[0];
        
        for(var i=1; person[i] ; i++)
            if(champion.score < person[i].score)
                champion = person[i];
        
        res.json({ name: champion.name, score: champion.score});
    })

})

router.get('/getScore',function(req, res){
    /* # login.json에서 score를 읽어와 최고점수 유저의 이름과 score를 반환한다.*/ 
    console.log(req.session.user.score);
    res.json({name:req.session.user.name, score:req.session.user.score});


//        res.json({ name: "", highscore:0});

})
/*
router.route('/userInfo').get(function(req, res){
    if(req.session.user) // session이 있다면 home으로
      /* # login.json에서 score를 읽어와 score는 해당 유저의 score를, highscore는 모든 유저들 중 최고 점수를 보내도록 수정하세요. 
        res.json({ name: req.session.user.name, score:0});
    else // session이 없다면 login 경로로
        res.send('none');
  })
*/
  module.exports = router;

