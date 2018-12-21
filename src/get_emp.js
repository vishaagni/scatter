const empPath= 'emp.csv'
const deptPath= 'dept.csv'
const csv = require('csvtojson');
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
//var cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var empDup = {};
var deptDup = {};

function allcsv(Path, duplicateObject){

csv()
.fromFile(Path)
.then((jsonObj) => {
    //console.log(jsonObj);
    //var arr = []
    for(i = 0 ; i < 5 ; i++)
    {
      //  arr[i] = jsonObj[i].height
        //console.log(arr[i]);
        //console.log(jsonObj[i])
        duplicateObject[i] = JSON.parse(JSON.stringify( jsonObj[i] ));
        console.log(duplicateObject[i]);

        }
        console.log('hi')
        console.log(duplicateObject);

 
    });
    console.log('no');
 return duplicateObject;
}

empDup = allcsv(empPath, empDup);
console.log('nope');

    console.log(empDup)

    allcsv(deptPath, deptDup);

  //  arr[i] = jsonObj[i].height
    //console.log(arr[i]);
    
    





/*
csv()
.fromFile(deptPath)
.then((jsonObj) => {
    //console.log(jsonObj);
    //var arr = []
    for(i = 0 ; i < 10 ; i++)
    {
      //  arr[i] = jsonObj[i].height
        //console.log(arr[i]);
        console.log(jsonObj)
    }
});
*/