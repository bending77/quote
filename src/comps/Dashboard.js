import Form from "./Form";
import { useState } from "react";
import Tabella from "./Tabella"
import OutputStats from "./OutputStats";
import statdata from './../data/Stats';
import InputNumber from "./InputNumber";
import FormSchedina from "./FormSchedina";
function Dashboard(props) {
    const [stato, setStato] = useState(0);
    // stato 0 main menu 
    // stato 1 form inserimento
    // stato 2 tabella 
    // stato 3 libero-----------------------------
    // stato 4 form double allowed x filtrare le schedine
    // stato 5 risultati del calcolo statistiche
    // stato 6 form inserimento schedina
    let statJSON = JSON.parse(JSON.stringify(statdata));
    const [statistiche, setstatistiche] = useState(statJSON);

    const [partiteInSchedina, setpartiteInSchedina] = useState([]);
    const [partiteDaLeggere, setpartiteDaLeggere] = useState(0);
    const [partiteLette, setpartiteLette] = useState(0);




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
            case "pronosticobtn" : 
                let numero = document.querySelector('#numeroPartite').value
                document.querySelector('#numeroPartite').value = ''
                if (numero < 1){
                    props.setToast('inserisci un numero di partite valido prima di iniziare')
                    props.showToast()
                }else{
                    setpartiteDaLeggere(numero)
                    setpartiteInSchedina([])
                    setStato(6)
                }
            break;
            default : 
            break;
       }
    };

    const goMainMenu = () => {
        if (stato === 5){
            setstatistiche(JSON.parse(JSON.stringify(statdata)))
            props.cleanForm()
            setStato(0)
        }else{
            if (stato === 6){
                setpartiteLette(0)
                setpartiteDaLeggere(0)
                setpartiteInSchedina([]) 
                props.cleanForm()
                setStato(0)
            }else{
                setStato(0)
            }    
        }   
    };

     const explode = (valore) => {
         props.explode(valore)
     }

    const setPartita = () => {
        props.setPartita()
    }

    const validaPartitaFiltro = (partita) => {
        let hasTeams = false
        let hasMoreThan0Quote = false
        if (partita.squadraCasa !== "" && partita.squadraOspite !== ""){
          hasTeams = true
        }
        if (partita.suGiuCasa !== "" || partita.suGiuFuori!== "" || partita.casa !== "" || partita.fuori !== ""){
          hasMoreThan0Quote = true
        }
        if ( partita.gol !== "" || partita.noGol !== "" || partita.o15 !== "" || partita.u15 !== "" || partita.o25 !== "" || partita.u25 !== "" ){
          hasMoreThan0Quote = true
        }
        if (hasTeams && hasMoreThan0Quote){
          return true
        }else{
          return false 
        }
      };
    const prossimaPartita = () => {
        let partita = props.getPartitaDaForm()
        if (validaPartitaFiltro(partita)){
            let schedina = partiteInSchedina.slice()
            schedina.push(partita)
            setpartiteInSchedina(schedina)
            if (partiteLette+1 < partiteDaLeggere ){
                props.cleanForm() 
                setpartiteLette(partiteLette+1)
            }else{
                setpartiteLette(0)
                setpartiteDaLeggere(0)
                props.cleanForm()
                setStato(7)
            }
        }else{
            alert('La partita inserita non è valida:\n Ogni partita deve contenere entrambe le squadre ed almeno una quota.')
        }
    }


    const removePartita = () => {
        props.removePartita()
    }

    const finePartite = () => {
        let partita = props.getPartitaDaForm()
        if (validaPartitaFiltro(partita)){
            let schedina = partiteInSchedina.slice()
            schedina.push(partita)
            setpartiteInSchedina(schedina)
            setpartiteLette(0)
            setpartiteDaLeggere(0)
            props.cleanForm()
            setStato(7)
           
        }else{
            setpartiteLette(0)
            setpartiteDaLeggere(0)
            props.cleanForm()
            setStato(7)}
    }


    const filtraAncora = () => {
        props.cleanForm()
        setStato(4)
        setstatistiche(JSON.parse(JSON.stringify(statdata)))
    }



    const cercaPartite = () => {
        let partite = props.cercaPartite()
        if (partite === "KO"){
            alert('inserisci almeno una quota per utilizzare la funzione cerca')
            return
        }
       
        if (partite.length === 0){
            props.setToast('Nessuna partita trovata con i criteri selezionati')
            props.showToast()
            return
        }
        let risultati = statJSON
        risultati.partiteTrovate = partite.length

        //calcola le statistiche
        for (let i = 0; i < partite.length; i++) {
            let match = partite[i]
            //risultati
            if (match.golCasa > match.golOspite){
                risultati.statGroups[0].stats.uno.valore = risultati.statGroups[0].stats.uno.valore +1
                risultati.statGroups[0].stats.unox.valore = risultati.statGroups[0].stats.unox.valore +1
                risultati.statGroups[0].stats.unodue.valore = risultati.statGroups[0].stats.unodue.valore +1
            }
            if (match.golCasa === match.golOspite){
                risultati.statGroups[0].stats.x.valore = risultati.statGroups[0].stats.x.valore +1
                risultati.statGroups[0].stats.unox.valore = risultati.statGroups[0].stats.unox.valore +1
                risultati.statGroups[0].stats.xdue.valore = risultati.statGroups[0].stats.xdue.valore +1
            }
            if (match.golCasa < match.golOspite){
                risultati.statGroups[0].stats.due.valore = risultati.statGroups[0].stats.due.valore +1
                risultati.statGroups[0].stats.unodue.valore = risultati.statGroups[0].stats.unodue.valore +1
                risultati.statGroups[0].stats.xdue.valore = risultati.statGroups[0].stats.xdue.valore +1
            }
            //gol nogol
            if (parseFloat(match.golCasa) === 0 && parseFloat(match.golOspite) === 0){
                risultati.statGroups[1].stats.noGoal.valore = risultati.statGroups[1].stats.noGoal.valore +1
            }
            if (parseFloat(match.golCasa) > 0 && parseFloat(match.golOspite) > 0){
                risultati.statGroups[1].stats.goal.valore = risultati.statGroups[1].stats.goal.valore +1
            }
            if (parseFloat(match.golCasa) > 0){
                risultati.statGroups[1].stats.golCasa.valore = risultati.statGroups[1].stats.golCasa.valore +1
            }
            if (parseFloat(match.golOspite) > 0){
                risultati.statGroups[1].stats.golFuori.valore = risultati.statGroups[1].stats.golFuori.valore +1
            }
            //underover 
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) <= 1){
                risultati.statGroups[2].stats.u15.valore = risultati.statGroups[2].stats.u15.valore +1
            }
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) > 1){
                risultati.statGroups[2].stats.o15.valore = risultati.statGroups[2].stats.o15.valore +1
            }
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) <= 2){
                risultati.statGroups[2].stats.u25.valore = risultati.statGroups[2].stats.u25.valore +1
            }
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) > 2){
                risultati.statGroups[2].stats.o25.valore = risultati.statGroups[2].stats.o25.valore +1
            }
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) <= 3){
                risultati.statGroups[2].stats.u35.valore = risultati.statGroups[2].stats.u35.valore +1
            }
            if (parseFloat(match.golCasa) + parseFloat(match.golOspite) > 3){
                risultati.statGroups[2].stats.o35.valore = risultati.statGroups[2].stats.o35.valore +1
            }
            //numgol
            if (parseFloat(match.golCasa) === 0){
                risultati.statGroups[3].stats.c0.valore = risultati.statGroups[3].stats.c0.valore +1
            }
            if (parseFloat(match.golCasa) === 1){
                risultati.statGroups[3].stats.c1.valore = risultati.statGroups[3].stats.c1.valore +1
            }
            if (parseFloat(match.golCasa) === 2){
                risultati.statGroups[3].stats.c2.valore = risultati.statGroups[3].stats.c2.valore +1
            }
            if (parseFloat(match.golCasa) === 3){
                risultati.statGroups[3].stats.c3.valore = risultati.statGroups[3].stats.c3.valore +1
            }
            if (parseFloat(match.golCasa) === 4){
                risultati.statGroups[3].stats.c4.valore = risultati.statGroups[3].stats.c4.valore +1
            }
            if (parseFloat(match.golCasa) > 4){
                risultati.statGroups[3].stats.cp4.valore = risultati.statGroups[3].stats.cp4.valore +1
            }
            if (parseFloat(match.golOspite) === 0){
                risultati.statGroups[3].stats.f0.valore = risultati.statGroups[3].stats.f0.valore +1
            }
            if (parseFloat(match.golOspite) === 1){
                risultati.statGroups[3].stats.f1.valore = risultati.statGroups[3].stats.f1.valore +1
            }
            if (parseFloat(match.golOspite) === 2){
                risultati.statGroups[3].stats.f2.valore = risultati.statGroups[3].stats.f2.valore +1
            }
            if (parseFloat(match.golOspite) === 3){
                risultati.statGroups[3].stats.f3.valore = risultati.statGroups[3].stats.f3.valore +1
            }
            if (parseFloat(match.golOspite) === 4){
                risultati.statGroups[3].stats.f4.valore = risultati.statGroups[3].stats.f4.valore +1
            }
            if (parseFloat(match.golOspite) > 4){
                risultati.statGroups[3].stats.fp4.valore = risultati.statGroups[3].stats.fp4.valore +1
            }
        }

        //calcola le percentuali
        let rapp, perc
        for (let i = 0; i<risultati.statGroups.length ; i++){
           let statisticheGruppo = risultati.statGroups[i].stats
           for (var key in statisticheGruppo) {
                rapp = statisticheGruppo[key].valore/risultati.partiteTrovate
                perc = Math.trunc(rapp*100)
                statisticheGruppo[key].percentuale = perc
           }
        }

        //let rapp, perc
        let maxs = [[],[],[],[]];
        for (let i = 0; i<risultati.statGroups.length ; i++){
           let statisticheGruppo = risultati.statGroups[i].stats
           let percentualeMassima = 0
           for (var ky in statisticheGruppo) {
                if (statisticheGruppo[ky].percentuale === percentualeMassima){
                    maxs[i].push(statisticheGruppo[ky])
                }else{
                    if (statisticheGruppo[ky].percentuale > percentualeMassima){
                        maxs[i]=[statisticheGruppo[ky]]
                        percentualeMassima = statisticheGruppo[ky].percentuale
                    } 
                }
           }
        }
        maxs = maxs[0].concat(maxs[1]).concat(maxs[2]).concat(maxs[3])
        risultati.maxs = maxs
        props.setdatiTabella(partite)
        setstatistiche(risultati)
        setStato(5)
    }



    let tastoback = " hidden"

    let tastoAdd = "hidden"
    let tastoClean = "hidden"
    let tastoSalva = "hidden"
    let tastoElimina = "hidden"
    let tastoCerca = "hidden"
    let tastoProx = "hidden"
    let tastoAncora = "hidden"



    let pulsantiera = " hidden"
    let form = " hidden h-full pb-10"
    let mainMenu = " hidden"
    let tabella = " hidden h-full pt-10 "
    let stats = " hidden"
    let formSchedina = " hidden"

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
                form = " h-full pt-12 pb-10"
                formTitle = "Inserimento"
            break;
            case 2 : 
                tabella = " h-1/2 p-2 "
                pulsantiera = " "
                tastoSalva = ""
                tastoElimina = ""
                form = " h-1/2 pt-14 pb-2 "
                formTitle = "Modifica"
            break;
            case 4 : 
                pulsantiera = ""
                form = " h-full pt-24 pb-2 "
                formTitle = "Filtra"
                tastoCerca = ""
                tastoClean = ""
            break;
            case 5 : 
                stats = " h-1/2 pt-14 pb-2 "
                tabella = " h-1/2 p-2 "
                formTitle = "Statistiche"
                pulsantiera = ""
                tastoAncora = ""
            break;
            case 6 : 
                pulsantiera = ""
                tastoProx = " mr-2"
                form = " pt-12 pb-2"
                formTitle = "Aggiungi alla schedina"
            break;
            case 7 : 
                pulsantiera = ""
                formSchedina = ""
                formTitle = "Pronostici schedina"
            break;
            default : 
            break;
            
        }
    }

    return (
        <div className='relative w-full h-full'>
            <div id="pulsantiera" className={"z-20 shadow-lg h-12 absolute top-0 right-0 left-0 py-2 pr-6 pl-6 flex bg-blue-500 rounded-b-lg"+pulsantiera}>
                <div className="relative w-full">
                    <div id="tastoback" className={"z-30 absolute top-0 left-0 "+tastoback} onClick={goMainMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                    </div>

                    <div className="z-20 w-full absolute top-0 left-0  bottom-0 right-0 flex items-center justify-center text-white">
                        {formTitle}
                    </div>
                    <div className={"z-30 absolute top-0 right-0 flex"}>
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
                        <div className={""+tastoAncora} onClick={filtraAncora}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div className={""+tastoProx} onClick={prossimaPartita}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className={""+tastoProx} onClick={finePartite}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                            </svg>
                        </div>     
                    </div>
                </div>             
            </div>


            <div id="mainMenu" className={"w-full h-full py-2 overflow-hidden flex items-center relative "+mainMenu}>
                <div className="absolute bottom-0 right-0 mr-4 mb-4">
                    <div className="bg-blue-500 rounded-full w-16 h-16 flex justify-center items-center" onClick={props.downloadFile}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                    </div>
                </div>
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
                    <div className="mb-6 border border-blue-500 rounded-lg py-2 px-2 bg-blue-100">
                        <div className="mb-2 flex justify-center">
                            <div className="w-1/2">
                                <InputNumber doubleAllowed={false} id="numeroPartite" label="Numero partite" step="1" min="1"></InputNumber>
                            </div>
                        </div>
                        <button id="pronosticobtn" onClick={(e) => {handletasto(e);}} type="button" className="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Effettua un pronostico schedina</button>    
                    </div>
                </div>
            </div>
            <div id="form" className={"w-full overflow-y-scroll "+form}>
                <Form statoDash={stato} partitaSelezionata={props.partitaSelezionata}></Form>
            </div>
            <div id="formSchedina" className={"w-full pt-10 h-full overflow-y-scroll shadow-lg"+formSchedina}>
                <FormSchedina cercaPartiteSchedina={props.cercaPartiteSchedina} partiteInSchedina={partiteInSchedina}></FormSchedina>
            </div>
            <div id="stats" className={"z-10 w-full pt-10 overflow-y-scroll shadow-lg "+stats}>
                <OutputStats statistiche={statistiche}></OutputStats>
            </div>
            <div id="tabella" className={"w-full overflow-y-scroll "+tabella}> 
                <Tabella lista={props.datiTabella} explode={explode}> </Tabella>
            </div>
        </div>
    );
}

export default Dashboard;
