import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Signup = () => {

  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [signupError, setSignupError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  // Create User

  const handleSignup = (data) => {

    setSignupError('');

    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        toast.success(`User has been created successfully.`);
        reset();
        navigate('/add-task');
        const userData = {
          displayName: data.name
        }
        updateUser(userData)
          .then(() => {
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error.message);
        setSignupError(error.message);
      })
  }

  // Google Sign In

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
        const googleUser = {
          name: user.displayName,
          email: user.email
        }
        navigate('/add-task');

        console.log(googleUser);
        setSignupError('');
      })
      .catch(error => {
        setSignupError(error.message);
      });
  }

  return (
    <div className='h-[750px] flex justify-center items-center'>
      <div className='w-96 p-6'>
        <div className='mt-8'>
          <h2 className='text-2xl text-center'>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type='text'
              {...register('name',
                { required: 'Name is required.' })}
              className="input input-bordered w-full bg-gray-200 p-3" />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>
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
              className="input input-bordered w-full bg-gray-200 p-3" />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          </div>
          <div className='mt-6'>
            <input className='btn p-3 bg-blue-800 w-full form-control text-white' value='Sign Up' type="submit" />
          </div>
          <div>
            {signupError && <p className='text-red-600'>{signupError}</p>}
          </div>
        </form>
        <p className='p-4'>Already have an account plesae <strong><Link to='/' className='text-primary text-center'>Login</Link></strong></p>
        <div className='bg-gray-800'>
          <button onClick={handleGoogleSignIn} className="w-full text-white p-3">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;