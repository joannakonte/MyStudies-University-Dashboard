import { useNavigate } from 'react-router-dom';
import SidebarItem from "./SidebarItem"
import items from "../../data/sidebarStudents.json"
import {  HiHome, HiQuestionMarkCircle, HiArrowRightOnRectangle    } from "react-icons/hi2";
export default function Sidebar() {
  const navigate = useNavigate();

  // const getPath = (item) => {
  //   if (item.childrens) {
  //     // Return the path of the first child (assuming children share the same path)
  //     return getPath(item.childrens[0]);
  //   } else {
  //     return item.path || "#";
  //   }
  // };

  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          isActive={item.path === window.location.pathname}
          isChildActive={item.childrens ? item.childrens.some(child => child.path === window.location.pathname) : false}
        />
      ))}

      <div className="rest">
        <button><HiHome/> Αρχική</button>
        <button onClick={() => navigate('/home/faq')}><HiQuestionMarkCircle />Συχνές Ερωτήσεις</button>
        <button><HiArrowRightOnRectangle />Αποσύνδεση</button>
      </div>
    </div>
  );
}
