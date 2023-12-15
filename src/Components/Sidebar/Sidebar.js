import { useState } from "react";
import SidebarItem from "./SidebarItem"
import items from "../../data/sidebarStudents.json"
import {  HiHome, HiQuestionMarkCircle, HiArrowRightOnRectangle    } from "react-icons/hi2";


export default function Sidebar(){
  const [style, setStyle] = useState("light");
 
  const changeStyle = () => {
      console.log("you just clicked");
      if (style !== "light") setStyle("light");
      else setStyle("dark");
  };
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        
        <div className="rest">
          <button><HiHome/> Αρχική</button>
          <button><HiQuestionMarkCircle />Συχνές Ερωτήσεις</button>
          <button><HiArrowRightOnRectangle />Αποσύνδεση</button>
        </div>
        </div>

    )
}