const axios = require("./../connectors/targetApi");
const cache = require("./../cache/main");
const logger = require("./../logging/main");

const openDoor = (provider_id, door_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
          "json/doorMomentaryUnlock?unid=" +
          cache.doors[door_id].internalId,
      ).then((success)=>{
        logger.info('Door opened successfully (door id: '+door_id+')')
        resolve(true)
    }).catch((error)=>{
        logger.error('Failed to open door (door id: '+door_id+')')
        reject(false)
    })
  });
};

module.exports = openDoor;
