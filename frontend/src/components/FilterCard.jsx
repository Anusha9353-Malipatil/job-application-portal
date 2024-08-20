import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-6 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Filter Jobs</h1>
            <hr className='mb-4 border-gray-300' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='mb-6'>
                        <h2 className='text-xl font-semibold text-gray-700 mb-2'>{data.filterType}</h2>
                        <div className='space-y-2'>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div key={itemId} className='flex items-center space-x-3'>
                                        <RadioGroupItem value={item} id={itemId} className='h-4 w-4 text-indigo-600 border-gray-300' />
                                        <Label htmlFor={itemId} className='text-gray-600'>{item}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
