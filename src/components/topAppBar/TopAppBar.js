import React from 'react';
import rightArrow from '../../resources/topAppBar/leftArrow.svg'
import './TopAppBar.css'

const DEFAULT_CONFIG = {
    showBackButton: false,
    backLabel: "",
    title: "",
    eventActions: false
};

const TopAppBar = ({ config }) => {
    const mergedConfig = {...DEFAULT_CONFIG, ...config}; // Объединяем дефолтные настройки с пользовательскими настройками

    const handleBackClick = () => {
        window.history.back(); // Возвращаемся на предыдущий экран
    };

    return (
        <div className="top-app-bar">
            {mergedConfig.showBackButton && (
                <>
                    <div className="back-icon">
                        <img className="icon5" alt="Назад" onClick={handleBackClick} src={rightArrow} /> {/* Укажите путь к вашей иконке */}
                    </div>
                    <div className="back-line" onClick={handleBackClick}>{mergedConfig.backLabel}</div>
                </>
            )}
            <div className="top-app-bar-headline">
                {mergedConfig.title}
            </div>
            {mergedConfig.eventActions && (
                <>
                    <div class="event-actions">
                        Действия с событием
                    </div>
                </>
            )}
        </div>
    );
};
export default TopAppBar;