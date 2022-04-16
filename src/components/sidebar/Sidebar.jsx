import React from 'react'
import "./Sidebar.css"
// import { LineStyle } from "@material-ui/core";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">DashBoard</h3>
          <ul className="sidebarList">
            <li className='sidebarListItem'>Home</li>
            <li className='sidebarListItem'>UserList</li>
            <li className='sidebarListItem'>Subscription</li>            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Music setting</h3>
          <ul className="sidebarList">
            <li className='sidebarListItem'>Upload music</li>
            <li className='sidebarListItem'>list of musics</li>
            <li className='sidebarListItem'>Subscription</li>            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Event</h3>
          <ul className="sidebarList">
            <li className='sidebarListItem'>List of events</li>
            <li className='sidebarListItem'>UserList</li>
            <li className='sidebarListItem'>Subscription</li>            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">DashBoard</h3>
          <ul className="sidebarList">
            <li className='sidebarListItem'>Home</li>
            <li className='sidebarListItem'>UserList</li>
            <li className='sidebarListItem'>Subscription</li>            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">DashBoard</h3>
          <ul className="sidebarList">
            <li className='sidebarListItem'>Home</li>
            <li className='sidebarListItem'>UserList</li>
            <li className='sidebarListItem'>Subscription</li>            
          </ul>
        </div>
      </div>
    </div>
  )
}
