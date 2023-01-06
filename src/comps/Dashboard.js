import React from 'react';
import MatchManager from './MatchManager';





function dashboard(props) {
    //nuova partita 
    //modifica squadra 

    const nuovaPartita = (e) => {
        document.getElementById("main").classList.add("hidden")
        document.getElementById("matchStarter").classList.remove("hidden")
    };

    const modificaSquadra = () => {
        props.setToast("funzione non ancora disponibile")
        props.showToast()
    };

    return (
        <div className="w-full h-screen">
            <div id="main" className='w-full h-full px-16 py-32 text-center'>
                <button onClick={(e) => {nuovaPartita(e);}} type="button" className="rounded-lg w-full h-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Nuova partita</button>
                <button onClick={() => {modificaSquadra()}} type="button" className="rounded-lg mt-16 w-full h-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Modifica squadra</button>
            </div>
            <div id="matchStarter" className='w-full h-full hidden'>
                <MatchManager></MatchManager>
            </div>
        </div>
    );
}

export default dashboard;


