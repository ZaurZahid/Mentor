const domainMain = 'http://localhost:3000/';

function isEmpty(obj) {
    for (var x in obj) {
        return false;
    }
    return true;
}

function fetchApi(method, api, endpoint) {
    return (data, value = '') => {
        let getParams = '';
        let options = {};
        if (localStorage.getItem("token")) {
            options.headers = {};
            options.headers.Authorization = localStorage.getItem("token");
            options.headers["Content-Type"] = "application/json";
            options.headers.Accept = 'application/json';
        }
        if (method !== 'GET') {

            options.body = data;

            options.method = method;

            return fetch(`${api}${endpoint}${value}${getParams}`, options);
        }
        if (!isEmpty(data)) {
            getParams += '?';
            for (let key in data) {
                getParams += `${key}=${data[key]}&`;
            }
        }

        return fetch(`${api}${endpoint}${value}${getParams}`, options)
    }
};


export const ApiInbox = fetchApi('GET', domainMain, "inbox/");
export const ApiDraft = fetchApi('GET', domainMain, "sent/");
export const ApiSent = fetchApi('GET', domainMain, "draft/");
export const ApiSentMail = fetchApi('POST', domainMain, "sent/");
export const ApiSetSingle = fetchApi('GET', domainMain, "inbox");