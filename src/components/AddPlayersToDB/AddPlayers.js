import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx/xlsx.mjs';
import './AddPlayers.css';

const AddPlayers = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/player', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Added successfully');
                    reset();
                }
            })
    }
    //code for file uploading to mongodb

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = async () => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            try {
                await axios.post('http://localhost:5000/api/upload', { data: jsonData });
                alert('Data uploaded successfully');
            } catch (error) {
                console.error(error);
            }
        };
    };
    // ends here 

    return (
        <>
            <div className='add-service mb-5'>
                <h2 className='text-center p-3'>Add A Player</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true, maxLength: 20 })} placeholder='Player Name' />
                    <input {...register("session", { required: true, maxLength: 20 })} placeholder='Player Session' />
                    {/* <input {...register("id", { required: true, maxLength: 20 })} placeholder='Player id' /> */}
                    <input type="number" {...register("price")} placeholder='Base price' />
                    <input type="text" {...register("category", { required: true, maxLength: 20 })} placeholder='Player Category' />
                    <input type="text" {...register("role", { required: true, maxLength: 20 })} placeholder='Player Role' />
                    <textarea {...register("details")} placeholder='description' />
                    <input {...register("image")} placeholder='image url' />
                    <input className='btn btn-success fw-bold' style={{ color: 'white', padding: '8px 0' }} type="submit" />
                </form>
                {/* code for file uploading */}
                <div className='text-center'>
                    <h2 className='my-3'>Upload Player List</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button className='btn btn-success fw-bold' onClick={handleFileUpload}>Upload</button>
                </div>
            </div>
        </>
    );
};

export default AddPlayers;