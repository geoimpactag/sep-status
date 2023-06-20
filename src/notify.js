"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// the '../cypress/results/index.json' is created dynamically.
const index_json_1 = __importDefault(require("../cypress/results/index.json"));
const axios_1 = __importDefault(require("axios"));
console.log('Starting the sep-status notification service.');
console.log('Got the report file', index_json_1.default);
/*
* Check if all needed env variables are set
* */
function checkEnv() {
    if (!!process.env.SLACK_URL === false) {
        throw new Error("process.env.SLACK_URL is not defined.");
    }
}
/*
* Crates a Slack notification
* */
async function pushMessageToSlack(message) {
    const apiUrl = process.env.SLACK_URL;
    try {
        const response = await (0, axios_1.default)({
            url: apiUrl,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                text: message
            })
        });
        return response;
    }
    catch (e) {
        let message = '';
        if (e instanceof Error) {
            message = e.message;
        }
        console.error("Failed to push message to Slack:", e);
        throw new Error(`Failed to push message to Slack: ${message}`);
    }
}
(async () => {
    checkEnv();
    const message = `
  Tests run: ${index_json_1.default.stats.start} - ${index_json_1.default.stats.end}
  Tests success: ${index_json_1.default.stats.passPercent}%
  Tests failed: ${index_json_1.default.stats.failures}
  Dashboard: https://geoimpact.github.io/sep-status/
  `.trim();
    const res = await pushMessageToSlack(message);
    console.log('message has been delivered to slack', res);
})();
//# sourceMappingURL=notify.js.map