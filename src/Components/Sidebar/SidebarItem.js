import { useState } from "react";
import { HiUserCircle, HiBookOpen, HiDocumentText, HiMiniDocumentChartBar, HiClipboardDocumentList, HiChevronDown, HiChevronUp   } from "react-icons/hi2";
import './Sidebar.css';
const iconMap = {
    HiOutlineUserCircle: <HiUserCircle  />,
    HiBookOpen: <HiBookOpen  />,
    HiDocumentText: <HiDocumentText  />,
    HiMiniDocumentChartBar: <HiMiniDocumentChartBar  />,
    HiClipboardDocumentList: <HiClipboardDocumentList  />,
  };


export default function SidebarItem({ item, onClick, isActive, isChildActive }) {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(!open);
    onClick && onClick();
  };

  const itemClass = open
    ? "sidebar-item open" + ((isActive || isChildActive) ? " clicked" : "")
    : "sidebar-item" + ((isActive || isChildActive) ? " clicked" : "");

  if (item.childrens) {
    return (
      <div className={itemClass}>
        <div className="sidebar-title">
          <span>
            {iconMap[item.icon]}
            {item.title}
          </span>
          <i className="toggle-btn" onClick={handleItemClick}>
            {open ? <HiChevronUp /> : <HiChevronDown />}
          </i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              onClick={onClick}
              isActive={isActive}
              isChildActive={isChildActive}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={item.path || "#"}
        className={`sidebar-item plain${(isActive || isChildActive) ? " clicked" : ""}`}
        onClick={handleItemClick}
      >
        {iconMap[item.icon]}
        {item.title}
      </a>
    );
  }
}
