import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles.scss';

import Slide1 from './../../assets/slide-1.jpg';
import Slide2 from './../../assets/slide-2.jpg';
import Slide3 from './../../assets/slide-3.jpg';

const Directory = props => {
    return (
        <div className="directory">
                <div className="slide-container">
                    <Slide>
                        <div className="item">
                            <div style={{ 'backgroundImage': `url(${Slide1})` }}>
                                <div className="content fixed-bottom">
                                    <div className="title">
                                        <h1>Title</h1>
                                    </div>
                                    <div className="text">
                                        <p>Some text</p>
                                    </div>
                                    <div className="button">
                                        <span className="btn btn-primary btn-lg">Shop Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div style={{ 'backgroundImage': `url(${Slide2})` }}>
                                <div className="content fixed-bottom">
                                    <div className="title">
                                        <h1>Title</h1>
                                    </div>
                                    <div className="text">
                                        <p>Some text</p>
                                    </div>
                                    <div className="button">
                                        <span className="btn btn-primary btn-lg">Shop Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div style={{ 'backgroundImage': `url(${Slide3})` }}>
                                <div className="content fixed-bottom">
                                    <div className="title">
                                        <h1>Title</h1>
                                    </div>
                                    <div className="text">
                                        <p>Some text</p>
                                    </div>
                                    <div className="button">
                                        <span className="btn btn-primary btn-lg">Shop Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                </div>
        </div>
    );
};

export default Directory;