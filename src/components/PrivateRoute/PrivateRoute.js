import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const PrivateRoute = ({ children, ...rest }) => {
  const { contexts } = useAuth();
  // contexts.user.email
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
  if (contexts.user.email) {
    return children;
  }
  if (!contexts.user.email) return <Navigate to="/login" state={{ from: location }} />
};

export default PrivateRoute;