const initState = () => ({
  listings: []
});

const listingReducer = (state = initState(), action) => {
  switch(action.type){
      case 'LISTING_UPDATE_LISTINGS':
          return {
              ...state,
              listings: action.listings, //imports the new listings
          };
      default:
          return state; //ignores action if no modification
  }
};

export default listingReducer;