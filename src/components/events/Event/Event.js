import React from 'react'
import { Link } from 'react-router-dom'
import './Event.css'
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

const Event = ({ event }) => {
  return (
    <Link to={`/events/${event.gameSessionId}`} className="event-item">
        <div class="upper-event-group">
            <img class="event-icon" src={event.gamePicName} />
            <div class="upper-right-event-group">
              <div class="event-right-group-headline">
                <div class="event-name">{event.sessionName}</div>
                <div class="event-creator-group">
                  <div class="creator-login">{event.createUserLogin}</div>
                  {/* <div class="trailing-element"> */}
                    <img class="creator-icon" src={event.createUserPicName} />
                  {/* </div> */}
                  <div class="trailing-element">
                    <img class="arrow-forward" src={rightArrow}/>
                  </div>           
                </div>
              </div>
              <div class="event-text">
                    {PrepareEventDescription(event.sessionDescription)}
              </div>       
            </div>
        </div>
        {/* <div class="middle-event-group">
            <img class="event-icon" src={event.mainPicName} />
            
        </div> */}
          <div class="down-event-group">
            <div class="event-down-rectangle">
              Язык: {event.languageShort}
            </div>
            <div class="event-down-rectangle">
              {event.categoryName}
            </div>
            <div class="event-down-rectangle">
              {event.sessionStatusName}
            </div>
            <div class="event-down-rectangle">
              {formatDateShortView(event.startDttm)}
            </div>
            <div class="event-capacity">
              4/{event.capacityNum}
            </div>
          </div>
        </Link>
  )
}

export default Event