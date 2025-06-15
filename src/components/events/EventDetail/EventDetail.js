import React, { useState, useEffect, useRef } from 'react';

import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../api/ToastService';
import { getEvent } from '../../../api/EventService';
import './EventDetail.css'
import TopAppBar from '../../topAppBar/TopAppBar';
import {formatCreateDateFromTimestamp, formatDateShortView} from '../../../utils/DateUtils.js'
import UserInEvent from '../userInEvent/UserInEvent';

const EventDetail = ({ }) => {
    const [event, setEvent] = useState({
        gamesessionid: '',
        game: '',
        platformid: '',
        createuserid: '',
        createdttm: '',
        startdttm: '',
        enddttm: '',
        sessionstatusid: '',
        capacitynum: '',
        sessiondescription: ''
    });

    const { id } = useParams();

    const fetchEvent = async (id) => {
        try {
            const { data } = await getEvent(id);
            setEvent(data);
            console.log(data);
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const appBarConfig = {
        showBackButton: true,
        backLabel: "Назад",
        eventActions: true
    };

    useEffect(() => {
        fetchEvent(id);
    }, []);
    return (
        <div>
        <TopAppBar config={appBarConfig} />
        <div class="main-info-event">
            <div class="first-event-group">
                <img class="game-icon" src={event.game.mainpicname} />
                <div class="event-dttm-block">
                    <div class="start-dttm">{ formatDateShortView(event.startdttm) }</div>
                    <div class="end-dttm">{ formatDateShortView(event.enddttm) }</div>
                </div>
                <div class="remain-time">Осталось: 04:00</div>
                
            </div>
            <div class="second-event-group">
                <div class="event-name-text">{event.name}</div>
                <div class="event-published-date">Опубликовано: {formatCreateDateFromTimestamp(event.createdttm)}</div>
                <div class="supporting-text">
                <div dangerouslySetInnerHTML={{ __html: event.sessiondescription }}></div>
                </div>            
                <div class="button">
                    <div class="state-layer3">
                    <div class="label-text">Принять участие</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="platform-item">Платформа:
            <div class="platform-chip">
                PC
            </div>
        </div>        
        <div class="simple-card-grid">
            <div class="title-header">
            <div class="title">Участники {event?.usersInSession?.length}/{event.capacitynum}</div>
            </div>
        </div>
        <ul className='event-list'>
            {event?.usersInSession?.length > 0 && event.usersInSession.map(userInEvent =>  <UserInEvent userInEvent={userInEvent} key={userInEvent.object_id} />)}
        </ul>
    </div>
    )
}

export default EventDetail;