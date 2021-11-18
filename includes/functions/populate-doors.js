const axios = require("./../connectors/targetApi");
const cache = require("./../cache/main");
const config = require("./../../config");
const logger = require("./../logging/main");

const populateDoors = (callbackFunction) => {
  axios
    .get("door/list?_=1623661926911&propertyFilter=2")
    .then((success) => {
      success.data.instanceList.forEach((door) => {
        cache.doors[door.name] = {
          status: "closed",
          provider: config.providerId,
          doorId: door.name,
          internalId: door.unid.toString(),
        };
      });
      logger.info("Successfully populated doors");
      callbackFunction();
    })
    .catch((error) => {
      console.log(error);
      logger.error("Failed to populate doors");
    });
};

module.exports = populateDoors;
