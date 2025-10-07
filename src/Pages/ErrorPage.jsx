import React from 'react';
import errorImg from '../assets/error-404.png'

const ErrorPage = () => {
    return (
        <div>
            <img src={errorImg} alt="" />
            <h1 className='text-2xl'>Opps, page not found</h1>
            <p>The page you are looking for is not available.</p>
            <button className='btn btn-outline'>Go Back!</button>
        </div>
    );
};

export default ErrorPage;