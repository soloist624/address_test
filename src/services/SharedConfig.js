import Axios from 'axios';

const client = Axios.create({
    baseURL: "https://address.ir/rest/",
    responseType: "json"
});

export default client;