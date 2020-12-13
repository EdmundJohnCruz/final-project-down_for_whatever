const initState = () => ({
    inquiries: []
  });
  
  const inquiryReducer = (state = initState(), action) => {
    switch(action.type){
      case 'SET_INQUIRY':
        return { ...state, inquiries: action.inquiries };
    }
  
    return state;
  };
  
  
  export default inquiryReducer;