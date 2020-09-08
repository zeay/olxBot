//Connection to server
//Electron Post Request
var http  = require('https');
var request = require('request');
//var url = "https://leader-collector-service-qa.ninja24.in/webhook/alpha3/"

// var data= JSON.stringify({
//     'team': 'alpha3'
// });

// var urlProperties  = {
//     host: 'https://leader-collector-service-qa.ninja24.in',
//     path: '/webhook/alpha3/',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Token': '332274a6-e5c3-11e9-81b4-2a2ae2dbcce4'
//     }
// }

// var reqPost = http.request(urlProperties, function (res) {
//     console.log("response statusCode: ", res.statusCode);
//     res.on('data', function (resData) {
//         console.log('Posting Result:\n');
//         process.stdout.write(resData);
//         console.log('\n\nPOST Operation Completed');
//     });
// });
 
// // 7
// reqPost.write(data);
// reqPost.end();
// reqPost.on('error', function (e) {
//     console.error(e);
// });
// //reqPost();

function apiCall24(dataSet){ 
  console.log("Api call started");
  console.log(dataSet);
  let stringydata = JSON.stringify(dataSet);
  request({
    headers: {
      'Token': 'd26a5861-17b5-464c-a8d7-28f5e56c2e95',
      'Content-Type': 'application/json'
    },
    uri: 'https://lead-collector.cars24.team/webhook/alpha3',
    body: stringydata,
    method: 'POST'
  }, function (err, res, body) {
    //it works!
    if (err) {
        console.error(err)
        return true;
      }
      console.log(`statusCode: ${res.statusCode}`)
  });

}
// apiCall24();

module.exports = { 
  apiCall24: apiCall24
}

