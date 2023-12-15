import { useState } from "react";
import { HiUserCircle, HiBookOpen, HiDocumentText, HiMiniDocumentChartBar, HiClipboardDocumentList, HiChevronDown, HiChevronUp   } from "react-icons/hi2";
import './Sidebar.css';
const iconMap = {
    HiOutlineUserCircle: <HiUserCircle  />,
    HiBookOpen: <HiBookOpen  />,
    HiDocumentText: <HiDocumentText  />,
    HiMiniDocumentChartBar: <HiMiniDocumentChartBar  />,
    HiClipboardDocumentList: <HiClipboardDocumentList  />,
    // Add more icons as needed
  };
  
export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(false);
    // const [pressed, setOpen] = useState(false);
  
    if (item.childrens) {
      return (
        <div className={open ? "sidebar-item open" : "sidebar-item"}>
          <div className="sidebar-title">
            <span>
              {iconMap[item.icon]} {/* Use the icon directly */}
              {item.title}
            </span>
            <i
            className="toggle-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiChevronUp /> : <HiChevronDown />} {/* Adjusted this line */}
          </i>
          </div>
          <div className="sidebar-content">
            {item.childrens.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <a href={item.path || "#"} className="sidebar-item plain">
          {iconMap[item.icon]} {/* Use the icon directly */}
          {item.title}
        </a>
      );
    }
  }
  