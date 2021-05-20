var express = require('express');
const path = require('path');
var router = express.Router();

router.post('/highscore',function(req, res){
    /* 갱신된 점수를 기록하세요. */
})

router.get('/getHighScore',function(req, res){
    /* # login.json에서 score를 읽어와 최고점수 유저의 이름과 score를 반환한다.*/
    res.json({ name: "", highscore:0});
})
module.exports = router;
