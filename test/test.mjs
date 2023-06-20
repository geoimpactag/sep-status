/* eslint-env mocha */
/* global process */
import {assert} from "chai";
import util from "../cypress/e2e/util.ts";
describe('Webflow Collection Download', function () {
    it('downloads the webflow collection', async function () {
        const res = await util.fetchCollectionItems(process.env.WEBFLOW_TOKEN);
        assert.equal(res.data.items.length > 0, true);
    });
});