import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const res = fetch(`https://smart-task-manager-tool-server.vercel.app/my-tasks?userEmail=${user?.email}`);
                const data = await (await res).json();
                return data
            }
            catch (error) {

            }
        }
    });

    const handleDelete = (id) => {
        fetch(`https://smart-task-manager-tool-server.vercel.app/task/${id}`, {
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

    const handleComplete = (task) => {
        const complete = task.compelte;

        fetch(`https://smart-task-manager-tool-server.vercel.app/task/${task?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ complete })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Task completed successfully!");
                    navigate('/completed-tasks')
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-4xl text-center p-2 mb-4 mt-10'>My tasks</h2>
            <div>
                {
                    tasks.length === 0 ?
                        <h2 className='text-4xl text-center p-2 mb-4'>You don't have any tasks.</h2>
                        :
                        <section className='mt-8 p-2'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                {
                                    tasks?.map(task => <div key={task._id} className="bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-10">
                                            <img src={task.image} alt="" className="rounded-xl w-32" />
                                        </figure>
                                        <div className="p-4">
                                            <h2 className="text-lg">{task.name}</h2>
                                        </div>

                                        <div className='flex justify-center items-center p-2'>
                                            <Link to={`/update/${task._id}`} type="button" className="bg-blue-800 p-3 text-white rounded mx-3">Update</Link>
                                            <button onClick={() => handleDelete(task._id)} className='bg-red-800 p-3 text-white rounded mx-3'>Delete</button>
                                            {
                                                task.complete === 'False' ?
                                                    <button onClick={() => handleComplete(task)} className='bg-green-800 p-3 text-white rounded mx-3'>Completed</button>
                                                    :
                                                    <button className='bg-gray-800 p-3 text-white rounded' disabled>Task Completed</button>
                                            }
                                        </div>
                                    </div>)
                                }
                            </div>
                        </section>

                }
            </div>
        </div>
    );
};

export default MyTasks;