var _ = require('lodash');
let yellow_scrip_item_id = 17834;
let white_scrip_item_id = 25200;

function _getScripMinRequirement(enhancedNode, scripId) {
  if (typeof enhancedNode.masterpiece === 'undefined') {
    return null;
  }
  if (enhancedNode.masterpiece.reward !== scripId) {

    return null;
  }
  return enhancedNode.masterpiece.rating[0];
}

module.exports = {
  generate: function (itemData, nodeData, enhancedNode) {

    function getName() {
      return itemData.item;
    }

    function getLevel() {
      return nodeData.lvl;
    }

    function getStars() {
      if (typeof nodeData.stars !== 'undefined'){
        return nodeData.stars;
      }
      return null;
    }

    function getLocation() {
      return nodeData.zone;
    }

    function getPos() {
      return `x${nodeData.coords[0]}:y${nodeData.coords[1]}`;
    }

    function getSlot() {
      return itemData.slot;
    }

    function getDuration() {

      return `${nodeData.uptime / 60}:00`;
    }

    function getTimes() {
      let time = ''
      _.each(nodeData.time, (nodeTime, index) => {
        if(nodeTime === 0) {
          time += '12:00 AM'
        } else if(nodeTime > 0 && nodeTime < 12) {
          time += nodeTime + ":00 AM"
        } else if (nodeTime === 12) {
          time += '12:00 PM'
        } else if (nodeTime > 12) {
          time += nodeTime - 12 + ":00 PM"
        }

        if (nodeData.time.length > 1 && index !== nodeData.time.length - 1) {
           time += ','
        }

      });
      time += ''
      return time;
    }

    function isCollectable() {
      return (enhancedNode.collectable == "1").toString().toUpperCase();
    }

    function isLegendary() {
      return  (nodeData.name == 'Legendary').toString().toUpperCase();
    }

    function isEphemeral() {
      return (nodeData.name == 'Ephemeral').toString().toUpperCase();
    }

    function getYellowScrip() {
      return _getScripMinRequirement(enhancedNode, yellow_scrip_item_id);

    }

    function getWhiteScrip() {
      return _getScripMinRequirement(enhancedNode, white_scrip_item_id);
    }

    return {
      name: getName(),
      level: getLevel(),
      stars: getStars(),
      location: getLocation(),
      pos: getPos(),
      slot: getSlot(),
      duration: getDuration(),
      times: getTimes(),
      is_collectable: isCollectable(),
      is_legendary: isLegendary(),
      is_ephemeral: isEphemeral(),
      yellow_scrip: getYellowScrip(),
      white_scrip: getWhiteScrip()
    };
  }
}
