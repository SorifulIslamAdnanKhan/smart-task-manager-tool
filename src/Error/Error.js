import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='mt-8 h-[200px] text-center'>
            <h2 className='text-4xl mb-4'>404 not found</h2>
            <Link to='/'>Back To Home</Link>
        </div>
    );
};

export default Error;