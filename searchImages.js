const axios = require('axios');
require('dotenv').config();

const pixabay_url = 'https://pixabay.com/api/';

module.exports = async q => {
    try {
        return axios.get(pixabay_url, {
            params: {
                key: process.env.PIXABAY_KEY,
                q
            }
        })

    } catch (error) {

    }

}