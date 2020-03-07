/**
 * A build script that pulls data from garland tools to keep the content upto date
 * data is cached in a _cache folder to prevent an overload of requests to garlandtools
 *
 * @todo fishing 5.x
 *  */

var _ = require('lodash');
const jsoncsv = require('json-csv')
var fs = require('fs');
var localRequest = require('./build-csv-from-garlandtools/request.js')
var node = require('./build-csv-from-garlandtools/node.js')

var miningTypes = ['Mineral Deposit', 'Rocky Outcropping']
var mining = [];
var botanyTypes = ['Mature Tree', 'Lush Vegetation'];
var botany = [];

rawData = localRequest.request('https://garlandtools.org/bell/nodes.js')
//@todo clean up the regex to something a lot better!
rawData = rawData.replace("  }\n\];", "}]")
rawData = rawData.replace("﻿gt.bell.nodes = [", "[")

var data = localRequest.parseJson(rawData);
_.each(data, (dataNode) => {
  _.each(dataNode.items, (item) => {

    var enhancedNodeRaw = localRequest.request(
      `https://garlandtools.org/db/doc/item/en/3/${item.id}.json`
    )
    var enhancedNode = localRequest.parseJson(enhancedNodeRaw);
    var builtNode = node.generate(item, dataNode, enhancedNode.item)

    if (miningTypes.includes(dataNode.type)) {
      mining.push(builtNode);
    } else if (botanyTypes.includes(dataNode.type)) {
      botany.push(builtNode);
    } else {
      console.warn(`Found unknown node type ${dataNode.type}`)
    }
  });
});

mining.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

botany.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

const fields = [
  {name: 'name'},
  {name: 'level'},
  {name: 'stars'},
  {name: 'location'},
  {name: 'pos'},
  {name: 'slot'},
  {name: 'duration'},
  {name: 'times'},
  {name: 'is_collectable'},
  {name: 'is_legendary'},
  {name: 'is_ephemeral'},
  {name: 'yellow_scrip'},
  {name: 'white_scrip'},
]
const basePath = './data/';

jsoncsv.buffered(botany, {
    fields: fields
  },
  (err, csv) => {
    fs.writeFileSync(basePath + 'botany.csv', csv);
  }
);

jsoncsv.buffered(mining, {
    fields: fields
  },
  (err, csv) => {
    fs.writeFileSync(basePath + 'mining.csv', csv);
  }
);
