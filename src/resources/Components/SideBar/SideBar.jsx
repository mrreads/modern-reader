import React from 'react';
import { NavLink  } from "react-router-dom";

class SideBar extends React.Component
{
    render()
    {
        return (
            
            <div id="sideBar">
                <NavLink  to="/shelf/books" className="books">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book" width="44" height="44"
                        viewBox="0 0 24 24" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <line x1="3" y1="6" x2="3" y2="19" />
                        <line x1="12" y1="6" x2="12" y2="19" />
                        <line x1="21" y1="6" x2="21" y2="19" />
                    </svg>
                </NavLink>
        
                <NavLink  to="/shelf/notes" className="notes">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-notes" width="44" height="44"
                        viewBox="0 0 24 24" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="5" y="3" width="14" height="18" rx="2" />
                        <line x1="9" y1="7" x2="15" y2="7" />
                        <line x1="9" y1="11" x2="15" y2="11" />
                        <line x1="9" y1="15" x2="13" y2="15" />
                    </svg>
                </NavLink>
        
                <NavLink  to="/shelf/settings" className="setting">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments" width="44"
                        height="44" viewBox="0 0 24 24" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="6" cy="10" r="2" />
                        <line x1="6" y1="4" x2="6" y2="8" />
                        <line x1="6" y1="12" x2="6" y2="20" />
                        <circle cx="12" cy="16" r="2" />
                        <line x1="12" y1="4" x2="12" y2="14" />
                        <line x1="12" y1="18" x2="12" y2="20" />
                        <circle cx="18" cy="7" r="2" />
                        <line x1="18" y1="4" x2="18" y2="5" />
                        <line x1="18" y1="9" x2="18" y2="20" />
                    </svg>
                </NavLink>
            </div>)
    }
}

export default SideBar;