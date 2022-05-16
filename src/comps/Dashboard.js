import Form from "./Form";
import { useState } from "react";
import Tabella from "./Tabella"
function Dashboard(props) {

    const [stato, setStato] = useState(0);
    // stato 0 main menu 
    // stato 1 form inserimento
    // stato 2 tabella 
    // stato 3 form con partita caricata
    // stato 4 form double allowed


    const handletasto = (e) => {
       switch (e.currentTarget.id){
            case "inseriscibtn" : 
                props.cleanForm()
                setStato(1)
            break;
            case "modificabtn" : 
                setStato(2)
            break;
            case "calcolabtn" : 
                props.cleanForm()
                setStato(4)
            break;
       }
    };

    const goMainMenu = () => {
        setStato(0) 
     };

     const explode = (valore) => {
         props.explode(valore)
         setStato(3)
     }

    const setPartita = () => {
        props.setPartita()
        setStato(2)
    }

    const removePartita = () => {
        props.removePartita()
        setStato(2)
    }

    const cercaPartite = () => {
        let partite = props.cercaPartite()
        let risultati = {partiteTrovate : 0,
        uno : 0, due : 0, x : 0, unox : 0, unodue : 0, xdue : 0,
        goal : 0, noGoal : 0, golCasa : 0, golFuori : 0, 
        u15 : 0, o15 : 0, u25 : 0, o25 : 0, u35 : 0, o35 : 0,
        c0 : 0, c1 : 0, c2 : 0, c3 : 0, c4 : 0, cp4 : 0, f0 : 0, f1 : 0, f2 : 0, f3 : 0, f4 : 0, fp4 : 0
        }
        risultati.partiteTrovate = partite.length

        for (let i = 0; i < partite.length; i++) {
            let match = partite[i]
            //risultati
            if (match.golCasa > match.golOspite){
                risultati.uno = risultati.uno +1
                risultati.unox = risultati.unox +1
                risultati.unodue = risultati.unodue +1
            }
            if (match.golCasa === match.golOspite){
                risultati.x = risultati.x +1
                risultati.unox = risultati.unox +1
                risultati.xdue = risultati.xdue +1
            }
            if (match.golCasa < match.golOspite){
                risultati.due = risultati.due +1
                risultati.unodue = risultati.unodue +1
                risultati.xdue = risultati.xdue +1
            }
            //gol nogol
            if (match.golCasa === 0 && match.golOspite === 0){
                risultati.noGoal = risultati.noGoal +1
            }
            if (match.golCasa > 0 && match.golOspite > 0){
                risultati.goal = risultati.goal +1
            }
            if (match.golCasa > 0){
                risultati.golCasa = risultati.golCasa +1
            }
            if (match.golOspite > 0){
                risultati.golFuori = risultati.golFuori +1
            }
            //underover 
            if (match.golCasa + match.golOspite <= 1){
                risultati.u15 = risultati.u15 +1
            }
            if (match.golCasa + match.golOspite > 1){
                risultati.o15 = risultati.o15 +1
            }
            if (match.golCasa + match.golOspite <= 2){
                risultati.u25 = risultati.u25 +1
            }
            if (match.golCasa + match.golOspite > 2){
                risultati.o25 = risultati.o25 +1
            }
            if (match.golCasa + match.golOspite <= 3){
                risultati.u35 = risultati.u35 +1
            }
            if (match.golCasa + match.golOspite > 3){
                risultati.o35 = risultati.o35 +1
            }
            //numgol
            if (match.golCasa === 0){
                risultati.c0 = risultati.c0 +1
            }
            if (match.golCasa === 1){
                risultati.c1 = risultati.c1 +1
            }
            if (match.golCasa === 2){
                risultati.c2 = risultati.c2 +1
            }
            if (match.golCasa === 3){
                risultati.c3 = risultati.c3 +1
            }
            if (match.golCasa === 4){
                risultati.c4 = risultati.c4 +1
            }
            if (match.golCasa > 4){
                risultati.cp4 = risultati.cp4 +1
            }
            if (match.golOspite === 0){
                risultati.f0 = risultati.f0 +1
            }
            if (match.golOspite === 1){
                risultati.f1 = risultati.f1 +1
            }
            if (match.golOspite === 2){
                risultati.f2 = risultati.f2 +1
            }
            if (match.golOspite === 3){
                risultati.f3 = risultati.f3 +1
            }
            if (match.golOspite === 4){
                risultati.f4 = risultati.f4 +1
            }
            if (match.golOspite > 4){
                risultati.fp4 = risultati.fp4 +1
            }
        }
        console.log(risultati)
        

      //setdatiTabella(partiteTrovate)
      //stampa le statistiche 
      //stampa la tabella 


    }




    let tastoback = " hidden"

    let tastoAdd = "hidden"
    let tastoClean = "hidden"
    let tastoSalva = "hidden"
    let tastoElimina = "hidden"
    let tastoCerca = "hidden"


    let pulsantiera = " hidden"
    let form = " hidden"
    let mainMenu = " hidden"
    let tabella = " hidden"

    let formTitle = ""

    if (stato === 0){
        mainMenu = ""
    }else{
        tastoback = ""
        switch (stato){
            case 1 : 
                pulsantiera = ""
                tastoAdd = ""
                tastoClean = ""
                form = ""
                formTitle = "Inserimento"
            break;
            case 2 : 
                tabella = ""
                pulsantiera = " hidden"
            break;
            case 3 : 
                tastoSalva = ""
                tastoElimina = ""
                pulsantiera = ""
                form = ""
                formTitle = "Modifica"
            break;
            case 4 : 
                pulsantiera = ""
                form = ""
                formTitle = "Filtra"
                tastoCerca = ""
            break;
            
        }
    }

    return (
        <div className='relative w-full h-full'>
            <div id="tastoback" className={"absolute top-0 left-0 mt-2 ml-6 "+tastoback} onClick={goMainMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </div>

            <div id="pulsantiera" className={"absolute top-0 right-0 mt-2 mr-6 flex"+pulsantiera}>
                <div className={""+tastoAdd} onClick={props.addPartita}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className={""+tastoClean} onClick={props.cleanForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className={""+tastoSalva} onClick={setPartita}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
                    </svg>
                </div>
                <div className={""+tastoElimina} onClick={removePartita}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <div className={""+tastoCerca} onClick={cercaPartite}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>                
            </div>


            <div id="mainMenu" className={"w-full h-full py-2 overflow-hidden flex items-center"+mainMenu}>
                <div className="w-full px-6">
                    <div className="mb-6">
                        <button id="inseriscibtn" onClick={(e) => {handletasto(e);}} type="button" className="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Inserisci partita</button>
                    </div>
                    <div className="mb-6">
                        <button id="modificabtn" onClick={(e) => {handletasto(e);}} type="button" className="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Modifica o visualizza</button>
                    </div>
                    <div className="mb-6">
                        <button id="calcolabtn" onClick={(e) => {handletasto(e);}} type="button" className="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Visualizza statistiche estese</button>
                    </div>
                    <div className="mb-6">
                        <button id="pronosticobtn" onClick={(e) => {handletasto(e);}} type="button" className="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Effettua un pronostico schedina</button>
                    </div>
                </div>
            </div>
            <div id="form" className={"w-full pt-10 overflow-y-scroll"+form}>
                <Form statoDash={stato} title={formTitle} partitaSelezionata={props.partitaSelezionata}></Form>
            </div>
            <div id="tabella" className={"w-full pt-10 h-full overflow-y-scroll"+tabella}> 
                <Tabella lista={props.datiTabella} explode={explode}> </Tabella>
            </div>
        </div>
    );
}

export default Dashboard;
