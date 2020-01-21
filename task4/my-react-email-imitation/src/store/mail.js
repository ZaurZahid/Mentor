import { getInboxAPI, getDraftAPI, getSentAPI, getSingleAPI } from '../API/index';

const SET_INBOX_MAILS = 'SET_INBOX_MAILS';
const SET_SENT_MAILS = 'SET_SENT_MAILS';
const SET_DRAFT_MAILS = 'SET_DRAFT_MAILS';
const SET_SINGLE_MAIL = 'SET_SINGLE_MAIL';


const initialState = {
    mails: [],
    drafts: [],
    sent: [],
    single: {}
}

export function mailReducer(state = initialState, { type, payload }) {

    switch (type) {
        case SET_INBOX_MAILS:
            return {
                ...state,
                mails: [...payload]
            };
        case SET_SENT_MAILS:
            return {
                ...state,
                sent: [...payload]
            };
        case SET_DRAFT_MAILS:
            return {
                ...state,
                drafts: [...payload]
            };
        case SET_SINGLE_MAIL:
            return {
                ...state,
                single: {...payload }
            }
        default:
            return state

    }
}

const setInboxMails = (mails) => {
    return {
        type: SET_INBOX_MAILS,
        payload: mails
    }
}

const setSentMails = (mails) => {
    return {
        type: SET_SENT_MAILS,
        payload: mails
    }
}

const setDraftMails = (mails) => {
    return {
        type: SET_DRAFT_MAILS,
        payload: mails
    }
}
const setSingleMail = (mail) => {
    return {
        type: SET_SINGLE_MAIL,
        payload: mail
    }
}






/// Middlewares
export const getInboxMails = () => async(dispatch) => {
    try {
        const response = await getInboxAPI();
        const json = await response.json();
        dispatch(setInboxMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const getSentMails = () => async(dispatch) => {
    try {
        const response = await getSentAPI();
        const json = await response.json();
        dispatch(setSentMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const getDraftMails = () => async(dispatch) => {
    try {
        const response = await getDraftAPI();
        const json = await response.json();
        dispatch(setDraftMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const getSingleMail = (id) => async(dispatch) => {
    try {
        const response = await getSingleAPI({}, id);
        const json = await response.json();
        dispatch(setSingleMail(json));

    } catch (error) {

    }
}