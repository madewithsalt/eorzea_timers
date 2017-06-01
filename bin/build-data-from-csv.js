var fs = require('fs');
var csv =  require('csvtojson');
var yargs = require('yargs');
var _ = require('lodash');
var async = require('async');

const basePath = './data/';
const fileNames = {
  'botany': 'botany.csv',
  'mining': 'mining.csv',
  'fishing': 'fishing.csv'
};

var output = {};
var tasks = [];

console.log('starting parse');

_.each(fileNames, (file, name) => {
  tasks.push(function(callback) {
    console.log('parsing ' + name + '...');
    var counter = 1;

    csv().fromFile(basePath + file)
      .on('json',(json)=>{ //this func will be called 3 times
        json.id = name + '-' + counter++;
      })
      .on('end_parsed', (jsonObj) => {
        output[name] = jsonObj;
        console.log(name + ' done.');

        callback();
      });

  })
});

async.parallel(tasks, (err) => {
  console.log('saving nodes.json ....');

  fs.writeFileSync(basePath + 'nodes.json', JSON.stringify(output));
});
