import React, { useState } from 'react';
import style from './Profile.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
// import Sidebar from '../../Sidebar/Sidebar';
import sidebarStudents from '../../../data/sidebarStudents.json';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        {/* Header */}
        <Header />
      </div>

      <div className={style.sidebar}>
        {/* Sidebar */}
        {/* <Sidebar setSelectedSemester={setSelectedSemester} /> */}
        {/* <Sidebar items={sidebarStudents} /> */}
        <Sidebar currentPath={location.pathname} />
      </div>

      <div className={style.main}>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
        <h1>Helooo</h1>
      </div>
    </div>
  );
}

export default Profile;