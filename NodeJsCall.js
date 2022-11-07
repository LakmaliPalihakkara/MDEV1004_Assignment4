const https = require("https");

_EXTERNAL_URL =
  "https://graph.facebook.com/109660628619429/groups?limit=5&amp;access_token=EAAGOP2uJnOIBALzLAZC4G28f23pZBd65iQpvE53wXSLSnR0fyJIwzFKoZB2G7a0ZAeDYbqA5sMZAYzkBkUrBaRwPIZC6FxEROkvKT03uHsEW3WpPBj7gdXWZAgMRBoLaaZBnNOIvHqVgfY6xT8f8j3di4JANGyuhUTc3yRqGn9eSB3iGZA9ZBbThjCfo4TZBZCmdvmcZBJSLOT4pWos5FnLVJpjoG";

const callExternalApiUsingHttp = (callback) => {
  https
    .get(_EXTERNAL_URL, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        return callback(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

module.exports.callApi = callExternalApiUsingHttp;
