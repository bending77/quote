import React from 'react';
import InputNumber from "./InputNumber";
import GraficoLine from './GraficoLine';
import TabellaQuote from './TabellaQuote';
import { useState, useEffect} from "react";



function GestoreBudget(props) {
    const [stato, setStato] = useState(0);

    const [righeTab, setrigheTab] = useState([]);

    const handletasto = (e) => {
        switch (e.currentTarget.id){
            case 'grafici' :
                setStato(1);
                break;
            case 'aggiungiSch' :
                setStato(2);
                break;
            case 'nuovo_step' :
                if (props.budgetData.cassa_attuale === "E"){
                    inizializzaStep();
                }else{
                    chiudiStep();
                    inizializzaStep();
                }
                break; 
            case 'vincita' :
                inserisciVincita();
            break; 
            case 'giocata' :
                inserisciGiocata();
            break;  
            case 'chiudi_step' :
                chiudiStep();
            break;  
            default : 
                setStato(0)
                break;

        }
    };

    useEffect(()=>{
        updateStepData();
    },[props.budgetData]);

    
    const inserisciVincita = () => {
        if (props.budgetData.cassa_attuale === "E"){
            props.setToast('Inizia uno step prima di inserire delle vincite')
            props.showToast()
            document.querySelector('#importo').value = ''
        }else{
            let giocate = props.budgetData.giocate
            let vinte = props.budgetData.vinte
            if (giocate <= vinte){
                props.setToast('Nessuna giocata per questa vincita, inserisci prima la giocata')
                props.showToast()
            }else{
                props.setisDbChanged(true);
                let importo = parseInt(document.querySelector('#importo').value)
                if(importo <= 0 || importo === ""){
                    //do nothing
                }else{
                    if (props.budgetData.cassa_attuale + importo >= props.budgetData.target_step){
                        props.setToast('Target raggiunto, puoi chiudere lo step')
                        document.querySelector('#target_attuale').classList.add('bg-green-500')
                    }else{
                        props.setToast('Vincita inserita')
                    }
                    let stepAttuale = JSON.parse(JSON.stringify(props.budgetData))
                    stepAttuale.cassa_attuale = stepAttuale.cassa_attuale + importo;
                    stepAttuale.incassi = parseFloat(stepAttuale.incassi) + importo;
                    stepAttuale.vinte = parseFloat(stepAttuale.vinte) + 1;
                    props.setbudgetData(stepAttuale)
                    props.showToast()
                }
                
            }
            document.querySelector('#importo').value = ''
        }
       
     };

    const inserisciGiocata = () => {
        if (props.budgetData.cassa_attuale === "E"){
            props.setToast('Inizia uno step prima di inserire delle giocate')
            props.showToast()
            document.querySelector('#importo').value = ''
        }else{
            // legge il valore dell' importo 
            let importo = parseInt(document.querySelector('#importo').value)
            let cassa  = props.budgetData.cassa_attuale 
            if ((importo <= 0 || importo === "") || (importo > cassa || isNaN(importo))){
                props.setToast('Inserisci un importo minore o uguale alla cassa per inserire una giocata')
                props.showToast()
            }else{ 
                props.setisDbChanged(true);        
                let stepAttuale = JSON.parse(JSON.stringify(props.budgetData))
                stepAttuale.cassa_attuale = stepAttuale.cassa_attuale - importo;
                stepAttuale.uscite = parseFloat(stepAttuale.uscite) + importo;
                stepAttuale.giocate = parseFloat(stepAttuale.giocate) + 1;
                props.setbudgetData(stepAttuale)
                props.setToast('Giocata inserita')
                props.showToast()
            }
            document.querySelector('#importo').value = ''
        }
    };

    const arrotondaQuota = (q) => {
        if (q > 1){
            let arrayQuota = (q+"").split(".")
            if (arrayQuota.length > 1){
                let intero = Number.parseFloat((q+"").split(".")[0])
                let lunghDecimale = (q+"").split(".")[1].length
                if (lunghDecimale > 2){
                    let arrotondato = Number.parseFloat((q+"").split(".")[1].substring(0,2))
                    arrotondato = (arrotondato /100) + 0.01
                    q = intero + arrotondato
                    return q;
                }else{
                    return q;
                }
            }else{
                return q;
            } 
        }else{
            return -1;
        }
    };

    const updateStepData = () => {
        let budgetStep = props.budgetData.cassa_attuale;
        if (budgetStep === 'E'){
            document.querySelector('#cassa_attuale').value = '';
            document.querySelector('#target_step').value = '';
    
            document.querySelector('#incassi_mese').value = '';
            document.querySelector('#uscite_mese').value = '';
            document.querySelector('#schedine_vinte').value = '';
            document.querySelector('#schedine_giocate').value = '';
    
            document.querySelector('#target_attuale').value = '';
            setrigheTab([])

        }else{
            document.querySelector('#cassa_attuale').value = budgetStep;
            document.querySelector('#target_step').value = props.budgetData.target_step;
    
            document.querySelector('#incassi_mese').value = props.budgetData.incassi;
            document.querySelector('#uscite_mese').value = props.budgetData.uscite;
            document.querySelector('#schedine_vinte').value = props.budgetData.vinte;
            document.querySelector('#schedine_giocate').value = props.budgetData.giocate;
    
            let target_attuale = props.budgetData.target_step-budgetStep
            document.querySelector('#target_attuale').value = target_attuale;
            let righe = []
            let prossimaQ
            for (let i = budgetStep; i>=1; i--){
                let daVincere = target_attuale + i
                let q = daVincere / i
                prossimaQ = arrotondaQuota((target_attuale + i -1) / (i-1))
                q = arrotondaQuota(q)
                if (q > 0 && q !== prossimaQ){
                    righe.push({quota: q, importo : i})
                }  
            }
            setrigheTab(righe)
        }
       
    };

    const inizializzaStep = () => {
        props.setisDbChanged(true);
        let budgetStep = props.budgetSettings.budget_step;
        let percentuale = props.budgetSettings.percentuale;
        document.querySelector('#cassa_attuale').value = budgetStep;

        let targetStep = parseInt(budgetStep)+(budgetStep*percentuale/100)
        document.querySelector('#target_step').value = targetStep;

        document.querySelector('#incassi_mese').value = 0;
        document.querySelector('#uscite_mese').value = 0;
        document.querySelector('#schedine_vinte').value = 0;
        document.querySelector('#schedine_giocate').value = 0;

        let target_attuale = targetStep-budgetStep
        document.querySelector('#target_attuale').value = target_attuale;
        let righe = []
        for (let i = budgetStep; i>=1; i--){
            let daVincere = target_attuale + i
            let q = daVincere / i
            q = arrotondaQuota(q)
            if (q > 0){
                righe.push({quota: q, importo : i})
            } 
        }
        setrigheTab(righe)

        let nuovo_step = {cassa_attuale: parseInt(budgetStep), target_step : parseInt(targetStep), incassi : 0, uscite :0, vinte : 0,giocate : 0}
        props.setbudgetData(nuovo_step);
    }


    const trigger = () => {
   
    }


    const chiudiStep = () => {
        if (props.budgetData.cassa_attuale === "E"){
            props.setToast('Nessuno step aperto')
            props.showToast()
        }else{
            if (window.confirm('Confermi la chiusura dello step ?')) {
                document.querySelector('#target_attuale').classList.remove('bg-green-500')
                if (window.confirm('Vuoi salvare lo step in corso?')) {
                    // Save it!
                    let vecchiBudget = props.vecchiBudget.slice()
                    vecchiBudget.push(props.budgetData)
                    props.setvecchiBudget(vecchiBudget)
                    props.setToast('Step salvato')
                    props.showToast()
                    props.setisDbChanged(true);
                } else {
                    props.setToast('Step scartato')
                    props.showToast()
                }
                // chiudi lo step
                let stepChiuso= {cassa_attuale: "E", target_step : "E", incassi : "E", uscite : "E", vinte : "E",giocate : "E"}
                props.setbudgetData(stepChiuso)
            } else {
                // Do nothing!
            }
        }
    }

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
                <button id="riepilogo" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mr-1">Step in corso</button>
                <button id="aggiungiSch" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mr-1">Gioca o incassa</button>
                <button id="grafici" onClick={(e) => {handletasto(e);}} type="button" className="hidden mt-4 w-full inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out mr-1">Storico degli step</button>
            </div>
            <div className={'mt-2 lg:flex lg:items-center '+normalStats}>
                <div className="w-full h-1/2 lg:w-1/2 lg:h-full px-6">
                    <InputNumber bloccato={true} doubleAllowed={false} id="cassa_attuale" label="Cassa attuale" step="0.1" min="1"></InputNumber> 
                    <InputNumber bloccato={true} doubleAllowed={false} id="target_step" label="Target per lo step" step="0.1" min="1"></InputNumber>    
                    <div className="flex justify-evenly">
                        <div className='mr-1'>
                            <InputNumber bloccato={true} doubleAllowed={false} id="incassi_mese" label="Incassi dello step" step="0.1" min="1"></InputNumber> 
                        </div>
                        <div className='ml-1'>
                            <InputNumber bloccato={true} doubleAllowed={false} id="uscite_mese" label="Uscite dello step" step="0.1" min="1"></InputNumber>    
                        </div>
                    </div>    
                    <div className="flex justify-evenly">
                        <div className='mr-1'>
                            <InputNumber bloccato={true} doubleAllowed={false} id="schedine_vinte" label="Schedine vinte" step="0.1" min="1"></InputNumber> 
                        </div>
                        <div className='ml-1'>
                            <InputNumber bloccato={true} doubleAllowed={false} id="schedine_giocate" label="Schedine giocate" step="0.1" min="1"></InputNumber>    
                        </div>
                    </div> 
                    <InputNumber doubleAllowed={false} id="target_attuale" label="Target attuale" step="0.1" min="1"></InputNumber>                      
                    <div className="flex justify-evenly">
                        <button id="nuovo_step" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 mr-1 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Nuovo step</button>
                        <button id="chiudi_step" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 ml-1 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Chiudi step</button>
                    </div>
                    
                </div>
                <div className='w-full h-40  px-6 lg:h-96 lg:w-1/2 overflow-y-scroll mt-4 lg:mt-1'>
                        <TabellaQuote lista={righeTab}></TabellaQuote>
                </div>
            </div>
            <div className={"w-full h-1/2 lg:w-1/2 lg:h-full pt-6 px-6"+ insertSch}>
                <InputNumber trigger={trigger} doubleAllowed={false} id="importo" label="Importo" step="0.1" min="1"></InputNumber>  
                <div className="lg:flex lg:justify-evenly">
                    <button id="vincita" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 mr-1 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Inserisci vincita</button>
                    <button id="giocata" onClick={(e) => {handletasto(e);}} type="button" className="mt-4 ml-1 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Inserisci giocata</button>
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
