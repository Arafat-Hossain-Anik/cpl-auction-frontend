import React from 'react';
import useAuth from '../../hooks/useAuth';
import './SignUpPage.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUpPage = () => {
    const { contexts } = useAuth();
    const { createEmailPasswordUser } = contexts;
    const { register, handleSubmit, reset } = useForm();
    const handleRegistration = (data) => {
        const { name, email, password, managerName } = data;
        const teamDetails = {
            total_points: 4500,
            players: [],
            penalty: 0,
            name,
            email,
            managerName
        }
        createEmailPasswordUser(name, email, password);
        axios.post('https://cpl-backend.onrender.com/teams', teamDetails)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added successfully');
                }
            })
        reset();
    }

    return (
        // sign up form
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 input-field-container roundeds">
                        <h2 className="fw-bold text-center">Sign Up</h2>

                        <form onSubmit={handleSubmit(handleRegistration)}>

                            <input className="input-field" {...register("managerName", { required: true })} placeholder='Manager Name' type="text" />
                            <br />
                            <input className="input-field" {...register("name", { required: true })} placeholder='Team Name' type="text" />
                            <br />
                            {/* <input className="input-field" {...register("email", { required: true })} placeholder='Name' type="text" />
                            <br /> */}

                            <input className="input-field" {...register("email", { required: true })} placeholder='E-mail' type="email" name='email' />
                            <br />

                            <input className="input-field" {...register("password", { required: true })} placeholder='Password' type="password" />
                            <br />
                            {/* sign up and cancel button */}
                            <div className="clearfix text-center">
                                <input type="submit" value="Register" className='form-btn mb-3' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;