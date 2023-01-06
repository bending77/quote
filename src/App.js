import React from 'react';
import GetCsv from "./comps/GetCsv";
import CreateTeam from "./comps/CreateTeam";
import Dashboard from './comps/Dashboard';
import { useState } from "react";
import './AppStyle.css';



function App() {

  const [squadra, setsquadra] = useState([]);

  const postFile = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");    
  };

  const creaSquadra = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("TeamCreator").classList.remove("hidden");        
  };

  const openDash = (squadra) => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("TeamCreator").classList.add("hidden");
    document.getElementById("Dashboard").classList.remove("hidden"); 
    setsquadra(squadra)
  };


  

  const showToast = () => {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  const setToast = (text) => {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
}







    return (
        <div id="mainCont" className="w-screen h-screen bg-gray-900 relative">
            <div id="GetCsv" className="w-screen h-5/6 flex items-center">
              <GetCsv creaSquadra={creaSquadra} postFile={postFile} setToast={setToast} showToast={showToast}></GetCsv>
            </div>   
            <div id="TeamCreator" className="w-screen h-full flex hidden">
              <CreateTeam  openDash={openDash} setToast={setToast} showToast={showToast} ></CreateTeam>
            </div>     
            <div id="Dashboard" className="w-screen h-full flex hidden">
              <Dashboard setToast={setToast} showToast={showToast} ></Dashboard>
            </div> 
            <div id="snackbar">
              testo toast
            </div>
          </div>
    );
}

export default App;


