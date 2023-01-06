import React from 'react';
import { useState } from "react";
import InputText from './InputText';
import TeamEditor from './TeamEditor';




function CreateTeam(props) {
    
    const [lista, setlista] = useState([]);


    const addPlayer = (name,number) => {
        var newList = lista.slice();
        newList.push({"nome":name, "numero" : number})
        setlista(newList);
        props.setToast("giocatore inserito")
        props.showToast()
    };


    const avanti = (name,number) => {
        var nomeSquadra = document.getElementById("nomeSquadra").value
        if(nomeSquadra !== "" && lista.length >0){
            props.openDash(lista)
        }else{
            props.setToast("inserisci un nome squadra e almeno un giocatore per creare una squadra");
            props.showToast();
        }
        
    };

    const delPlayer = (caller) => {
        var number = caller.split("%")[1]
        var newList = lista.slice();
        newList.splice(number,1)
        setlista(newList)
        props.setToast("giocatore eliminato")
        props.showToast()
    };

    
    const editPlayer = (caller) => {
        var field = caller.split("%")[0]
        var number = caller.split("%")[1]
        var newList = lista.slice();
        if(field === "nomeGiocatore"){
            newList[number].nome=document.getElementById(caller).value
        }else{
            newList[number].numero=document.getElementById(caller).value
        }
        setlista(newList)
    };
 
    const emptyTrigger = () => {
    
    };
   

    return (
        <div className="w-full h-screen text-center">
            <div className='px-64'>
                <InputText id="nomeSquadra" label="Nome della squadra" changer={emptyTrigger}></InputText>
            </div>
            <div className='px-8 mt-4 h-5/6 overflow-y-scroll'>
                <TeamEditor editPlayer={editPlayer} delPlayer={delPlayer} addPlayer={addPlayer} lista={lista} setToast={props.setToast} showToast={props.showToast}></TeamEditor>
            </div>
            <div>
            <button onClick={(e) => {avanti()}} type="button" className=" mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Avanti</button>
            </div>
        </div>
    );
}

export default CreateTeam;


