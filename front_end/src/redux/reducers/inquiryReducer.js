const initState = () => ({
  inquiries: [],
  sentInquiries: [],
  recievedInquiries: [],
});

const inquiryReducer = (state = initState(), action) => {
  switch (action.type) {
    case 'SET_INQUIRY':
      return { ...state, inquiries: action.inquiries };
    case 'SET_SENT_INQUIRY':
      return { ...state, sentInquiries: action.sentInquiries };
    case 'SET_RECIEVED_INQUIRY':
      return { ...state, recievedInquiries: action.recievedInquiries };
    default:
      return state;
  }
};


export default inquiryReducer;