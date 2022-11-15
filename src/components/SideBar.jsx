import SidebarItem from "./SidebarItem"
import items from "../sidebar"
import "../styles/sidebar.css";


export default function Sidebar(){
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
    )
}