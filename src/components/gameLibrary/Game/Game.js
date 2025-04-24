import React from 'react'
import { Link } from 'react-router-dom'
import './Game.css'

const Game = ({ game }) => {
  return (
    <Link to={`/library/game/${game.gameid}`} className="card-grid">
        <div class="card-01">
                <img class="image" src={game.mainpicname}/>
            <div class="content2">
                <div class="title">{game.name}</div>
                <div class="date">Добавлено {game.publisheddate}</div>
            </div>
        </div>
    </Link>
  )
}

export default Game