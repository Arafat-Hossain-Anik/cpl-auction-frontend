import React from 'react';
import {
    Link,
    Outlet
} from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import './DashBoardBody.css';
import { Nav, NavDropdown, NavLink } from 'react-bootstrap';
import Footer from '../../Footer/Footer';


const DashBoardBody = () => {
    const { contexts } = useAuth();
    //console.log(contexts.admin);
    const defImg = 'https://randomuser.me/api/portraits/men/60.jpg';
    return (
        <div>
            <div>
                <div className='dashboard-header'>
                    <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/home`}>Home</Link>
                    <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/available-players`}>Available Players</Link>
                    {!contexts.admin ? (
                        <>
                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/my-players`}>My Players</Link>
                        </>) : (
                        <>
                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/players`}>All Players</Link>

                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/all-teams`}>View All Teams</Link>


                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/add-player`}>Add Player</Link>

                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/make-admin`}>Make Admin</Link>
                            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} to={`/dashboard/register`}>Register User</Link>
                        </>)
                    }
                    {!contexts.user.email ? (
                        <>
                            <Nav.Link as={NavLink} to="/login" className="text-white">
                                Log in
                            </Nav.Link>
                        </>
                    ) : (
                        <>
                            <NavDropdown
                                title={
                                    <img
                                        style={{
                                            width: "45px",
                                            borderRadius: "50%",
                                        }}
                                        src={contexts.user.photoURL ? contexts.user.photoURL : defImg}
                                        alt=""
                                    />
                                }
                            >
                                <div className="text-center">
                                    <h6>{contexts?.user?.displayName}</h6>
                                    <p className="m-0 mb-2">{contexts.user.email}</p>
                                    <button onClick={contexts.logOut} className="btn btn-danger fw-bold">
                                        Sign Out
                                    </button>
                                </div>
                            </NavDropdown>
                        </>
                    )}
                </div>
                <Outlet />
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DashBoardBody;