const initState = () => ({
    showMainDisplay: "listings",
});

const modalReducer = (state = initState(), action) => {
    switch(action.type){
        case 'DISPLAY_SET':
            return {
                ...state,
                showMainDisplay: action.display,
            };
        default:
            return state;
    }
};

export default modalReducer;