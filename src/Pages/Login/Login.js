import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider'
import toast from 'react-hot-toast';

const Login = () => {

    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {

        setLoginError('');

        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success(`Successfully logged in.`);
                navigate('/add-task');
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    };

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-6'>
                <div className='mt-8'>
                    <h2 className='text-2xl text-center'>Log In</h2>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className=''>
                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='email' {...register('email', { required: true })} className="input input-bordered w-full bg-gray-200 p-3" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full mt-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type='password'
                            {...register('password',
                                {
                                    required: 'Password is required',
                                    pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: 'Password must be uppercase and number' },
                                    minLength: { value: 5, message: 'Password must be 5 characters long.' }
                                })}
                            className="input input-bordered w-full  bg-gray-200 p-3" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                    <div className='mt-6 bg-blue-800'>
                        <input className='w-full form-contro text-white p-3' value='Log In' type="submit" />
                    </div>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;