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


var user_name = '';

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/', (req,res) => {
	// first(req, res, second);
	user_name = req.body.twitter_user
	res.redirect('/tweets');
});


app.get('/tweets', (req,res) => {
	T.get('statuses/user_timeline', { screen_name: user_name },   (err, data, response) => {	
		var tweetArray = [];
		if(err === undefined){
			data.forEach((datum) => {
				var obj = {
					text: datum['text'],
					favorites: datum['favorite_count'],
					retweets: datum['retweet_count']
				}
				tweetArray.push(obj);
			});
		} 
		else {
			console.log("USER DOESN'T EXIST");
		}
		res.render('tweets', {tweetArray: tweetArray});
	});
});




app.listen(3000, () => {
	console.log('port 3000')
})




		


