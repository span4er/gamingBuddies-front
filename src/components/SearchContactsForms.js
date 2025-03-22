import React, { useState } from 'react';
import axios from 'axios'; // Если используется Axios
import { getContacts } from '../api/ContactService';
import ContactList from './ContactList';
const SearchUsersForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [foundUsers, setFoundUsers] = useState([{id: '',
  name: '',
  email: ''}]); // Состояние для хранения найденных пользователей


  const handleSearch = async (event) => {
    event.preventDefault(); // Предотвращаем стандартную перезагрузку страницы после отправки формы

    try {
      const response = getContacts({
        name,
        email
      });
      setFoundUsers((await response).data);
      console.log((await response).data); // Логируем полученный ответ от сервера
    } catch (error) {
      console.error('Ошибка при поиске пользователей:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSearch}> {/* Вешаем обработчик события submit на форму */}
      <label htmlFor="name">Имя:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="email">Возраст:</label>
      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />


      <button type="submit">Поиск</button>
    </form>
    </div>
  );
};

export default SearchUsersForm;