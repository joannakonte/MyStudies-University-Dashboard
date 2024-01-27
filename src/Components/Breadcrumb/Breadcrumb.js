import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import data from '../../data/allPages.json';
import "./Breadcrumb.css"

const Breadcrumb = ({userType}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  let url = '';
  const breadcrumbLinks = pathnames.map((segment, index) => {
    url += `/${segment}`;
    const breadcrumbItem = data.find((item) => item.path === url);

    const isCurrentPage = index === pathnames.length - 1;

    if (userType === "student") {
      return (
        <span key={index}>
          <Link to={url} className={`breadcrumb-link ${isCurrentPage ? 'current-page-student' : ''}`}>
            {breadcrumbItem?.title || segment}
          </Link>
          {index < pathnames.length - 1 && <span className="breadcrumb-separator"> / </span>}
        </span>
      );
    } else {
      return (
        <span key={index}>
          <Link to={url} className={`breadcrumb-link ${isCurrentPage ? 'current-page-professor' : ''}`}>
            {breadcrumbItem?.title || segment}
          </Link>
          {index < pathnames.length - 1 && <span className="breadcrumb-separator"> / </span>}
        </span>
      );
    }

  });

  return <div className="breadcrumb-container">{breadcrumbLinks}</div>;
};

export default Breadcrumb;