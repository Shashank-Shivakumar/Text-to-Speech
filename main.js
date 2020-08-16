const express = require('express');
const gtts = require('gtts.js').gTTS;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine',"ejs");

app.get('/',(req, res)=> {
    res.render('index'); 
});

app.post('/',(req,res)=>{
 var text= req.body.text;
 const speech = new gtts(text);//comma after text and define a language
 speech.save("output.mp3")
    .then(()=>{
        res.download("output.mp3");
    }).catch((err)=>{
        console.log("Erroe occured");
    });
});

var port= process.env.PORT || 5000;
app.listen(port, ()=> {
  console.log('Server Listeniing on ${port}');
});