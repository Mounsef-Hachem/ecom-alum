import React from 'react';
import { FaGlobeAmericas, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { BsPhone, BsEnvelope } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import "./styles.scss";

import Payments from './../../assets/payments.png';

const Footer = props => {
    return (
        <footer className="site__footer">
            <div className="site-footer">
                <div className="container">
                    <div className="site-footer__widgets">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="site-footer__widget footer-contacts">
                                    <h5 className="footer-contacts__title">
                                        Contact Us
                                    </h5>
                                    <div className="footer-contacts__text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem. Pellentque ac placerat
                                        tellus.
                                    </div>
                                    <ul class="footer-contacts__contacts">
                                        <li><FaGlobeAmericas className="footer-contacts__icon" />
                                            715 Fake Street, New York 10021 USA
                                        </li>
                                        <li><BsEnvelope className="footer-contacts__icon" />
                                            stroyka@example.com
                                        </li>
                                        <li><BsPhone className="footer-contacts__icon" />
                                            (800) 060-0730, (800) 060-0730
                                        </li>
                                        <li><BiTimeFive className="footer-contacts__icon" />
                                            Mon-Sat 10:00pm - 7:00pm
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div class="site-footer__widget footer-links">
                                    <h5 class="footer-links__title">
                                        Information
                                    </h5>
                                    <ul class="footer-links__list">
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                About Us
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Delivery Information
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Brands
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Contact Us
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Returns
                                            </a>
                                        </li>
                                        <li class="footer-links__item">
                                            <a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                                Site Map
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-3 col-lg-2">
                                <div class="site-footer__widget footer-links"><h5 class="footer-links__title">
                                    My Account
                                </h5> <ul class="footer-links__list"><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Store Location
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Order History
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Wish List
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Newsletter
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Specials
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Gift Certificates
                                </a></li><li class="footer-links__item"><a href="/themes/yellow/" class="footer-links__link nuxt-link-active">
                                    Affiliate
                                </a></li></ul></div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-4">
                                <div class="site-footer__widget footer-newsletter">
                                    <h5 class="footer-newsletter__title">
                                        Newsletter
                                    </h5>
                                    <div class="footer-newsletter__text">
                                        Praesent pellentesque volutpat ex, vitae auctor lorem pulvinar mollis felis at lacinia.
                                    </div>
                                    <form action="" class="footer-newsletter__form">
                                        <label for="footer-newsletter-address" class="sr-only">Email Address</label>
                                        <input id="footer-newsletter-address" type="text" placeholder="Email Address..." class="footer-newsletter__form-input form-control" />
                                        <button class="footer-newsletter__form-button btn btn-primary">
                                            Subscribe
                                        </button>
                                    </form>
                                    <div class="footer-newsletter__text footer-newsletter__text--social">
                                        Follow us on social networks
                                    </div> <div class="footer-newsletter__social-links social-links social-links--shape--circle">
                                        <ul class="social-links__list">
                                            <li class="social-links__item">
                                                <a href="https://themeforest.net/user/kos9" target="_blank" class="social-links__link social-links__link--type--facebook">
                                                    <FaFacebookSquare />
                                                </a>
                                            </li>

                                            <li class="social-links__item">
                                                <a href="https://themeforest.net/user/kos9" target="_blank" class="social-links__link social-links__link--type--instagram">
                                                    <FaInstagram />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="site-footer__bottom">
                        <div class="site-footer__copyright">
                            Made by Saad MOUTALIB & Monsif ELHACHMI —
                            2021
                        </div>
                        <div class="site-footer__payments"><img src={Payments} alt="" />
                        </div>
                    </div>
                </div>
                <div className="totop">
                    <div className="totop__body">
                        <div className="totop__start">
                        </div>
                        <div className="totop__container container">
                        </div>
                        <div className="totop__end">
                            <button type="button" className="totop__button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" className="">
                                    <path d="M11.4 7.7l-4.9-5-4.9 5c-.4.4-.9.4-1.3 0s-.4-.9 0-1.3L6.5 0l6.2 6.4c.4.4.3.9 0 1.3s-.9.4-1.3 0z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;