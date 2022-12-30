import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddTask = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_IMBB_Key;

    const handleAddTask = (data) => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(photoData => {
                console.log(photoData);
                if (photoData.success) {
                    const task = {
                        complete: 'False',
                        name: data.name,
                        image: photoData.data.url,
                        userEmail: user?.email,
                    }

                    fetch(`http://localhost:5000/task`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`Task is added successfully.`)
                            navigate('/my-tasks')
                        })
                }
            })
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-6'>
                <div className='mt-8'>
                    <h2 className='text-4xl text-center'>Add Task</h2>
                </div>
                <form onSubmit={handleSubmit(handleAddTask)}>
                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Task Name</span>
                        </label>
                        <input
                            type='text'
                            {...register('name',
                                { required: 'Task name is required.' })}
                            className="input input-bordered w-full  bg-gray-200 p-3" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type='file'
                            {...register('image',
                                { required: 'Image is required.' })}
                            className="input input-bordered w-full" />
                        {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                    </div>
                    <div className='mt-6 bg-blue-800'>
                        <input className='p-3 w-full form-control text-white' value='Submit' type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddTask;