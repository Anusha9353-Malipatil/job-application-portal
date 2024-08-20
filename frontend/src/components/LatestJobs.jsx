import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#FF6347]'>Latest </span> 
                <span className='text-[#4A90E2]'>Jobs</span>
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 
                        ? <span className='text-gray-500'>No Jobs Available</span> 
                        : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
};

export default LatestJobs;
