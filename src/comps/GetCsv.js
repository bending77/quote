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
                let partitAttuale
                let i = 15;
                while ( i < arrayRaw.length-15) {
                  partitAttuale = {campionato : setFormat(arrayRaw[i]), squadraCasa : setFormat(arrayRaw[i+1]) ,squadraOspite : setFormat(arrayRaw[i+2]) , casa : arrayRaw[i+3] , suGiuCasa : arrayRaw[i+4], fuori : arrayRaw[i+5], suGiuFuori : arrayRaw[i+6], gol : arrayRaw[i+7], noGol : arrayRaw[i+8], o15 : arrayRaw[i+9], u15 : arrayRaw[i+10] , o25 : arrayRaw[i+11], u25 : arrayRaw[i+12] , golCasa : arrayRaw[i+13], golOspite : arrayRaw[i+14] };
                  arrayLetto.push(partitAttuale);
                  i = i+15
                }
                // test -------------
                props.postFile()
                //---------------------
                props.setFile(arrayLetto)
                props.setTabella(arrayLetto)
                
            };
            fileReader.readAsText(file); 
        }else{
            props.setToast('seleziona il file ed inserisci la password per accedere')
            props.showToast()
        }
    };


    

    const readfile = (e) => {
        e.preventDefault();
        if (file && document.querySelector('#password').value === "Gianni77") {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                let stringaDaLeggere = csvOutput
                let arrayRaw = stringaDaLeggere.split(";")
                let arrayLetto = []; 
                let partitAttuale
                let i = 15;
                while ( i < arrayRaw.length-15) {
                  partitAttuale = {campionato : arrayRaw[i], squadraCasa : arrayRaw[i+1] ,squadraOspite : arrayRaw[i+2] , casa : arrayRaw[i+3] , suGiuCasa : arrayRaw[i+4], fuori : arrayRaw[i+5], suGiuFuori : arrayRaw[i+6], gol : arrayRaw[i+7], noGol : arrayRaw[i+8], o15 : arrayRaw[i+9], u15 : arrayRaw[i+10] , o25 : arrayRaw[i+11], u25 : arrayRaw[i+12] , golCasa : arrayRaw[i+13], golOspite : arrayRaw[i+14] };
                  arrayLetto.push(partitAttuale);
                  i = i+15
                }
                // test -------------
                props.ImportSettings()
                //---------------------
                props.setFile(arrayLetto)
                
            };
            fileReader.readAsText(file); 
        }else{
            props.setToast('password errata per il getter')
            props.showToast()
        }
    };

    const usaStoricoDefault = () => {
        if (document.querySelector('#password').value === "Gianni77") {
             // test -------------
             props.postFile()
             //---------------------
             props.setFile(storico)
             props.setTabella(storico)
        }else{
            props.setToast('Funzione in fase di sviluppo')
            props.showToast()
        }
    };

   

    

    return (
        <div className="w-full text-center">
            <h1 className="font-medium leading-tight text-3xl mt-0 mb-12 text-blue-500">Benvenuto!</h1>
            <form>
                <div className="flex justify-center px-12">
                    <div className="mb-3 max-w-sm">
                        <label htmlFor="formFile" accept=".csv" className="lg:text-xl block text-blue-500 text-sm mb-2">Importa il csv per iniziare</label>
                        <input  onChange={handleOnChange} className="lg:text-lg form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="csvFileInput" />
                    </div>
                </div>
                <div className=" flex justify-center">
                    <div className="max-w-sm">
                        <label className="lg:text-xl block text-blue-500 text-sm mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="lg:text-lg shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****"></input>
                    </div>
                </div> 
                <div className="flex justify-center">
                    <div className="flex space-x-2 justify-center mt-4 mr-4">
                        <button onClick={(e) => {handleOnSubmit(e);}} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Start</button>
                    </div>

                    <div className="flex space-x-2 justify-center mt-4 hidden">
                        <button onClick={(e) => {readfile(e)}} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium lg:text-lg xl:text-xl text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Getter</button>
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


