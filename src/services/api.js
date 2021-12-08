// require('dotenv').config({ path: '@/../.env' })
// const VUE_APP_API_LINK = 'https://powerful-springs-55155.herokuapp.com';
const VUE_APP_API_LINK = 'http://192.168.178.29:5000';
// import * as Vue from 'vue'

const api = {
        post: async (path,data) => {

            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
            return result;

        },
        get: async (path) => {
            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "GET",
                "crossDomain": true,
            }).then(response => response.json());
            return result;
        },
        put: async (path,data) => {

            console.log(data)

            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "PUT",
                "headers": {
                    'Content-Type': 'application/json'                },
                "crossDomain": true,
                body: JSON.stringify(data)
            }).then(response => response.json());
            return result;

        },
    }
// });

export default api;