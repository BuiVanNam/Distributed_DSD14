var request = require("request");

let req = request.defaults({
    method: "GET",
    headers: {
        'Accept': 'text/html',
        'Accept-Charset': 'utf-8'
    },



});

var requestDomain = (url, callBack) => {
    req('http://www.' + url, (error, response, body) => {
        if (!error) {
            // console.log(response.request['host']);
            // console.log(response && response.statusCode);

            var res =  '{"code":' + response && response.statusCode + '"'
                + ',"host":"' + url + '"'
                + '}';
            
            callBack(undefined, res);


        } else {
            callBack(error);
        }
    });
}

module.exports.requestDomain = requestDomain;




//     request("http://baomoi.com", function (error, response, body) {
//         if (error) {
//             console.log(error);
//             res.render("home", { html: "Error" });
//         } else {
//             //lay dc du lieu ve thi render
//             //console.log(body);

//             // cheerio
//             $ = cheerio.load(body);
//             var ds = $(body).find("a");

//             ds.each(function(i, e){
//                 //console.log(i);
//                 console.log(e["attribs"]["href"]);
//             });

//             res.render("home", { html: body });
//         }
//     });


