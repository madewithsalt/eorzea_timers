var request = require('sync-request');
const fs = require('fs');

/**
 *
 * @param fileName
 * @returns {boolean|string}
 */
function fetchCache(fileName) {
  let cacheData = false;
  console.log(`./bin/build-csv-from-garlandtools/_cache/${fileName}.json`);
  try {
    let something = fs.readFileSync(`./bin/build-csv-from-garlandtools/_cache/${fileName}.json`);
    cacheData = something.toString('utf8');
  } catch (error) {
    // console.error(error);
    return cacheData;
  }
  // fs.readFileSync(`./bin/build-csv-from-garlandtools/_cache/${fileName}.json`, function(err, data) {
  //   console.log(err);
  //   // if(!err) {
  //   console.log(`Cache for ${fileName} found`);
  //   cacheData = data
  //   console.log(data);
  //   // }
  // });
  // console.log("fetch cache did something");
  // console.log(cacheData);
  // console.log("pebcak");
  return cacheData;

}

function cache(data, fileName)
{
  // console.log(cache);
  fs.writeFileSync(`./bin/build-csv-from-garlandtools/_cache/${fileName}.json`,  data, {flag: "w" });
  //   function(err) {
  //   // if(err) {
  //   //   console.log(err);
  //   //   return false;
  //   // }
  //   console.log(`${fileName}.json file was saved!`);
  // });

  // return data
}
//@todo integrate this
// function checkStatus(res) {
//   if (res.ok) { // res.status >= 200 && res.status < 300
//     return res;
//   } else {
//     throw Error(res.statusText); //@todo Fill this in propperly
//   }
// },

function getCacheName(url) {
  let explodedUrl = url.split('/');

  return explodedUrl[explodedUrl.length - 1];

}
module.exports = {

  request: function (url, shouldCache=true) {
    console.log(`Requesting ${url}`)

    if (shouldCache) {
      console.log("attempting to fetch cache");
      let cacheData = fetchCache(getCacheName(url));
      if (cacheData !== false) {
        console.log("returning cached data")
        return cacheData
      }
    }

    var res = request('GET', url);
    rawData = res.getBody().toString('utf-8');
    if (shouldCache) {
      console.log("attempting to cache data");
      cache(rawData, getCacheName(url))
    }
    return rawData;
  },
  parseJson: function (rawData) {
    var data = JSON.parse(rawData);
    return data;

  }

}
