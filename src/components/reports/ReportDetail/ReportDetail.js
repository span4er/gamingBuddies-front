import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../api/ToastService';
import { getReport } from '../../../api/ReportService';
import './ReportDetail.css'
import TopAppBar from '../../topAppBar/TopAppBar';
import {formatCreateDateFromTimestamp, formatDateShortView} from '../../../utils/DateUtils.js'
// import UserInEvent from '../userInEvent/UserInEvent';

const ReportDetail = ({ }) => {
    const navigate = useNavigate();

    const [report, setReport] = useState({
        createDttm: '',
        createdUserName: '',
        reportedUserPicName: '',
        reportStatusName: '',
        reportDescription: '',
        reportedUserName: '',
        createdUserPicName: '',
        reportReasonName: ''
    });

    const { id } = useParams();

    const fetchEvent = async (id) => {
        try {
            const { data } = await getReport(id);
            setReport(data);
            console.log(data);
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const appBarConfig = {
        showBackButton: true,
        backLabel: "Назад",
        showReportActionButton: true
    };

    useEffect(() => {
        fetchEvent(id);
    }, []);
    return (
        <div>
        <TopAppBar config={appBarConfig} />
        <div class="main-info-event">
            <div class="first-event-group">
                <div class="reported-name">{report.reportedUserName}</div>
                <img class="reported-icon" src={report.reportedUserPicName} />
                <div class="remain-time" onClick={() => navigate(`/users/${report.reportedUserName}`)} >Перейти в профиль</div>
                <div class="report-reason">{ report.reportReasonName }</div>
            </div>
            <div class="second-event-group">
                <div class="report-published-date">Опубликовано: {formatCreateDateFromTimestamp(report.createDttm)}</div>
                <div class="report-creator" onClick={() => navigate(`/users/${report.createdUserName}`)} >Создатель {report.createdUserName}</div>
                <div class="supporting-text">
                <div dangerouslySetInnerHTML={{ __html: report.reportDescription }}></div>
                </div>            
            </div>
        </div>      
        <div class="simple-card-grid">
            <div class="title-header">
            <div class="title">Последние события, где пользователь принимал участие</div>
            </div>
        </div>
        {/* <ul className='event-list'>
            {event?.usersInSession?.length > 0 && event.usersInSession.map(userInEvent =>  <UserInEvent userInEvent={userInEvent} key={userInEvent.object_id} />)}
        </ul> */}
    </div>
    )
}

export default ReportDetail;