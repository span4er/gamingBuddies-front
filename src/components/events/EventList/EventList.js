import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Event from "../Event/Event"
import { getEvents } from '../../../api/EventService';
import { toastError, toastSuccess } from '../../../api/ToastService';
import './EventList.css'
import TopAppBar from '../../topAppBar/TopAppBar';
import settings from '../../../resources/Reports/settings.svg'

function EventList(){
const [data, setData] = useState({});
const [currentPage, setCurrentPage] = useState(0);

const [gameSessionSearchParams, setGameSessionSearchParams] = useState({
    gameid: '',
    createuserid: ''
});

const appBarConfig = {
    showBackButton: true,
    backLabel: "Назад",
    title: "Игровые события"
};

const getAllEvents = async (page = 0, size = 5) => {
    try {
      setCurrentPage(page);
      const { data } = await getEvents(gameSessionSearchParams,page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

    return (
        <div style={{ justifyItems: 'center' }}>
            <TopAppBar config={appBarConfig} />
            <div class="frame-5">
              <div class="frame-52">
                <div class="settings-container">
                  <img class="unselected-icon" src={settings} />
                </div>
                <div class="filter-chip">
                  <div class="state-layer2">
                    <div class="label-text">Фильтр</div>
                  </div>
                </div>
              </div>
            </div>
            {data?.content?.length === 0 && <div>Нет игровых событий. Пожалуйста, измените фильтры поиска</div>}

            <ul className='event-list'>
                {data?.content?.length > 0 && data.content.map(event => <Event event={event} key={event.gamesessionid} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages &&
            <div className='pagination'>
                <a onClick={() => getAllEvents(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllEvents(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllEvents(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </div>
    )

}
export default EventList