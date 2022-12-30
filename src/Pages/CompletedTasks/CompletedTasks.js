import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';

const CompletedTasks = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const res = fetch(`https://smart-task-manager-tool-server.vercel.app/tasks/complete`);
                const data = await (await res).json();
                return data
            }
            catch (error) {

            }
        }
    });

    // Add Comment
    const handleAddComment = (data) => {

        const comment = {

            name: data.name,
            userEmail: user?.email,
        }

        fetch(`https://smart-task-manager-tool-server.vercel.app/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`Comment is added successfully.`)
                refetch();
            })
    }

    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            try {
                const res = fetch(`https://smart-task-manager-tool-server.vercel.app/my-comments?userEmail=${user?.email}`);
                const data = await (await res).json();
                return data
            }
            catch (error) {

            }
        }
    });


    const handleDeleteNotComplete = (id) => {
        fetch(`https://smart-task-manager-tool-server.vercel.app/tasks/complete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Task deleted succesfully.`);
                }
            })
    }

    const handleNotComplete = (task) => {
        const complete = task.compelte;

        fetch(`https://smart-task-manager-tool-server.vercel.app/tasks/complete/${task?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ complete })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Task completed successfully!");
                    navigate('/my-tasks')
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-4xl text-center p-2 mb-4 mt-10'>Completed Tasks</h2>
            <div>
                {
                    tasks.length === 0 ?
                        <h2 className='text-4xl text-center p-2 mb-4'>You don't have any tasks.</h2>
                        :
                        <section className='mt-8 p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                {
                                    tasks?.map(task => <div key={task._id} className="bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-10">
                                            <img src={task.image} alt="" className="rounded-xl w-32" />
                                        </figure>
                                        <div className="p-4">
                                            <h2 className="text-lg">{task.name}</h2>
                                        </div>
                                        <div className='flex justify-center items-center p-4'>
                                            <button onClick={() => handleNotComplete(task)} className='bg-green-800 p-3 text-white rounded mx-3'>Not Completed</button>
                                            <button onClick={() => handleDeleteNotComplete(task._id)} className='bg-red-800 p-3 text-white rounded'>Delete</button>
                                        </div>
                                        <div className='mt-10 p-2'>
                                            <form onSubmit={handleSubmit(handleAddComment)}>
                                                <div className="form-control w-full mt-6">
                                                    <label className="label">
                                                        <span className="label-text">Comment</span>
                                                    </label>
                                                    <input
                                                        type='text'
                                                        {...register('name',
                                                            )}
                                                        className="input input-bordered w-full  bg-gray-200 p-3" />
                                                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                                                </div>
                                                <div className='mt-6 bg-blue-800'>
                                                    <input className='p-3 w-full form-control text-white' value='Add Comment' type="submit" />
                                                </div>
                                            </form>
                                        </div>
                                        {
                                            comments?.map(comment => <div className="p-4 mb-2" key={comment._id}>
                                            <h2 className="text-lg">Comment: {comment.name}</h2>
                                        </div>)
                                        }
                                    </div>)
                                }


                            </div>
                        </section>
                }
            </div>
        </div>
    );
};

export default CompletedTasks;