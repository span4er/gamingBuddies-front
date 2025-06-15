import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import User from "../user/User"
import './home.css'
import logo from '../../resources/home//top-app-bar0.png'
import account from '../../resources/home/account-circle0.svg'
import notifications from '../../resources/home/notifications0.svg'
import settings from '../../resources/home/settings0.svg'
import rightArrow from '../../resources/home/rightArrow.svg'
import TopAppBar from '../topAppBar/TopAppBar';
import '../../index.css';

const Home = () => {

  const appBarConfig = {
    showUserName: true
  };

  const navigate = useNavigate();
    return (
          <div>
          <TopAppBar config={appBarConfig} />
          <div class="top-app-bar-home" style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <div class="leading-trailing-icons">
              <div class="leading-icon">
                <div class="container">
                  <div class="state-layer">
                    <img onClick={() => navigate(`/auth`)} class="account-circle" src= {account} />
                  </div>
                </div>
              </div>
              <div class="trailing-icon">
                <div class="trailing-icon-1">
                  <div class="container">
                    <div class="state-layer">
                      <img class="notifications" src= {notifications} />
                    </div>
                  </div>
                </div>
                <div class="trailing-icon-2">
                  <div class="container">
                    <div class="state-layer">
                      <img class="settings" src= {settings} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="headline">
              <div class="headline2">Span4er</div>
            </div>           
          </div>
          <div class="section-01">
          <div class="title-header">
            <div class="title">Актуально сейчас</div>
            <div class="icon-button">
              <div class="container">
                <div class="state-layer">
                  <img class="icon" src={rightArrow} />
                </div>
              </div>
            </div>
          </div>
          <div class="carousel">
            <div class="item-02">
              <div
                class="avatar"
              >
                <div
                  class="contact__image"
                >
                  <img class="fortnite-1" src={logo} />
                </div>
              </div>
              <div class="label">Fortnite</div>
            </div>
          </div>
          <div class="title-header">
            <div class="title">Мои избранные тайтлы</div>
            <div class="icon-button">
              <div class="container">
                <div class="state-layer">
                  <img class="icon" src={rightArrow} />
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
    )
};

export default Home