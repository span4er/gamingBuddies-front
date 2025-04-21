import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Event from "./Event"
import { getEvents } from '../../api/EventService';
import { toastError, toastSuccess } from '../../api/ToastService';
import './EventList.css'
import TopAppBar from '../topAppBar/TopAppBar';

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
        <div>
            <TopAppBar config={appBarConfig} />
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

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