import { ApiInbox, ApiDraft, ApiSent, ApiSetSingle } from '../API/index';

const INBOX_MAILS = 'INBOX_MAILS';
const SENT_MAILS = 'SENT_MAILS';
const DRAFT_MAILS = 'DRAFT_MAILS';
const SINGLE_MAIL = 'SINGLE_MAIL';


const initialState = {
    mails: [],
    drafts: [],
    sent: [],
    single: {}
}

export function mailReducer(state = initialState, { type, payload }) {

    switch (type) {
        case INBOX_MAILS:
            return {
                ...state,
                mails: [...payload]
            };
        case SENT_MAILS:
            return {
                ...state,
                sent: [...payload]
            };
        case DRAFT_MAILS:
            return {
                ...state,
                drafts: [...payload]
            };
        case SINGLE_MAIL:
            return {
                ...state,
                single: {...payload }
            }
        default:
            return state

    }
}

const inboxMails = (mails) => {
    return {
        type: INBOX_MAILS,
        payload: mails
    }
}

const sentMails = (mails) => {
    return {
        type: SENT_MAILS,
        payload: mails
    }
}

const draftMails = (mails) => {
    return {
        type: DRAFT_MAILS,
        payload: mails
    }
}
const singleMail = (mail) => {
    return {
        type: SINGLE_MAIL,
        payload: mail
    }
}






/// Middlewares
export const takeInboxMails = () => async(dispatch) => {
    try {
        const response = await ApiInbox();
        const json = await response.json();
        dispatch(inboxMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const takeSentMails = () => async(dispatch) => {
    try {
        const response = await ApiSent();
        const json = await response.json();
        dispatch(sentMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const takeDraftMails = () => async(dispatch) => {
    try {
        const response = await ApiDraft();
        const json = await response.json();
        dispatch(draftMails(json));


    } catch (error) {
        console.log(error.message)
    }
}


export const takeSingleMail = (id) => async(dispatch) => {
    try {
        const response = await ApiSetSingle({}, id);
        const json = await response.json();
        dispatch(singleMail(json));

    } catch (error) {

    }
}