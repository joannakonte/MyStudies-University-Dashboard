import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import data from '../../data/allPages.json';
import "./Breadcrumb.css"

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  let url = '';
  const breadcrumbLinks = pathnames.map((segment, index) => {
    url += `/${segment}`;
    const breadcrumbItem = data.find((item) => item.path === url);

    return (
      <span key={index}>
        <Link to={url} className="breadcrumb-link">
          {breadcrumbItem?.title || segment}
        </Link>
        {index < pathnames.length - 1 && <span className="breadcrumb-separator"> / </span>}
      </span>
    );
  });

  return <div className="breadcrumb-container">{breadcrumbLinks}</div>;
};

export default Breadcrumb;
