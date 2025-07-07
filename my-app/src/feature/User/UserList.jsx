import React from 'react';
import AllUsers from "./AllUsers"

//css
import "../../styles/Users.css";


export default function ListaUser(){
    return(
        
        <div className="user-list-container">
            <AllUsers />
        </div>
        
    )
}