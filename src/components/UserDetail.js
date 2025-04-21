import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../api/UserService';
import { toastError, toastSuccess } from '../api/ToastService';

const UserDetail = ({ updateUser, updateImage }) => {
    const inputRef = useRef();
    const [user, setUser] = useState({
        userid: '',
        username: '',
        userlogin: '',
        userbio: '',
        usertypeid: '',
        userpicname: ''
    });

    const { id } = useParams();

    const fetchUser = async (id) => {
        try {
            const { data } = await getUser(id);
            setUser(data);
            console.log(data);
            //toastSuccess('Contact retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const udpatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setUser((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            toastSuccess('Photo updated');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onUpdateUser = async (event) => {
        event.preventDefault();
        await updateUser(user);        
        fetchUser(id);
        toastSuccess('Contact Updated');
    };

    useEffect(() => {
        fetchUser(id);
    }, []);

    return (
        <>
            <Link to={'/users'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={user.userpicname} alt={`Profile photo of ${user.username}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{user.userlogin}</p>
                        <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateUser} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={user.userid} name="userid" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={user.username} onChange={onChange} name="username" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Bio</span>
                                    <input type="text" value={user.userbio} onChange={onChange} name="userbio" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default UserDetail;