import React from 'react';
import { NavLink  } from "react-router-dom";

import { Book, Notes, Settings } from 'tabler-icons-react';

export default function(props)
{
    return(<div id="sideBar">
                <NavLink  to="/shelf/books" className="books">
                    <Book size={48} strokeWidth={1} color={'black'} />
                </NavLink>
        
                <NavLink  to="/shelf/notes" className="notes">
                    <Notes size={48} strokeWidth={1} color={'black'} />
                </NavLink>
        
                <NavLink  to="/shelf/settings" className="setting">
                    <Settings size={48} strokeWidth={1} color={'black'} />
                </NavLink>
            </div>)
}