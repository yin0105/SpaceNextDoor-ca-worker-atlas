const axios = require("./../connectors/targetApi");
const cache = require("./../cache/main");
const config = require("./../../config");
const logger = require("./../logging/main");

const refreshToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "authenticate?_=1623661265391&apiClientType=0&username=admin&password=admin"
      )
      .then((success) => {
        if (success.data.authenticated) {
          cache.api.token = success.data.sessionToken;
          cache.api.headers[config.token.key] = cache.api.token;
          axios.defaults.headers.common[config.token.key] = cache.api.token;
          logger.info("Token refresh completed");
          axios
            .get(
              "json/openDynamicSession"
            )
            .then((success) => {
              cache.api.dynamicSession = success.data
              resolve()
            })
            .catch((error) => {
              logger.error("Failed to refresh token", error);
              reject();
            });
        } else {
          logger.error("Failed to refresh token");
          reject();
        }
      })
      .catch((error) => {
        logger.error("Failed to refresh token", error);
        reject();
      });
  });
};

module.exports = refreshToken;
