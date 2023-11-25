require('dotenv').config();

export async function getTokenHRM() {
    const baseUrl = `${process.env.BASE_URL_HRM}`;
    const axios = require('axios');
    const qs = require('querystring');
    const body = qs.stringify({
        client_id: 'api_oauth_id', client_secret: 'oauth_secret',
        grant_type: 'password', username: `${process.env.USER_WEBSITE}`, password: `${process.env.PASSWORD}`
    });
    const config = { headers: { 'Authorization': `Bearer`, 'Content-Typ': 'application/x-www-form-urlencoded', 'Accept': 'application/json', } };
    const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    const accessToken = res.data['access_token'];
    return accessToken;
}


