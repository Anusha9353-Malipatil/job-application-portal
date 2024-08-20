import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-white shadow-md'>
            <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
                <h1 className='text-3xl font-extrabold text-gray-800'>
                    Job<span className='text-[#F83002]'>Portal</span>
                </h1>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-8'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-[#6A38C2] transition-colors'>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li className='hover:text-[#6A38C2] transition-colors'>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-[#6A38C2] transition-colors'>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className='hover:text-[#6A38C2] transition-colors'>
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li className='hover:text-[#6A38C2] transition-colors'>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="outline" className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] text-white px-4 py-2 hover:bg-[#5b30a6] transition-colors duration-300">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#6A38C2] transition-all">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                                <div className='flex flex-col'>
                                    <div className='flex gap-3 items-center mb-4'>
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-lg text-gray-800'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2 text-gray-600'>
                                        {user && user.role === 'student' && (
                                            <div className='flex items-center gap-2 cursor-pointer hover:text-[#6A38C2]'>
                                                <User2 className="text-gray-500" />
                                                <Link to="/profile">
                                                    <Button variant="link" className="hover:underline">View Profile</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2 cursor-pointer hover:text-[#F83002]'>
                                            <LogOut className="text-gray-500" />
                                            <Button onClick={logoutHandler} variant="link" className="hover:underline">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
