import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import UserList from './components/UserList'
import Home from './components/home/Home'
import NavigationRail from './components/navigationRail/NavigationRail.js'
import { getUser, getUsers, saveUser, searchContacts, udpatePhoto } from './api/UserService';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import EventDetail from './components/events/EventDetail'
import EventList from './components/events/EventList'
import { toastError } from './api/ToastService';
import { ToastContainer } from 'react-toastify';
import './index.css'

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    username: '',
    userlogin: '',
    userbio: '',
    usertypeid: '',
    userpicname: ''
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const onFilterChange = (event) => {
  //   setSearchParams({ ...searchParams, [event.target.name]: event.target.value });
  //   console.log( event.target.valuerror);
  // };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveUser(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('userlogin', data.userlogin);
      const { data: photoUrl } = await udpatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        userid: '',
        username: '',
        userlogin: '',
        userbio: '',
        usertypeid: '',
        userpicname: ''
      })
      // getAllUsers();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateUser = async (user) => {
    try {
      const { data } = await saveUser(user);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // const handleSearch = async (event) => {
  //   event.preventDefault(); // Предотвращаем стандартную перезагрузку страницы после отправки формы
  //   getAllUsers();
  // };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  return (
    <>
      {/* <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="name">Имя:</label>
        <input type="text" name="username" value={searchParams.username} onChange={onFilterChange} />

        <label htmlFor="email">Login:</label>
        <input type="text" name="userlogin" value={searchParams.userlogin} onChange={onFilterChange}/>


        <button type="submit">Поиск</button>
      </form>
      </div> */}
      <main className='main'>
        <div class="home">
          <NavigationRail />
          <div class="content">
            <Routes>
              <Route path='/' element={<Navigate to={'/users'} />} />
              <Route path='/home' element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail updateUser={updateUser} updateImage={updateImage} />} />
              <Route path="/events" element={<EventList />}/>
              <Route path='/events/:id' element={<EventDetail />} />
            </Routes>
          </div>      
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
            <div className="input-box">
                <span className="details">UserLogin</span>
                <input type="text" value={values.userlogin} onChange={onChange} name='userlogin' required />
              </div>
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.username} onChange={onChange} name='username' required />
              </div>
              <div className="input-box">
                <span className="details">Userbio</span>
                <input type="text" value={values.userbio} onChange={onChange} name='userbio'/>
              </div>      
              <div className="input-box">
                <span className="details">UserTypeId</span>
                <input type="text" value={values.usertypeid} onChange={onChange} name='usertypeid'/>
              </div>   
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo'/>
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
