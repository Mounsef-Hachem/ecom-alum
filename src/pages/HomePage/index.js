import React from 'react';
import Featured from '../../components/Featured';
import Features from '../../components/Features';
import PopularCategories from '../../components/PopularCategories';
import Directory from './../../components/Directory'
import './styles.scss';

const HomePage = props => {
    return (
        <div>
            <Directory />
            <Features />
            <Featured />
            <PopularCategories />
        </div>
    );
};

export default HomePage;