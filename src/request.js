
var axios = require('axios');
// import axios from 'axios';


const clusterName = 'broadminded63';

async function query(options) {

    return await axios(options);

}

function queryData(q, token) {
    var options = {
        url: 'https://data.' + clusterName + '.hasura-app.io/v1/query',
        data: q,
        method: 'post',
        json: true,
        headers: {
            Authorization: token || undefined,
            "Content-Type": "application/json",
        }
    }

    return query(options);
}

export {queryData,query};


queryData({},undefined).then(e=>console.log(e)).catch(e=>console.log(e))