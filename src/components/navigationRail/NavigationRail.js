import React from 'react';
import './navigationRail.css'
import homeIcon from '../../resources/navigationRail/homeIcon.svg'
import friendsIcon from '../../resources/navigationRail/friendsIcon.svg'
import eventsIcon from '../../resources/navigationRail/eventsIcon.svg'
import libraryIcon from '../../resources/navigationRail/libraryIcon.svg'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {isAdmin} from '../../utils/JwtDecoder'


const NavigationRail = () => {
    const location = useLocation();
    const token = localStorage.getItem("jwtToken");
    var isMod = false;
    if(token) isMod = isAdmin(token);
   
    
    return (
        <Navbar bg="light" expand="lg" className='navigation-rail'>
        <Container className='destinations'>
            <Nav.Link href="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                <img alt="Home Icon" src={homeIcon}/> Домой
            </Nav.Link>
            <Nav.Link href="/users" className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`}>
                <img alt="Friends Icon" src={friendsIcon}/> Друзья
            </Nav.Link>
            <Nav.Link href="/events" className={`nav-item ${location.pathname.includes('/events') ? 'active' : ''}`}>
                <img alt="Events Icon" src={eventsIcon}/> События
            </Nav.Link>
            <Nav.Link href="/library" className={`nav-item ${location.pathname.includes('/library') ? 'active' : ''}`}>
                <img alt="Library Icon" src={libraryIcon}/> Библиотека
            </Nav.Link>
            {isMod &&
                <Nav.Link href="/reports" className={`nav-item ${location.pathname.includes('/reports') ? 'active' : ''}`}>
                    <img alt="Library Icon" src={libraryIcon}/> Жалобы
                </Nav.Link>
            }
        </Container>
    </Navbar>
    )
}

export default NavigationRail