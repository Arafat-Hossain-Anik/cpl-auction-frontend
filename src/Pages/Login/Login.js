import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { contexts } = useAuth();
    const { signInWithEmailPassword, setError, error, user, setLoading } = contexts;
    const location = useLocation();
    const history = useNavigate();
    const redirect_uri = location.state?.from || '/home';
    const { register, handleSubmit, reset } = useForm();
    const handleLogin = (data) => {
        // console.log(data)
        signInWithEmailPassword(data.email, data.password)
            .then((result) => {
                // Signed in 
                // const user = result.user;
                // console.log(user);
                reset();
                setError('');
                history(redirect_uri);
            })
            .catch((error) => {
                // const errorCode = error.code;
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }
    return (
        <div>
            <Header></Header>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 input-field-container roundeds">
                        <h2 className="fw-bold text-center">Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <input className="input-field" type="email" name='email' {...register("email", { required: true })} placeholder='E-Mail' />
                            <br />
                            <input className="input-field" {...register("password", { required: true })} placeholder='Password' type="password" />
                            {error ? <span className='text-danger'>Invalid Email or Password</span> : user.email && <span className='text-success'>Login In Successful</span>}
                            <br />
                            {/* sign in button */}
                            <div className="text-center">
                                <input type="submit" value="Submit" className='form-btn mb-3 mx-2' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;