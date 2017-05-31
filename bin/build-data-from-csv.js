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

    csv().fromFile(basePath + file).on('end_parsed', (jsonObj) => {
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
