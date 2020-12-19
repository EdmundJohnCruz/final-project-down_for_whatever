export const setInquiries = (inquiries) => ({
    type: 'SET_INQUIRY',
    inquiries,
});

export const setSentInquiries = (sentInquiries) => ({
    type: 'SET_SENT_INQUIRY',
    sentInquiries,
});

export const setRecievedInquiries = (recievedInquiries) => ({
    type: 'SET_RECIEVED_INQUIRY',
    recievedInquiries,
});

export const updateChatMessagesById = (_id, message) => ({
    type: 'UPDATE_CHAT_MESSAGES_BY_ID',
    _id,
    message,
});