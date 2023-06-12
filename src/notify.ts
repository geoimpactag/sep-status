import 'dotenv/config';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const report = require('../cypress/results/mochawesome.json');
import axios from 'axios';
console.log('Starting the sep-status notification servivce.')
console.log('Got the report file', report)

/*
    Crates a Slack notification
*/
async function pushMessageToSlack (message: string): Promise<any> {
  const apiUrl = process.env.SLACK_URL
  try {
    const response = await axios({
      url: apiUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        text: message
      })
    })
    return response
  } catch (e) {
    let message = ''
    if (e instanceof Error) {
      message = e.message
    }
    throw new Error(`Failed to push message to Slack: ${message}`)
  }
}

await (async () => {
  const message = `Tests passed: ${report.results[0].passes.length}\nTests failed: ${report.results[0].failures.length}`
  const res = await pushMessageToSlack(message)
  console.log('message has been delivered to slack', res)
})()
