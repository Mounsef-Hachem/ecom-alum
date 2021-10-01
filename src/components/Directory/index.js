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
            <div className="container">
                <Slide>
                    <div className="item">
                        <div style={{ 'backgroundImage': `url("https://www.bricoma.ma/pub/media/switcher_switcher/r/a/rangement_ordinateur.jpeg")` }}>

                        </div>
                    </div>
                    <div className="item">
                        <div style={{ 'backgroundImage': `url("https://www.bricoma.ma/pub/media/switcher_switcher/s/e/se_curite_ordinateur.jpeg")` }}>

                        </div>
                    </div>
                    <div className="item">
                        <div style={{ 'backgroundImage': `url("https://www.bricoma.ma/pub/media/switcher_switcher/v/e/version_mobile_bosch.jpeg")` }}>
                            <div className="content fixed-bottom">

                            </div>
                        </div>
                    </div>
                </Slide>
            </div>
        </div>
    );
};

export default Directory;