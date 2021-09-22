import React from 'react';
import Features from '../../components/Features';
import Directory from './../../components/Directory'
import './styles.scss';

const HomePage = props => {
    return (
        <div>
            <Directory />
            <Features />
        </div>
    );
};

export default HomePage;