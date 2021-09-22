import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesStart } from '../../redux/Categories/categories.actions';

import ManageCategories from '../../components/ManageCategories';

const mapState = ({ categoriesData }) => ({
    categories: categoriesData.categories.data
});

const AdminCategories = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchCategoriesStart()
        );
    }, []);

    return (
        <div className="container">
            <PageHeader title={"Manage Categories"} />
            <ManageCategories categories={categories} />
        </div>
    )
};

export default AdminCategories;