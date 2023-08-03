import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const AdminRoute = ({ children, ...rest }) => {
    const { contexts } = useAuth();
    const { user, admin } = contexts;
    const location = useLocation();
    if (contexts.loading) {
        return (
            <>
                <Header></Header>
                <div className='text-danger text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                <Footer></Footer>
            </>
        );
    }
    if (user.email && admin) {
        return children;
    }
    if (!user.email && admin) return <Navigate to="/login" state={{ from: location }} />
};

export default AdminRoute;