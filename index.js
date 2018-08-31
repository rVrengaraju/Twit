var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         'vMrbbkocSVSteFsJzjbSwtnIX',
  consumer_secret:      'A0d0xSTTtmXFEy1OUbz5YOnH5DrRHhiS9JCScDYk86vyO56iBN',
  access_token:         '1028401396821815296-uqte0o2jJzPS8Uhit5fCkKpUDXJYJl',
  access_token_secret:  '4BBsGzqKnYXNPhCsDkRlvD4MPWuXPau8PSCFKc2yfy4jG',
})

let user_name = 'kananrengaraju';

T.get('statuses/user_timeline', { screen_name: user_name },   (err, data, response) => {	
	if(err === undefined){
		data.forEach( datum => {
			console.log('Text: \n' + datum['text']);
			if(datum['retweeted_status'] === undefined){
				console.log('Favorites: ' + datum['favorite_count']);
				console.log('Retweets: ' + datum['retweet_count']);
			}
			console.log('\n');
		})
	} else {
		console.log("USER DOESN'T EXIST")
	}
})

