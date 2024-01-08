import React from 'react';
import { Link } from 'react-router-dom';
import breadcrumbList from '../../../data/breadcrumbList.json';

const Breadcrumb = ({ currentPath }) => {
  const findPageByPath = (path, items) => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.childrens) {
        const childMatch = findPageByPath(path, item.childrens);
        if (childMatch) {
          return childMatch;
        }
      }
    }
    return null;
  };

  const generateBreadcrumbTrail = (page) => {
    if (!page || !Array.isArray(page.breadcrumb)) {
      return null;
    }

    const trail = [...page.breadcrumb];

    return trail;
  };

  const currentPage = findPageByPath(currentPath, breadcrumbList);
  const breadcrumbTrail = generateBreadcrumbTrail(currentPage);

  return (
    <div>
      {breadcrumbTrail &&
        breadcrumbTrail.map((crumb, index) => (
          <span key={index}>
            <Link to={crumb.path}>{crumb.title}</Link>
            {index < breadcrumbTrail.length - 1 && ' / '}
          </span>
        ))}
    </div>
  );
};

export default Breadcrumb;



// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import data from '../../../data/sidebarStudents.json';
// import "./Breadcrumb.module.css"

// const Breadcrumb = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   let url = '';
//   const breadcrumbLinks = pathnames.map((segment, index) => {
//     url += `/${segment}`;
//     const breadcrumbItem = data.find((item) => item.path === url);

//     return (
//       <span key={index}>
//         <Link to={url} className="breadcrumb-link">
//           {breadcrumbItem?.title || segment}
//         </Link>
//         {index < pathnames.length - 1 && <span className="breadcrumb-separator"> / </span>}
//       </span>
//     );
//   });

//   return <div className="breadcrumb-container">{breadcrumbLinks}</div>;
// };

// export default Breadcrumb;
