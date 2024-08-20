import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const JobSearchHero = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatchAction = useDispatch();
    const navigateTo = useNavigate();

    const handleSearch = () => {
        dispatchAction(setSearchedQuery(searchTerm));
        navigateTo("/browse");
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-20">
            <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                <span className="inline-block px-6 py-2 mb-4 rounded-full bg-white text-purple-500 font-semibold text-xs tracking-wide shadow-md transform transition-transform hover:scale-110">
                    The Leading Job Search Platform
                </span>
                <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
                    Find Your <span className="text-yellow-300">Perfect Job</span> Here
                </h1>
                <p className="text-lg text-gray-100 mb-10">
                    Discover thousands of job opportunities across various industries. Start your journey today.
                </p>
                <div className="flex items-center justify-center bg-white shadow-xl rounded-full overflow-hidden max-w-3xl mx-auto transform transition-transform hover:scale-105">
                    <input
                        type="text"
                        placeholder="Search for your dream job..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-4 px-6 text-gray-700 focus:outline-none"
                    />
                    <Button
                        onClick={handleSearch}
                        className="bg-purple-600 text-white px-8 py-4 rounded-r-full flex items-center justify-center hover:bg-purple-700 transition-colors duration-300"
                    >
                        <Search className="h-6 w-6" />
                    </Button>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply opacity-20 filter blur-3xl -z-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply opacity-20 filter blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply opacity-20 filter blur-3xl -z-10"></div>
        </div>
    );
};

export default JobSearchHero;
