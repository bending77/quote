import { useState } from "react";
import GetCsv from "./comps/GetCsv";
import Form from "./comps/Form";
import Tabella from "./comps/Tabella"
import './AppStyle.css';
import './backgroundStyle.css';


function App() {

  const [fileLetto, setFileLetto] = useState();
  const [partitaSelezionata, setpartitaSelezionata] = useState({campionato : "empty"});
  const [indicePSelezionata, setindicePSelezionata] = useState(-1)
  const [statoForm, setstatoForm] = useState("inserimento");
  const [datiTabella, setdatiTabella] = useState();
  //------ test 
  const postFile = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");    
  };

  const postRicerca = () => {
    setpartitaSelezionata({campionato : "empty"})
    setindicePSelezionata (-1)
    setstatoForm("inserimento")
  }
  //--------------
    const removePartita = () => {
      let nuovodb = fileLetto.slice()
      nuovodb.splice(indicePSelezionata,1)
      cleanForm()
      setFileLetto(nuovodb)
      setdatiTabella(nuovodb)
    }

    const setPartita = () => {
      let partita = getPartitaDaForm()
      if (validaPartita(partita)){
        for (var key in partita) {
          if(partita[key] === null || partita[key] === ""){
            partita[key] = "ND"
          }             
        }
        let nuovodb = fileLetto.slice()
        nuovodb[indicePSelezionata] = partita
        cleanForm()
        setFileLetto(nuovodb)
        setdatiTabella(nuovodb)
      }else{
        console.log("la partita che stai tentando di inserire contiene degli errori: le squadre, almeno una quota ed i risultati devono essere valorizzati.")
      }
    }

    const addPartita = () => {
      let partita = getPartitaDaForm();
      if (validaPartita(partita)){
        for (var key in partita) {
          if(partita[key] === null || partita[key] === ""){
            partita[key] = "ND"
          }             
        }
        let nuovodb = fileLetto.slice()
        nuovodb.push(partita)
        cleanForm()
        setFileLetto(nuovodb)
        setdatiTabella(nuovodb)
      }else{
        console.log("la partita che stai tentando di inserire contiene degli errori: le squadre, almeno una quota ed i risultati devono essere valorizzati.")
      }
    }
    const getPartitaDaForm = () => {
      let partita = {campionato : "", squadraCasa : "", squadraOspite : "",casa : "", fuori : "", suGiuCasa : "", suGiuFuori : "", gol : "", noGol : "", o15 : "", u15 : "", o25 : "", u25 : "", golCasa : "", golOspite : "" } 
      partita.campionato =  document.getElementById("campionato").value;
      partita.squadraCasa =  document.getElementById("squadraCasa").value;
      partita.squadraOspite =  document.getElementById("squadraOspite").value;
      partita.suGiuCasa =  document.getElementById("suGiuCasa").value;
      partita.suGiuFuori =  document.getElementById("suGiuFuori").value;

      partita.casa =  document.getElementById("quotaCasa").value;
      partita.fuori =  document.getElementById("quotaFuori").value;
      partita.gol =  document.getElementById("quotaGol").value;
      partita.noGol =  document.getElementById("quotaNoGol").value;
      partita.o15 =  document.getElementById("quotaO15").value;
      partita.u15 =  document.getElementById("quotaU15").value;
      partita.o25 =  document.getElementById("quotaO25").value;
      partita.u25 =  document.getElementById("quotaU25").value;

      partita.golCasa =  document.getElementById("quotaGolCasa").value;
      partita.golOspite =  document.getElementById("quotaGolFuori").value;

      return partita
    };

    const validaPartita = (partita) => {
      let hasTeams = false
      let hasMoreThan0Quote = false
      let hasResult = false
      if (partita.squadraCasa !== "" && partita.squadraOspite !== ""){
        hasTeams = true
      }
      if (partita.suGiuCasa !== "" || partita.suGiuFuori!== "" || partita.casa !== "" || partita.fuori !== ""){
        hasMoreThan0Quote = true
      }
      if ( partita.gol !== "" || partita.noGol !== "" || partita.o15 !== "" || partita.u15 !== "" || partita.o25 !== "" || partita.u25 !== "" ){
        hasMoreThan0Quote = true
      }
      if (partita.golCasa !== "" && partita.golOspite !== ""){
        hasResult = true
      }  
      if (hasTeams && hasMoreThan0Quote && hasResult){
        return true
      }else{
        return false 
      }
    };

    const matchPartite = (partita, lista) => {

      let giaAggiunte = []
      let risultato = []
      let isFormEmpty = true
      for (var key in partita) {
        // console.log(partita) // = object {campionato : "serieA" .....}
        // console.log(key) // = // string "campionato"
        let valoreForm = partita[key]
       // partita.campionato === "1"
        if(valoreForm !== null && valoreForm !== "" && valoreForm !== "ND"){
          isFormEmpty = false
          for (let i = 0; i < lista.length; i++) {
            //console.log(parseFloat(valoreForm))

            //console.log(parseFloat(lista[i][key]))
            if (lista[i][key].replace(",", ".") === valoreForm) {
              if (giaAggiunte.indexOf(i) < 0){
                risultato.push(lista[i])
                giaAggiunte.push(i)
              }
            }
          }
        }             
      }
      if (isFormEmpty){
        risultato = fileLetto
      }
      return risultato
      
    }

    const cercaPartite = () => {
      let partita = getPartitaDaForm();
      let partiteTrovate = matchPartite(partita, fileLetto);
      setdatiTabella(partiteTrovate)
      console.log(partiteTrovate)
    }


  const cleanForm = () => {
    setpartitaSelezionata({campionato : "empty"})
    setindicePSelezionata (-1)
    setdatiTabella(fileLetto)
    setstatoForm("inserimento")
  }

  const explode = (valore) => {
    let indicePartita = valore.split("_")[1]
    setpartitaSelezionata(fileLetto[indicePartita])
    setindicePSelezionata (indicePartita)
    setstatoForm("modifica")
  }

    let aggiungiEnabled = false
    let modificaEnabled = false
    let rimuoviEnabled = false
    if(statoForm === "inserimento"){
      modificaEnabled = true
      rimuoviEnabled = true
    }else{
      aggiungiEnabled = true
    }
 

    return (
        <div className="w-screen h-screen flex items-center">
          <div id="GetCsv" className="w-screen">
            <GetCsv  setTabella={setdatiTabella} setFile={setFileLetto} postFile={postFile}></GetCsv>
          </div>         
          <div id="dashboard" className="hidden bg-gray-900 w-full h-full py-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-12 py-1 bg-red-500">
            </div>
            <div id="form" className="w-full h-3/6 overflow-y-scroll pt-12">
              <div>
                <Form partitaSelezionata={partitaSelezionata}></Form>
              </div>
            </div>
          
            <div className="h-3/6 overflow-y-scroll rounded-lg pt-2 pb-12">
              <Tabella lista={datiTabella} explode={explode}> </Tabella>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-12 py-1">
            <div className="flex justify-evenly">
                <button onClick={addPartita} disabled={aggiungiEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Aggiungi partita
                </button>
                <button onClick={removePartita} disabled={rimuoviEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Rimuovi partita
                </button>
                <button onClick={setPartita} disabled={modificaEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Salva le modifiche 
                </button>
                <button onClick={cleanForm} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Pulisci form
                </button>
                <button onClick={cercaPartite} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  effettua ricerca
                </button>
              </div>


            </div>
          </div>
        </div>
    );
}

export default App;


