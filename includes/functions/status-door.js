const axios = require("./../connectors/targetApi");
const cache = require("./../cache/main");
const logger = require("./../logging/main");

const checkDoorStatus = (provider_id, door_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "json/getAllChangedDevUnidToDevStateWithTimeout?timeout=5000&token=" +
          cache.api.dynamicSession +
          "&devType=1"
      )
      .then((success) => {
        let found = false;
        if(success.data.length <=3){
          success.data.forEach((row)=>{
            if(row.key == cache.doors[door_id].internalId ){
              found = true
            }
          })
          if(found){
            logger.info("Successfully got door status (open) (door id: " + door_id + ")");
            resolve("open")
          }else{
            logger.info("Successfully got door status (closed) (door id: " + door_id + ")");
            resolve("closed")
          }
        }else{
          logger.info("Successfully got door status (closed) (door id: " + door_id + ")");
          resolve("closed")
        }
      })
      .catch((error) => {
        console.log(error);
        logger.error("Failed to door status (door id: " + door_id + ")");
        reject(false);
      });
  });
};

module.exports = checkDoorStatus;
