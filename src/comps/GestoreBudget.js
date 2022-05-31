import React from 'react';
import InputNumber from "./InputNumber";
import GraficoLine from './GraficoLine';
import { useState } from "react";


function GestoreBudget(props) {
    const [stato, setStato] = useState(0);

    const handletasto = (e) => {
        switch (e.currentTarget.id){
            case 'grafici' :
                setStato(1);
                break;
            case 'aggiungiSch' :
                setStato(2);
                break;
            default : 
                setStato(0)
                break;

        }
    };

    let normalStats = " hidden"
    let andamento_mensile = " hidden"
    let insertSch = " hidden"


    switch (stato){
        case 0 :
            normalStats = ""
        break;
        case 1 :
            andamento_mensile = ""
        break;
        case 2 :
            insertSch = ""
        break;
        default : 

        break;
    }

    return (
        <div className="w-screen h-screen pt-12">
            <div className='w-full flex justify-evenly px-2'>
                <button id="riepilogo" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mr-1">Mese in corso</button>
                <button id="aggiungiSch" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mr-1">Gioca o incassa</button>
                <button id="grafici" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out">Andamento Mensile</button>
            </div>
            <div className={'mt-2 '+normalStats}>
                <div className="w-full h-1/2 lg:w-1/2 lg:h-full px-6">
                    <InputNumber doubleAllowed={false} id="budget_restante" label="Budget rimanente" step="0.1" min="1"></InputNumber> 
                    <InputNumber doubleAllowed={false} id="importo_massimo" label="Importo massimo schedina" step="0.1" min="1"></InputNumber>    
                    <div className="flex justify-evenly">
                        <InputNumber doubleAllowed={false} id="incassi_mese" label="Incassi del mese" step="0.1" min="1"></InputNumber> 
                        <InputNumber doubleAllowed={false} id="uscite_mese" label="Uscite del mese" step="0.1" min="1"></InputNumber>    
                    </div>    
                    <div className="flex justify-evenly">
                        <InputNumber doubleAllowed={false} id="schedine_vinte" label="Schedine vinte" step="0.1" min="1"></InputNumber> 
                        <InputNumber doubleAllowed={false} id="schedine_giocate" label="Schedine giocate" step="0.1" min="1"></InputNumber>    
                    </div> 
                    <InputNumber doubleAllowed={false} id="totale_bilancio" label="Bilancio totale" step="0.1" min="1"></InputNumber>                      
                </div>
            </div>
            <div className={"w-full h-1/2 lg:w-1/2 lg:h-full pt-6 px-6"+ insertSch}>
                <InputNumber doubleAllowed={false} id="importo" label="Importo" step="0.1" min="1"></InputNumber>  
                <div className="lg:flex lg:justify-evenly">
                    <button id="vincita" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Inserisci vincita</button>
                    <button id="giocata" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Inserisci giocata</button>
                </div>
            </div>
            <div className={"w-full pt-2 h-screen "+ andamento_mensile}>
                <div className='pt-2 px-8 lg:px-96 h-screen overflow-y-scroll'>
                    <GraficoLine id="graficoIncassi" label="Incassi" statoGestore={stato} colore={'rgba(0, 255, 255, 1)'} mesi={["Gennaio","Giugno"]} step={[10,1500]} valori={[10,571.89,1322,212,437,23]}></GraficoLine>
                    <div className='mt-4'>
                        <GraficoLine id="graficoSpese" label="Uscite" statoGestore={stato} colore={'rgba(125, 125, 255, 1)'} mesi={["Gennaio","Giugno"]} step={[5,80]} valori={[10,28,14,50,31,34]}></GraficoLine>
                    </div>
                    <div className='mt-4'>
                        <GraficoLine id="graficoGiocate" label="Schedine giocate" statoGestore={stato} colore={'rgba(255, 125, 125, 1)'} mesi={["Gennaio","Giugno"]} step={[1,30]} valori={[5,2,18,20,13,11]}></GraficoLine>
                    </div>
                    <div className='mt-4 mb-36'>
                        <GraficoLine id="graficoVinte" label="Schedine vinte" statoGestore={stato} colore={'rgba(125, 255, 125, 1)'} mesi={["Gennaio","Giugno"]} step={[1,30]} valori={[3,2,5,1,8,10]}></GraficoLine>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestoreBudget;
