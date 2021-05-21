const { resolveSoa } = require('dns');
var express = require('express');
const path = require('path');
var router = express.Router();
var fs = require('fs');

router.post('/setScore',function(req, res){
    fs.readFile(path.join(__dirname,'../data/login.json'), (err, data)=>{
        if(err)
            throw err;

        var string = data.toString();
        const person = JSON.parse(string);

        for(var i=0; person[i] ; i++){
            if(person[i].name == req.session.user.name){
                person[i].score = req.body.score;
                break;
            }
        }
        fs.writeFile(path.join(__dirname,'../data/login.json'), JSON.stringify(person), (err)=>{
            if(err) throw err;
        })
    })
})

router.get('/getHighScore',function(req, res){
    /* login.json에서 score를 읽어와 최고점수 유저의 이름과 score를 반환한다.*/
    fs.readFile(path.join(__dirname,'../data/login.json'), (err, data)=>{
        if(err)
            throw err;

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

    res.json({name:req.session.user.name, score:req.session.user.score});
})

  module.exports = router;

