import React from 'react';
import { useEffect, useRef, useState } from 'react';
import TopAppBar from '../../topAppBar/TopAppBar';
import Game from '../Game/Game'
import { searchGames } from '../../../api/GameService';
import { toastError, toastSuccess } from '../../../api/ToastService';
import './GameList.css'

function GameList(){

    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const [searchParams, setSearchParams] = useState({name: "",
        gameid: '',
        name: '',
        upvotescnt: '',
        downvotescnt: '',
        gamedescription: '',
        publisheddate: '',
        mainpicname: ''
    });

    const appBarConfig = {
        // showBackButton: true,
        // backLabel: "Назад",
        title: "Библиотека"
    };

    const getAllGames = async (page = 0, size = 10) => {
        try {
          setCurrentPage(page);
          const { data } = await searchGames(searchParams,page, size);
          setData(data);
          console.log(data);
        } catch (error) {
          console.log(error);
          toastError(error.message);
        }
      };

    useEffect(() => {
        getAllGames();
    }, []); 

    return (
        <div>
            <TopAppBar config={appBarConfig} />
            {data?.content?.length === 0 && <div>No Contacts. Please add a new contact</div>}

            <ul className='game-list'>
                {data?.content?.length > 0 && data.content.map(game => <Game game={game} key={game.gameid} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getAllGames(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllGames(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllGames(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </div>
    )
}

export default GameList