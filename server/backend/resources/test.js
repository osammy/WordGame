const fs = require('fs');

fs.readFile('../dictionary/english3.txt','utf8', function (err, data) {
    if(err) reject(err);
    if(data.includes("above")){
    
     console.log("it exists")
    }
    else {
       console.log("it doesnt")
    }
  });