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
    return cacheData;
  }
  return cacheData;
}

function cache(data, fileName)
{
  fs.writeFileSync(`./bin/build-csv-from-garlandtools/_cache/${fileName}.json`,  data, {flag: "w" });
}

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
