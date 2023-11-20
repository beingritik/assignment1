// const LOG = require("../../../admin-portal/utils/logger");

/**
 * Converts incoming body chunks into string datatype.
 * @param {*} req Incoming request
 * @param {*} res Server Response
 * @returns A Promise that, on completion resolves to a string or rejects with error.
 */
const getBodyData = function (req, res) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            LOG.logError(`${error}`);
            reject(error);
        }
    });
};

module.exports = { getBodyData }