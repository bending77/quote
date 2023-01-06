import React from 'react';
import { useState } from "react";
import InputText from './InputText';




function TeamEditor(props) {
    
    const delPlayer = (e) => {
        props.delPlayer(e.currentTarget.id)
    };

    
    const editPlayer = (caller) => {
        props.editPlayer(caller)
    };

    var counter = -1
    var lista;
    if (typeof props.lista === 'undefined'){
    }else{
        lista = (props.lista).map((player =>{
            counter = counter + 1;
                return (
                    <div key={counter} className='bg-blue-200 mt-2  rounded-lg bg-opacity-60 w-full h-30 px-16 py-2 relative'>
                        <div className='absolute top-0 right-0' onClick={delPlayer} id={"close%"+counter}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        </div>
                        <InputText id={"nomeGiocatore%"+counter} label="Nome del giocatore" setValue={player.nome} changer={editPlayer}></InputText>
                        <InputText id={"numeroGiocatore%"+counter} label="Numero del giocatore" setValue={player.numero} changer={editPlayer}></InputText>
                    </div>
                )
        }));
    }


    const addPlayer = () => {
        var name = document.getElementById("nomeGiocatore").value
        var number = document.getElementById("numeroGiocatore").value
        if(name === "" || number === ""){
            props.setToast("inserisci nome e numero per aggiungrere il giocatore")
            props.showToast();
        }else{
            props.addPlayer(name,number);
            document.getElementById("nomeGiocatore").value = ""
            document.getElementById("numeroGiocatore").value = ""
        }
    };

    const emptyTrigger = () => {
    
    };


    return (
        <div className="w-full h-full text-center">
            <div className='bg-white rounded-lg bg-opacity-60 w-full h-30 px-16 py-2'>
                <InputText id="nomeGiocatore" label="Nome del giocatore" setValue={null} changer={emptyTrigger}></InputText>
                <InputText id="numeroGiocatore" label="Numero del giocatore" setValue={null} changer={emptyTrigger}></InputText>
                <button onClick={(e) => {addPlayer()}} type="button" className=" mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Aggiungi giocatore</button>
            </div>
            {lista}
        </div>
    );
}

export default TeamEditor;


