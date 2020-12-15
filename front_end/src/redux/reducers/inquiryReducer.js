const initState = () => ({
    inquiries: [],
    listingId: null //Update when we click more details
  });
  
  const inquiryReducer = (state = initState(), action) => {
    switch(action.type){
      case 'SET_INQUIRY':
        return { ...state, inquiries: action.inquiries };
    }
  
    return state;
  };
  
  
  export default inquiryReducer;