import React from 'react';

import { FaShippingFast } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { AiOutlineSafety } from 'react-icons/ai';
import { MdLocalOffer } from 'react-icons/md';

import './styles.scss';

const Features = () => {
    return (
        <div className="block features">
            <div className="container">
                <div className="features-list">
                    <div className="features-item">
                        <div className="features-icon">
                            <FaShippingFast />
                        </div>
                        <div className="features-content">
                            <div className="block-features-title">
                                Free Shipping
                            </div>
                            <div className="block-features-subtitle">
                                For orders from $50
                            </div>
                        </div>

                    </div>
                    <div className="features-divider"></div>
                    <div className="features-item">
                        <div className="features-icon">
                            <BiSupport />
                        </div>
                        <div className="features-content">
                            <div className="block-features-title">
                                Support 24/7
                            </div>
                            <div className="block-features-subtitle">
                                Call us anytime
                            </div>
                        </div>
                    </div>
                    <div className="features-divider"></div>
                    <div className="features-item">
                        <div className="features-icon">
                            <AiOutlineSafety />
                        </div>
                        <div className="features-content">
                            <div className="block-features-title">
                                100% Safety
                            </div>
                            <div className="block-features-subtitle">
                                Only secure payments
                            </div>
                        </div>
                    </div>
                    <div className="features-divider"></div>
                    <div className="features-item">
                        <div className="features-icon">
                            <MdLocalOffer />
                        </div>
                        <div className="features-content">
                            <div className="block-features-title">
                                Hot Offers
                            </div>
                            <div className="block-features-subtitle">
                                Discount up to 90%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Features;