import React from 'react';
import Contact from "../Contact"
import './home.css'
import logo from '../../resources/home//top-app-bar0.png'
import account from '../../resources/home/account-circle0.svg'
import notifications from '../../resources/home/notifications0.svg'
import settings from '../../resources/home/settings0.svg'

const Home = () => {
    return (

          <div class="top-app-bar" style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <div class="leading-trailing-icons">
              <div class="leading-icon">
                <div class="container">
                  <div class="state-layer">
                    <img class="account-circle" src= {account} />
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
    )
};

export default Home