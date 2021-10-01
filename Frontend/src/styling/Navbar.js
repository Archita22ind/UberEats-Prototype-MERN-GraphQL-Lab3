import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { reduxConstants } from '../constants/reduxConstants';
import * as Cookies from "js-cookie";
import {alertActions} from '../actions/alertActions';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch(); 
  const createOverLayeffect = () => {

    if (sidebar){
      return <div className= 'overlay-sidebar' onClick={e => setSidebar(!sidebar)}> </div>
    }else {
      <div></div>
    }

  }

  const onClickHandler = (event) => {
    dispatch({ type: reduxConstants.LOGOUT });
    dispatch(alertActions.clear());
    Cookies.remove("session");
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars style={{verticalAlign: 'top', color: 'black'}} onClick={showSidebar} />
          </Link>
        </div>
        {createOverLayeffect()}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#'> 
                <AiIcons.AiOutlineClose style={{color: 'black'}}/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className='link' >
                    {item.icon}
                    <span onClick={onClickHandler}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;