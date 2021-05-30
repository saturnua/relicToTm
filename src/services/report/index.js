// import axios from 'axios';

const { HOST, AUTHORIZATION } = process.env;

const url = HOST;

// const headers = {
//     headers: { Authorization: `${AUTHORIZATION}`, 'Content-Type': 'application/json' },
// };

const send = async (ctx) => {
    const payload = ctx;
    console.log(payload);
    return payload;

};
const reportServices = { send }

module.exports = reportServices;