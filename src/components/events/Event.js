import React from 'react'
import { Link } from 'react-router-dom'
import './Event.css'
import rightArrow from '../../resources/events/rightArrow.svg'

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
    <Link to={`/events/${event.gamesessionid}`} className="event-item">
        <div class="upper-event-group">
            <div class="content2">
              <div class="event-name">{event.name}</div>         
            </div>
            <div class="creator-avatar">{event.createuserid}</div>
            <div class="trailing-element">
              <img class="arrow-forward" src={rightArrow}/>
            </div>
        </div>
        <div class="event-text">
                {PrepareEventDescription(event.sessiondescription)}
        </div>
          {/* <div class="div2">
            <div class="avatar-group">
              <div class="avatar">
                <img class="shape" src="shape0.png" />
              </div>
              <div class="avatar">
                <img class="shape" src="shape1.png" />
              </div>
              <div class="avatar">
                <img class="shape" src="shape2.png" />
              </div>
              <div class="overflow">
                <div class="initials">+1</div>
              </div>
            </div>
          </div> */}
          <div class="div3">
            <div class="rectangle-1"></div>
            <div class="supporting-text2">Основной язык: RUS</div>
          </div>
          <div class="div4">
            <div class="rectangle-12"></div>
            <div class="supporting-text3">Соревновательный</div>
          </div>
          <div class="div4">
            <div class="rectangle-13"></div>
            <div class="supporting-text4">Активное</div>
          </div>
          <div class="div4">
            <div class="rectangle-14"></div>
            <div class="supporting-text5">15.12.2024 05:00</div>
          </div>
          <div class="div5">
            <div class="rectangle-15"></div>
            <div class="_4-5">4/5</div>
          </div>
        </Link>
  )
}

export default Event