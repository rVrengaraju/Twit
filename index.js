var Twit = require('twit');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
 
var T = new Twit({
  consumer_key:         'vMrbbkocSVSteFsJzjbSwtnIX',
  consumer_secret:      'A0d0xSTTtmXFEy1OUbz5YOnH5DrRHhiS9JCScDYk86vyO56iBN',
  access_token:         '1028401396821815296-uqte0o2jJzPS8Uhit5fCkKpUDXJYJl',
  access_token_secret:  '4BBsGzqKnYXNPhCsDkRlvD4MPWuXPau8PSCFKc2yfy4jG',
})


const whiteSpace = str => {
	if (/\s/.test(str)) {
   		return true;
	}
	else{
		return false;
	}
}


var user_name = '';

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req,res) => {
	user_name = req.body.twitter_user
	res.redirect('/tweets');
});

app.get('/tweets', (req,res) => {
	let space = whiteSpace(user_name);
	T.get('statuses/user_timeline', { screen_name: user_name },   (err, data, response) => {
		if(space === true || user_name === ""){
			res.render('error');
		}	
		else if(err === undefined){
			var tweetArray = [];
			data.forEach((datum) => {
				var obj = {
					text: datum['text'],
					favorites: datum['favorite_count'],
					retweets: datum['retweet_count']
				}
				tweetArray.push(obj);
			});
			res.render('tweets', {tweetArray: tweetArray});
		} 
		else {
			res.render('error');
		}
	});
});



app.get('/*', (req, res) => {
	res.redirect('/');
});



app.listen(3000, () => {
	console.log('http://localhost:3000/')
})
