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