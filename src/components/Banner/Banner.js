import React from 'react';
import { NavLink } from 'react-router-dom';
import './Banner.css';
const Banner = () => {
    return (
        <div className="cover-body">
            <div className="hero-image">
                <div className="hero-text d-flex flex-column align-items-center">
                    <h1 className="cover-header">WELCOME TO</h1>
                    <h1 className="cover-header">PSTU CPL AUCTION 2023</h1>
                    <p className="fs-4 fs-md-5">Choose Best Players and Make Your Team</p>
                    <NavLink to="/login">
                        <button className="btn btn-success"> <i className="fas fa-sign-in-alt"></i> Log in Now</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Banner;