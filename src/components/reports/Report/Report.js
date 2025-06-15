import React from 'react'
import { Link } from 'react-router-dom'
import './Report.css'
import rightArrow from '../../../resources/events/rightArrow.svg'
import {formatDateShortView} from '../../../utils/DateUtils.js'

const stripHtmlTags = text => text.replace(/<\/?[^>]+(>|$)/g, '');

const PrepareEventDescription = sessiondescription => {
  // Удаляем HTML-теги
  const cleanedText = stripHtmlTags(sessiondescription);
  
  // Обрезаем строку до 100 символов и добавляем многоточие, если было обрезано
  if(cleanedText.length > 150){
      return `${cleanedText.slice(0, 150)}...`;
  }
  return cleanedText;
};

const Report = ({ report }) => {
  return (
    <Link to={`/reports/${report.reportId}`} className="event-item">
        <div class="upper-event-group">
            <img class="event-icon" src={report.reportedUserPicName} />
            <div class="upper-right-event-group">
              <div class="event-right-group-headline">
                <div class="event-name">{report.reportedUserName}</div>
                <div class="event-creator-group">
                  <div class="creator-login">{report.createdUserName}</div>
                  {/* <div class="trailing-element"> */}
                    <img class="creator-icon" src={report.createdUserPicName} />
                  {/* </div> */}
                  <div class="trailing-element">
                    <img class="arrow-forward" src={rightArrow}/>
                  </div>           
                </div>
              </div>
              <div class="event-text">
                    {PrepareEventDescription(report.reportDescription)}
              </div>       
            </div>
        </div>
        {/* <div class="middle-event-group">
            <img class="event-icon" src={event.mainPicName} />
            
        </div> */}
          <div class="down-event-group">
            <div class="event-down-rectangle">
              {report.reportReasonName}
            </div>
            <div class="event-down-rectangle">
              {report.reportStatusName}
            </div>
            <div class="event-down-rectangle">
              {formatDateShortView(report.createDttm)}
            </div>
          </div>
        </Link>
  )
}

export default Report