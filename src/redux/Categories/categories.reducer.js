import categoriesTypes from './categories.types';

const INITIAL_STATE = {
    categories: [],
    category: {}
};

const categoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case categoriesTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case categoriesTypes.SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state;
    }
};

export default categoriesReducer;