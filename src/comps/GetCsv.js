import React from 'react';
import { useState } from "react";
import setFormat from "../functs/setFormat";
import storico from "../data/StoricoPartite.json";


function GetCsv(props) {
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file && document.querySelector('#password').value === "Gianni77") {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                let stringaDaLeggere = csvOutput
                let arrayRaw = stringaDaLeggere.split(";")
                let arrayLetto = []; 
                let budgetData = [];
                let budgetSettingList = [];
                let vecchiBudget = [];
                let partitAttuale
                let i = 15;
                while ( i < arrayRaw.length-15) {
                    if (setFormat(arrayRaw[i]) === "Budget"){
                        if (setFormat(arrayRaw[i+1]) === "Settings"){
                            let budgetSettings = {budget_step : arrayRaw[i+2], percentuale : arrayRaw[i+3]}
                            budgetSettingList.push(budgetSettings);
                        }else{
                            //salva il record nell'array dati budget
                            if (setFormat(arrayRaw[i+1]) === "Attuale"){
                                let budgetAttuale = {cassa_attuale: parseFloat(arrayRaw[i+2]), target_step : parseFloat(arrayRaw[i+3]), incassi : parseFloat(arrayRaw[i+4]), uscite :parseFloat(arrayRaw[i+5]), vinte : parseFloat(arrayRaw[i+6]),giocate : parseFloat(arrayRaw[i+7])}
                                budgetData.push(budgetAttuale);
                            }else{
                                let budget = {cassa_attuale: arrayRaw[i+2], target_step : arrayRaw[i+3], incassi : arrayRaw[i+4], uscite :arrayRaw[i+5], vinte : arrayRaw[i+6],giocate : arrayRaw[i+7]}
                                vecchiBudget.push(budget);
                            }
                        }
                    }else{
                        partitAttuale = {campionato : setFormat(arrayRaw[i]), squadraCasa : setFormat(arrayRaw[i+1]) ,squadraOspite : setFormat(arrayRaw[i+2]) , casa : arrayRaw[i+3] , suGiuCasa : arrayRaw[i+5], fuori : arrayRaw[i+4], suGiuFuori : arrayRaw[i+6], gol : arrayRaw[i+7], noGol : arrayRaw[i+8], o15 : arrayRaw[i+9], u15 : arrayRaw[i+10] , o25 : arrayRaw[i+11], u25 : arrayRaw[i+12] , golCasa : arrayRaw[i+13], golOspite : arrayRaw[i+14] };
                        arrayLetto.push(partitAttuale);
                    }
                    i = i+15
                }
                // test -------------
                props.postFile()
                //---------------------
                props.setFile(arrayLetto)
                props.setTabella(arrayLetto)

                props.setbudgetData(budgetData[0])
                props.setbudgetSettings(budgetSettingList[0])  
                props.setvecchiBudget(vecchiBudget)  
            };
            fileReader.readAsText(file); 
        }else{
            props.setToast('seleziona il file ed inserisci la password per accedere')
            props.showToast()
        }
    };


    

    
    const usaStoricoDefault = () => {
        if (document.querySelector('#password').value === "Gianni77") {

            let partite = []
            let attuale = []
            let setting = []
            let storicobudget = []
            // cicla l'array - crea file letto - crea settings - crea attuale - crea storico
            // eslint-disable-next-line
            var lista = (storico).map((oggetto =>{
            if (oggetto.campionato !== undefined){
                partite.push(oggetto)
            }else{
                switch(oggetto.tipo){
                    case 'Attuale' : 
                        attuale.push(oggetto)
                    break;
                    case 'Settings' : 
                    setting.push(oggetto)
                    break;
                    case 'Chiuso' :
                        storicobudget.push(oggetto)
                    break;
                    default : 
                    break;
                }
            }
            return(null)            
            }));
        // test -------------
        props.postFile()
        //---------------------
        props.setFile(partite)
        props.setTabella(partite)
        props.setbudgetData(attuale[0])
        props.setbudgetSettings(setting[0])  
        props.setvecchiBudget(storicobudget) 
        }else{
            props.setToast('Password errata')
            props.showToast()
        }
    };

   

    

    return (
        <div className="w-full text-center">
            <h1 className="font-medium leading-tight text-3xl mt-0 mb-12 text-white">Metodo block</h1>
            <form>
                <div className="flex justify-center px-12">
                    <div className="mb-3 max-w-sm">
                        <label htmlFor="formFile" accept=".csv" className="lg:text-xl block text-white text-sm mb-2">Importa il csv per iniziare</label>
                        <input  onChange={handleOnChange} className="lg:text-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="csvFileInput" />
                    </div>
                </div>
                <div className=" flex justify-center">
                    <div className="max-w-sm">
                        <label className="lg:text-xl block text-white text-sm mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="lg:text-lg shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****"></input>
                    </div>
                </div> 
                <div className="flex justify-center">
                    <div className="flex space-x-2 justify-center mt-4 mr-4">
                        <button onClick={(e) => {handleOnSubmit(e);}} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Start</button>
                    </div>
                    <div className="flex space-x-2 justify-center mt-4 ">
                        <button onClick={(e) => {usaStoricoDefault()}} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Utilizza  lo storico salvato</button>
                    </div>
                </div> 
                   
                

            </form>
        </div>
    );
}

export default GetCsv;


