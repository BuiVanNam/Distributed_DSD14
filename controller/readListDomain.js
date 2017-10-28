var fs = require("fs");

var listDomainDefault = JSON.parse(fs.readFileSync("./db/listDomain.json", "utf8"));

module.exports.listDomainDefault = listDomainDefault;


// let i = 0;

// function taskTest() {
//     i ++;
//     console.log("heheheh " + i);
// }

// setInterval(taskTest, 1000);
