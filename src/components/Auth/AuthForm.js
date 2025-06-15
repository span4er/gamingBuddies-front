import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../api/AuthService.js';
import { toastError } from '../../api/ToastService';
import { ToastContainer } from 'react-toastify';
import { toastSuccess } from '../../api/ToastService.js';
import TopAppBar from '../topAppBar/TopAppBar';
import './AuthForm.css'


const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [user, setValues] = useState({
    username: '',
    password: '',
  });

  const [hasToken, setHasToken] = useState(false); // Новое состояние для отслеживания наличия токена

  const navigate = useNavigate();
  // Проверяем наличие токена при монтировании компонента
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    setHasToken(storedToken !== null && storedToken.length > 0);
  }, []);

  // Выход из системы путем удаления токена
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    // toastSuccess("Вы успешно вышли!");
    window.location.reload(); // Для обновления состояния компонента
  };


  // Функция отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      let response;
      
      if (isLoginMode) {
        const { data } = await login(user);
        
        const token = data.token;
        const username = data.username;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userName', username); 
    
        // window.location.reload();
        toastSuccess("Вы успешно вошли!");
        navigate('/home');
      } else {
        const{ data } = await signup(user);
        
        if (!data.ok) toastError('Ошибка регистрации');
        
        const token = data.token;
        const username = data.username;
        
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userName', username); 
        toastSuccess("Регистрация прошла успешно!");
        navigate('/home');
      }
    } catch (err) {
      console.error(err.message);
      toastError(err.message);
    }
  };

  const onChange = (event) => {
    setValues({ ...user, [event.target.name]: event.target.value });
  };

  const appBarConfig = {
    showBackButton: false,
    title: isLoginMode ? ("Авторизация") : ("Регистрация"),
    eventActions: false
};
  
  const mainAuth = hasToken ? (
    <div className="auth-form">
      <h2>Вы уже авторизованы!</h2>
      <button onClick={logout}>Выйти</button>
    </div>
    ) : (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Логин"
          value={user.username}
          onChange={onChange}
          required
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={user.password}
          onChange={onChange}
          required
        />
        <br/>
        <button type="submit">{isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      <p>
        {isLoginMode ?
          "Нет аккаунта? Создать аккаунт."
        :
          "Уже зарегистрированы? Войти."
        }
        {" "}
        <span style={{ cursor: 'pointer', color: '#3f51b5' }} onClick={() => setIsLoginMode(!isLoginMode)}>
          Перейти
        </span>
      </p>
      <ToastContainer />
    </div>
  );
  return (
  <div style={{ justifyItems: 'center' }}>
    <TopAppBar config={appBarConfig} />
      {mainAuth}
  </div>
  )
};

export default AuthForm;