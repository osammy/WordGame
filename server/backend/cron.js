const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const db = require('./db')
// const Targets = require('./resources/targets/targets.model');
const mongoose = require('mongoose');

const directory = path.resolve(__dirname,'reports');

console.log("Cron job started!");
function startDatabaseConnection(){
    return db();
}

function closeDatabaseConnection(){
    mongoose.connection.close();
}

// function getTarget() {
//     return new Promise((resolve,reject)=>{
//         Targets.find({},function(err,t){
//             console.log("doing")
//             if(err) return new Error('err');
//             resolve(t)
//         })
//     })
// }

cron.schedule("1 * 28 * *",function(){
 
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        if(files.length === 0) return;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
})

//call by 00:00am everyday
//cron.schedule("0 0 * * *",function(){

//})
