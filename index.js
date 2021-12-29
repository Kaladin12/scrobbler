const { sign } = require('crypto');
const https = require('http');
const md5 = require('js-md5');
const axios = require('axios');
const data = require('../credentials.json')


/*const idk = 'AIzaSyBUKbXuz5hpTTZWnjL7FOtg3q7-1UVc5QU';

const {google} =  require('googleapis')

google.youtube('v3').playlists.list({
    key : idk,
    part: 'snippet',
    id: ['PL6B_9p2NbDK9msWkM46d73Z2Ha-u86FDn'
]
}).then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})
; */
//http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=YOUR_API_KEY&artist=cher&track=believe&format=json
const base = 'http://ws.audioscrobbler.com/2.0/'


getSignature = (params, secret) => {
    let st = ''
    let items = Object.keys(params).sort()
    for (let i of items) {
        st+=i
        st+=params[i]
    }
    st+=secret
    st = encodeURI(st)
    hash = md5.create();
    hash.update(st)
    return hash.hex() 
}

let params = {
    'method':'track.scrobble',
    'api_key':data.API_KEY,
    'timestamp':( Math.floor(Date.now() / 1000) - 30).toString(),
    'track':'untrue',
    'artist':'burial',
    'sk':data.sk
}

params['api_sig'] = getSignature(params, data.secret)
console.log(params)
axios.post('https://ws.audioscrobbler.com/2.0/', params)
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error.response.data);
});