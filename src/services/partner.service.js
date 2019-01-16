import axios from 'axios';

const url = 'http://api.reservacation.com';

export function postAction(form) {
    axios.post(`${url}/stores`, form);
}