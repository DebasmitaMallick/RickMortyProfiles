// Reducer function to manage state related to character filtering
export const characterFilterReducer = (state, action) => {
    // Switch statement to handle different action types
    switch(action.type) {
        // Action to set characters in the state
        case 'SET_CHARACTERS':
            return { ...state, characters: action.payload };
        
        // Action to filter characters by status
        case 'FILTER_BY_STATUS':
            return { ...state, byStatus: action.payload }; //adding sort variable 

        // Action to filter characters by location
        case 'FILTER_BY_LOCATION':
                return { ...state, byLocation: action.payload };

        // Action to filter characters by episode
        case 'FILTER_BY_EPISODE':
            return { ...state, byEpisode: action.payload };   

        // Action to filter characters by gender
        case 'FILTER_BY_GENDER':
            return { ...state, byGender: action.payload };

        // Action to filter characters by species
        case 'FILTER_BY_SPECIES':
            return { ...state, bySpecies: action.payload };
        
        // Action to filter characters by type
        case 'FILTER_BY_TYPE':
            return { ...state, byType: action.payload };

        // Action to filter characters by search query
        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }; 

        // Default case returns the current state for unknown action types
        default:
            return state;
    }
}