import React, { useState, useEffect } from 'react';
import './Notifications.css'; // Подключаем стили
import notificationsSvg from '../../../resources/topAppBar/notifications0.svg'
import {searchNotifications, readNotification} from '../../../api/NotificationsService'
import { toastError, toastSuccess } from '../../../api/ToastService';


// Элемент одного уведомления
const NotificationItem = ({ notification, markAsRead }) => {
  const isRead = notification.isNotificationRead;

  return(
  <div className={`notification-item ${isRead ? 'read' : 'unread'}`}
        onClick={() => !isRead && markAsRead(notification.notificationId)}>
      {notification.notificationDescription}  
  </div>
  );
};

// Главный компонент уведомлений
const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false); // Флаг отображения панели
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница

  const [notificationsSearchParams, setNotificationsSearchParams] = useState({
    gameid: '',
    createuserid: ''
});

const [data, setData] = useState({});

  // Загрузка уведомлений с сервера
  useEffect(() => {
    fetchNotifications()
  }, []);

  const fetchNotifications = async (page = 0, size = 5) => {
    try {
        setCurrentPage(page);
        const { data } = await searchNotifications(notificationsSearchParams,page,size);
        setData(data);
        console.log(data);
    } catch (error) {
        console.log(error);
        toastError(error.message);
    }
  };

  const markAsRead = id => {
    try {
      const {isSuccess} = readNotification(id);
      if (isSuccess)
      setData((data) =>
        data.map(n => ({
          ...n,
          isNotificationRead: n.notificationId === id ? true : n.isNotificationRead
        }))
      );
    }
    catch (error) {
      console.log(error);
      toastError(error.message);
  }
  };

  return (
    <>
      {/* Кнопка открытия уведомлений */}
      <button onClick={() => setIsOpen(!isOpen)} className={`bell-icon ${isOpen ? 'open' : ''}`}>
      {/* 🔔 */}
      <img class="notifications" src= {notificationsSvg} />
      </button>

      {isOpen && (
        <div className="notifications-panel">
          {data?.content?.length > 0 ? (
            <>
              {data.content.map((n, idx) => (
                <NotificationItem key={idx} notification={n} markAsRead={markAsRead}/>
              ))}
              <div className='pagination'>
                <a onClick={() => fetchNotifications(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => fetchNotifications(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => fetchNotifications(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>
            </>
          ) : (
            <p>Нет новых уведомлений.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Notifications;