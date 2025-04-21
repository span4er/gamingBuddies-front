import React, { useState, useEffect, useRef } from 'react';

import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../api/ToastService';
import { getEvent } from '../../api/EventService';
import leftArrow from '../../resources/events/leftArrow.svg'
import './EventDetail.css'
import TopAppBar from '../topAppBar/TopAppBar';
import dotaPng from '../../resources/events/dota.png'
import {formatCreateDateFromTimestamp, formatDateShortView} from '../../utils/DateUtils.js'

const EventDetail = ({ }) => {
    const [event, setEvent] = useState({
        gamesessionid: '',
        gameid: '',
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
            //toastSuccess('Contact retrieved');
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
                <img class="game-icon" src={dotaPng} />
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
                {/* <img class="image2" src="image1.png" /> */}
            </div>
            <div class="span-4-er">span4er</div>
        </div>
        <div class="simple-card-grid">
            <div class="title-header">
            <div class="title">Участники 3/5</div>
            <div class="icon-button">
                <div class="container2">
                <div class="state-layer2">
                    <div class="icon6"></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="div3">Платформа:</div>
        <div class="chip-03">
            <div class="state-layer4">
            <div class="label-text2">PC</div>
            </div>
        </div>
    </div>
    )
}

export default EventDetail;