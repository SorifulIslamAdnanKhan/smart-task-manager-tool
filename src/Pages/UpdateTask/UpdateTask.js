import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const navigate = useNavigate();

    const singleTask = useLoaderData();
    const [storedTask, setStoredtask] = useState(singleTask);

    const handleUpdate = (event) => {
        event.preventDefault();

        fetch(`https://smart-task-manager-tool-server.vercel.app/task/${singleTask._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(storedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Task updated successfully!");
                    navigate('/my-tasks')
                }
            })
    }

    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newTask = { ...storedTask };
        newTask[field] = value;
        setStoredtask(newTask);
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-6'>
                <div className='mt-8'>
                    <h2 className='text-4xl text-center'>Update Task</h2>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Task Name</span>
                        </label>
                        <input
                            onChange={handleInputChange}
                            defaultValue={singleTask.name}
                            type='text'
                            name='name'
                            className="input input-bordered w-full bg-gray-200 p-3" />
                    </div>
                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            onChange={handleInputChange}
                            defaultValue={singleTask.image}
                            type='text'
                            name='image'
                            className="input input-bordered w-full bg-gray-200 p-3" />
                    </div>
                    <div className='mt-6 bg-blue-800'>
                        <input className='p-3 w-full form-control text-white' value='Submit' type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;