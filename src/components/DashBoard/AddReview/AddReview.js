import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
const AddReview = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        // console.log(data);
        axios.post('https://bhojon-bari.onrender.com/reviews/', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added successfully');
                    reset();
                }
            })
    }
    return (
        <>
            <div className='add-service pb-5' style={{ height: '50vh' }}>
                <h2 className='text-center p-3 fw-bold text-dark'>Give Us Review</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true, maxLength: 20 })} placeholder='write name' />
                    <textarea {...register("review")} placeholder='write yours review' />
                    <input {...register("ratings")} placeholder='add rating' />
                    <input {...register("img")} placeholder='image url' />
                    <input className='sub rounded' style={{ background: '#198754', border: "none", color: "white", padding: "5px 0", fontWeight: "700" }} type="submit" />
                </form>
            </div>
        </>
    );
};

export default AddReview;