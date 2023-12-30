import React from 'react';
import Breadcrumb from '../../../Breadcrumb/Breadcrumb';
import Sidebar from '../../../Sidebar/Sidebar';
import Header from '../../../Header/Header'

function GeneralStudent(){
    return(
        <div>
        <Header/>
        <Breadcrumb />
        <Sidebar />
        <h1>GeneralStudent</h1>
        </div>
    );
}

export default GeneralStudent;