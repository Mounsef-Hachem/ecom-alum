import categoriesTypes from './categories.types';

export const addCategoryStart = categoryData => ({
    type: categoriesTypes.ADD_NEW_CATEGORY_START,
    payload: categoryData
});

export const updateCategoryStart = categoryData => ({
    type: categoriesTypes.UPDATE_CATEGORY_START,
    payload: categoryData
});

export const fetchCategoriesStart = (filters = {}) => ({
    type: categoriesTypes.FETCH_CATEGORIES_START,
    payload: filters
});

export const setCategories = categories => ({
    type: categoriesTypes.SET_CATEGORIES,
    payload: categories
});

export const deleteCategoryStart = categoryID => ({
    type: categoriesTypes.DELETE_CATEGORY_START,
    payload: categoryID
});

export const fetchCategoryStart = categoryID => ({
    type: categoriesTypes.FETCH_CATEGORY_START,
    payload: categoryID
});

export const setCategory = category => ({
    type: categoriesTypes.SET_CATEGORY,
    payload: category
});