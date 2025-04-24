import React from 'react';
import './navigationRail.css'
import homeIcon from '../../resources/navigationRail/homeIcon.svg'
import friendsIcon from '../../resources/navigationRail/friendsIcon.svg'
import eventsIcon from '../../resources/navigationRail/eventsIcon.svg'
import libraryIcon from '../../resources/navigationRail/libraryIcon.svg'
import Button from "react-bootstrap/Button";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const NavigationRail = () => {
    const location = useLocation();

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
        </Container>
    </Navbar>
    )
}

export default NavigationRail