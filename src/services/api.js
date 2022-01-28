// require('dotenv').config({ path: '@/../.env' })
// const VUE_APP_API_LINK = 'https://powerful-springs-55155.herokuapp.com';
const VUE_APP_API_LINK = 'http://192.168.178.29:5000';
// import * as Vue from 'vue'

const api = {
        post: async (path,data) => {
            const token = localStorage.getItem('token') || '';

            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
            return result;

        },
        get: async (path) => {
            const token = localStorage.getItem('token') || '';

            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "GET",
                "crossDomain": true,
                "headers": {
                    'x-access-token': token
                },
            }).then(response => response.json());
            return result;
        },
        put: async (path,data) => {
            const token = localStorage.getItem('token') || '';

            let result = await fetch(VUE_APP_API_LINK + path, {
                "method": "PUT",
                "headers": {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                "crossDomain": true,
                body: JSON.stringify(data)
            }).then(response => response.json());
            return result;

        },
        getImage: async (path) => {
            const token = localStorage.getItem('token') || '';

            let response = await fetch(VUE_APP_API_LINK + path, {
                "method": "GET",
                "crossDomain": true,
                "headers": {
                    'x-access-token': token
                },
            })
            let result = await response.blob();
            return result;
        },
    }
// });

export default api;