const express = require('express');
const bodyparser = require('body-parser')
var app = express();
const fs = require('fs');
app.use(express.static('image'));
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/image/login.html')
});

app.post('/login', function(req, res){
    var id = req.body.id;
    var pw = req.body.pw;

    var data = fs.readFile('login.json', (err, data) =>{
        if(err)
            console.log("err")
        var string = data.toString();
        const person = JSON.parse(string);
        //console.log("|",person[0].id,"|",person[0].pw,"|")
        let i, f = true;

        for(i=0; person[i] ; i++)
            if(person[i].id === id && person[i].password === pw){
                res.send("welcome " + person[i].name);
                f = false;
                break;
            }
        if(f)
            res.send("fail")
    })
    
})


app.listen(3000);