import React, { useState, useEffect, useRef } from 'react';

import { Link, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../api/ToastService';
import { getGame } from '../../../api/GameService';
import './GameCard.css'
import TopAppBar from '../../topAppBar/TopAppBar';
import {formatCreateDateFromDate, formatDateShortView} from '../../../utils/DateUtils.js'
import upvoteHand from '../../../resources/gameLibrary/thumb-up.svg'
import downvoteHand from '../../../resources/gameLibrary/thumb-down.svg'

const GameCard = ({ }) => {
    const [game, setEvent] = useState({
        gameid:'',
        name: '',
        upvotescnt: '',
        downvotescnt: '',
        gamedescription: '',
        publisheddate: '',
        mainpicname: ''
    });

    const { id } = useParams();

    const fetchGame = async (id) => {
        try {
            const { data } = await getGame(id);
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
        backLabel: "Назад"
    };

    useEffect(() => {
        fetchGame(id);
    }, []);
    return (
        <div>
        <TopAppBar config={appBarConfig} />
        <div class="main-info-event">
            <div class="first-game-group">
                <img class="game-icon" src={game.mainpicname} />
                <div class="game-votes-block">
                    <div class="upvotes-block">{ game.upvotescnt }</div>
                    <div class="downvotes-block">{ game.downvotescnt } </div>
                </div>
                <div class="game-votes-block">
                <img class="thumb-up" src={upvoteHand}/>
                <img class="thumb-down" src={downvoteHand}/>
                </div>
                <div class="remain-time">Осталось: 04:00</div>
                
            </div>
            <div class="second-event-group">
                <div class="event-name-text">{game.name}</div>
                <div class="event-published-date">Опубликовано: {formatCreateDateFromDate(game.publisheddate)}</div>
                <div class="supporting-text">
                <div dangerouslySetInnerHTML={{ __html: game.gamedescription }}></div>
                </div>            
            </div>
        </div>       
    </div>
    )
}

export default GameCard;