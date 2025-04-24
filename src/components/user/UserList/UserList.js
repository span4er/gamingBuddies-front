import React from 'react';
import User from "../User"
import { useEffect, useRef, useState } from 'react';
import TopAppBar from '../../topAppBar/TopAppBar';
import { getUser, getUsers, saveUser, searchContacts, udpatePhoto } from '../../../api/UserService';
import { toastError, toastSuccess } from '../../../api/ToastService';

function UserList(){

    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const [searchParams, setSearchParams] = useState({name: "",
        userid: '',
        username: '',
        userlogin: '',
        userbio: '',
        usertypeid: '',
        userpicname: ''
    });

    const appBarConfig = {
        showBackButton: true,
        backLabel: "Назад",
        title: "Друзья"
    };

    const getAllUsers = async (page = 0, size = 10) => {
        try {
          setCurrentPage(page);
          const { data } = await getUsers(searchParams,page, size);
          setData(data);
          console.log(data);
        } catch (error) {
          console.log(error);
          toastError(error.message);
        }
      };

    useEffect(() => {
        getAllUsers();
    }, []); 

    return (
        <div>
            <TopAppBar config={appBarConfig} />
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

            <ul className='contact__list'>
                {data?.content?.length > 0 && data.content.map(user => <User user={user} key={user.userid} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getAllUsers(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllUsers(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllUsers(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </div>
    )
}

export default UserList