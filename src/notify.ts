console.log("Starting the sep-status notification servivce.");
import 'dotenv/config'
import * as report from "../cypress/results/mochawesome.json";
import axios, {AxiosResponse} from 'axios';

console.log("Got the report file", report);

/*
    Crates a Slack notification
*/
async function pushMessageToSlack(message: string) {
    const apiUrl = process.env.SLACK_URL;
    try {
        const response = await axios({
            url: apiUrl,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                text: message
            })
        });
        return response;
    } catch (error) {
        throw new Error(`Failed to push message to Slack: ${error.message}`);
    }
}

(async ()=>{
    const message = `Tests passed: ${report.results[0].passes.length}\nTests failed: ${report.results[0].failures.length}`;
    const res = await pushMessageToSlack(message)
    console.log("message has been delivered to slack", res);
})()