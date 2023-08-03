import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <footer className='footer-area text-white'>
            <div className="main">
                <div className="footer-title text-center mb-3">
                    <h2 className=''>CPL-2023</h2>
                    <div className="footer-social">
                        <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <hr />
                <div className="copy">
                    <p style={{ color: 'white' }}><small>&copy; 2023 all rights reserved By CSE-PSTU</small></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;