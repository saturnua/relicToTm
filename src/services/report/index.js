// import axios from 'axios';

const { HOST, AUTHORIZATION } = process.env;

const url = HOST;

// const headers = {
//     headers: { Authorization: `${AUTHORIZATION}`, 'Content-Type': 'application/json' },
// };

const send = async (data) => {
    const payload = data;
    console.log(payload);
};
const reportServices = { send }

module.exports = reportServices;