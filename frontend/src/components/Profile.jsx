import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg my-8 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-semibold text-blue-800">{user?.fullname}</h1>
                        <p className="text-gray-700 mt-1">{user?.profile?.bio || 'No bio available'}</p>
                        <Button onClick={() => setOpen(true)} className="mt-4" variant="outline" size="sm">
                            <Pen className="w-4 h-4 text-blue-600" />
                        </Button>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center gap-3 text-gray-700 mb-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Contact className="w-5 h-5 text-green-600" />
                        <span>{user?.phoneNumber || 'Not provided'}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-blue-800">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {
                            user?.profile?.skills.length ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-800">{item}</Badge>
                            )) : <span className="text-gray-500">No skills listed</span>
                        }
                    </div>
                </div>
                <div className="mt-6">
                    <Label className="text-lg font-semibold text-blue-800">Resume</Label>
                    {
                        isResume ? (
                            <a 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                href={user?.profile?.resume} 
                                className="text-blue-600 hover:underline"
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500">No resume uploaded</span>
                        )
                    }
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mb-8 p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Applied Jobs</h2>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
