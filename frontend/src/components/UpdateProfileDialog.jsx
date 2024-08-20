import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map((skill) => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-blue-700">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <Label htmlFor="fullname" className="text-gray-600">Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="email" className="text-gray-600">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="phoneNumber" className="text-gray-600">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="bio" className="text-gray-600">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="skills" className="text-gray-600">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="file" className="text-gray-600">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="border border-gray-300 rounded-lg p-2 mt-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full mt-4 bg-blue-500 text-white" disabled>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;
