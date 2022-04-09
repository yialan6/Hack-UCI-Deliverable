import React from "react";
import SignUpForm from "../Form/SignUpForm.js"
import Peter from "../Peter/Peter.js"
import "./Main.css";

function Main () {
    return (
        <div className='page'>
            <SignUpForm/>
            <Peter/>
        </div>
    );
}

export default Main;