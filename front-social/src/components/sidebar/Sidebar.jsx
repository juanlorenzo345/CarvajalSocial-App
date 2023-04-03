import "./sidebar.css"  
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseFriend from "../closeFriend/CloseFriend";
import {Users} from "../../dummyData"

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                <RssFeedIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Feed</span>
                </li>
                <li className="sidebarListItem">
                <ChatBubbleIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Chats</span>
                </li>
                <li className="sidebarListItem">
                <GroupsIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Grupos</span>
                </li>
                <li className="sidebarListItem">
                <PlayCircleIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Videos</span>
                </li>
                <li className="sidebarListItem">
                <EventIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Eventos</span>
                </li>
                <li className="sidebarListItem">
                <HelpIcon className="sidebarIcon"/>
                <span className="sidebarListItemText">Preguntas Frecuentes</span>
                </li>
            </ul>
            <button className="sidebarButton">Show More</button>
            <hr className="sidebarHr" />
            <ul className="sidebarFrienList">
                {Users.map(u=>(
                    <CloseFriend key={u.id} user = {u}  />
                ))}
                
            </ul>
        </div>
    </div>
  )
}
