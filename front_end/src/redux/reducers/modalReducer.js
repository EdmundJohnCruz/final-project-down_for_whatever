const initState = () => ({
    showLCF: false,
    showDEL: false,
});

const modalReducer = (state = initState(), action) => {
    switch(action.type){
        case 'LCF_SET':
            return {
                ...state, //copies old state
                showLCF: action.show, //imports the new username
            };
        case 'DEL_SET':
            return {
                ...state,
                showDEL: action.show,
            }
        default:
            return state; //ignores action if no modification
    }
};

export default modalReducer;