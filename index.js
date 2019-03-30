const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Поздравление для мальчика
var comp_male = "";

// Поздравление для девочки
var comp_female = "";

// токен
global.token = ''

let moment = require('moment')

var user_id;

var toMs = require('to-ms');

var ms = toMs
  .days(1)
  .hours()
  .minutes()
  .seconds(5);

function start_again(){
  setTimeout(start, ms)
}

function start(){
  sendRequest()
  start_again()
}

getId(global.token, (a, statusCode, headers, body) => {
  var body = JSON.parse(body)
  user_id = body.response[0].id
  console.log(user_id);
  start()
})

function sendRequest() {
    var time = moment().format('DD.M')
    time = time.toString()
    console.log(time);
    getBdate(global.token, (a, statusCode, headers, body) => {
      var body = JSON.parse(body)
      for (var i = 0; i < body.response.items.length; i++) {
        if(body.response.items[i].bdate !== undefined){
          var bdate = body.response.items[i].bdate.split('.')
          var str = bdate[0] + "." + bdate[1]
          if(str == time){
            if(body.response.items[i].sex == 1){
              sendMessage(comp_female, body.response.items[i].id)
            }else{
              sendMessage(comp_male, body.response.items[i].id)
            }
          }
        }
      }
    })
}

function sendMessage(message, user_id){
  var http = require("https");

  var options = {
    "method": "GET",
    "hostname": "api.vk.com",
    "port": null,
    "path": "/method/messages.send?access_token="+global.token+"&message="+encodeURIComponent(message)+"&v=5.74&user_id="+user_id,
    "headers": {
      "content-length": "0"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
}

function getBdate(access_token, callback) {
    'use strict';

    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.vk.com',
        port: '443',
        path: '/method/friends.get?user_id='+user_id+'&v=5.74&fields=bdate,sex&access_token='+access_token,
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    // Paw Store Cookies option is not supported

    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';

        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

            callback(null, res.statusCode, res.headers, responseStr);
        });

    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();


}
function getId(access_token,callback) {
    'use strict';
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.vk.com',
        port: '443',
        path: '/method/users.get?v=5.74&access_token='+access_token,
        method: 'GET',
        headers: {}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';

        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            callback(null, res.statusCode, res.headers, responseStr);
        });

    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
}
function getComp(sex, callback){
  var comp = undefined;
  if(sex == 'male'){
    rl.question('Введи поздравление для мальчика: ', (string) => {
      comp_male = string
      callback()
    })
  }else{
    rl.question('Введи поздравление для девочки: ', (string) => {
      comp_female = string
      callback()
    })
  }
}

app.get('/test', (req, res) => {
  var i = 0,
      j = 12,
      a = req.query.
  res.send('Yo, motherfucker')
})
