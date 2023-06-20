/* eslint-env node */
import axios from "axios";
import 'dotenv/config';

export async function fetchCollectionItems(token: string) {
    return axios({
        url: 'https://api.webflow.com/collections/6321d649488f5f57b87f085a/items',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        console.log("got item collection", res?.data?.items?.length);
        return res;
    })
}
export default {
    fetchCollectionItems
}