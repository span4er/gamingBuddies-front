import React from 'react';
import { useState,useEffect  } from 'react';
import rightArrow from '../../resources/topAppBar/leftArrow.svg'
import { useNavigate } from 'react-router-dom';
import './TopAppBar.css'
import Notifications from "./Notifications/Notifications"
import account from '../../resources/home/account-circle0.svg'

const DEFAULT_CONFIG = {
    showBackButton: false,
    backLabel: "",
    title: "",
    eventActions: false,
    showReportActionButton: false,
    showUserName: false
};

const TopAppBar = ({ config }) => {
    const mergedConfig = {...DEFAULT_CONFIG, ...config}; // Объединяем дефолтные настройки с пользовательскими настройками

    const [hasToken, setHasToken] = useState(false); // Новое состояние для отслеживания наличия токена

    // Проверяем наличие токена при монтировании компонента
    useEffect(() => {
      const storedToken = localStorage.getItem('jwtToken');
      setHasToken(storedToken !== null && storedToken.length > 0);
    }, []);
    

    const navigate = useNavigate();

    const handleBackClick = () => {
        window.history.back(); // Возвращаемся на предыдущий экран
    };

    const username = localStorage.getItem('userName');

    return (
        <div className="top-app-bar">
            {
                <div class="leading-icon">
                    <div class="container">
                        <div class="state-layer">
                            <img onClick={() => navigate(`/auth`)} class="account-circle" src= {account} />
                        </div>
                    </div>
                </div>
            }
            {mergedConfig.showUserName && (
                <>
                    <div className="top-app-bar-username" onClick={() => navigate(`/users/${username}`)}>
                        {username}
                    </div>
                </>
            )}
            {mergedConfig.showBackButton && (
                <>
                    <div className="back-icon">
                        <img className="icon5" alt="Назад" onClick={handleBackClick} src={rightArrow} /> {/* Укажите путь к вашей иконке */}
                    </div>
                    <div className="back-line" onClick={handleBackClick}>{mergedConfig.backLabel}</div>
                </>
            )}
            {mergedConfig.title && (
                <>
                    <div className="top-app-bar-headline">
                        {mergedConfig.title}
                    </div>
                </>
            )}
            {mergedConfig.eventActions && (
                <>
                    <div class="event-actions">
                        Действия с событием
                    </div>
                </>
            )}
            {mergedConfig.showReportActionButton &&(
                <>
                    <div class="report-actions">
                        Действия с жалобой
                    </div>
                </>
            )}
            {hasToken && <Notifications />
            }
        </div>
    );
};
export default TopAppBar;