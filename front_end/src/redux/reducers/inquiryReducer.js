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
    case 'UPDATE_CHAT_MESSAGES_BY_ID':
      const tempSentInquiriesArray = [...state.sentInquiries];
      const indexSent = state.sentInquiries.findIndex(sentInquiries => sentInquiries._id === action._id);
      if (indexSent !== -1) {
        tempSentInquiriesArray[indexSent].message = [...state.sentInquiries[indexSent].message, action.message];
      };

      const tempRecievedInquiriesArray = [...state.recievedInquiries];
      const indexRecieved = state.recievedInquiries.findIndex(recievedInquiries => recievedInquiries._id === action._id);
      if (indexRecieved !== -1) {
        tempRecievedInquiriesArray[indexRecieved].message = [...state.recievedInquiries[indexRecieved].message, action.message];
      };

      if((indexSent===-1)&&(indexRecieved===-1)){
        return state;
      };
      return { ...state, sentInquiries: tempSentInquiriesArray, recievedInquiries: tempRecievedInquiriesArray };
    default:
      return state;
  }
};


export default inquiryReducer;