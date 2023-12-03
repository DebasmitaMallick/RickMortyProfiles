export const characterFilterReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CHARACTERS':
            return { ...state, characters: action.payload };
        case 'FILTER_BY_STATUS':
            return { ...state, byStatus: action.payload }; //adding sort variable 

        case 'FILTER_BY_LOCATION':
                return { ...state, byLocation: action.payload };

        case 'FILTER_BY_EPISODE':
            return { ...state, byEpisode: action.payload };   

        case 'FILTER_BY_GENDER':
            return { ...state, byGender: action.payload };

        case 'FILTER_BY_SPECIES':
            return { ...state, bySpecies: action.payload };
        
        case 'FILTER_BY_TYPE':
            return { ...state, byType: action.payload };

        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }; 
            
        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
             }; 

        default:
            return state;
    }
}