import { useState } from "react";
import GetCsv from "./comps/GetCsv";
import './AppStyle.css';
import Dashboard from "./comps/Dashboard"


function App() {

  const [fileLetto, setFileLetto] = useState();
  const [partitaSelezionata, setpartitaSelezionata] = useState({campionato : "empty"});
  const [indicePSelezionata, setindicePSelezionata] = useState(-1)
  const [datiTabella, setdatiTabella] = useState();
  //------ test 
  const postFile = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");    
  };
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
      let biVal = []
      let min 
      let max 
      let isFormEmpty = true
      for (var key in partita) {
        // console.log(partita) // = object {campionato : "serieA" .....}
        // console.log(key) // = // string "campionato"
        let valoreForm = partita[key]
       // partita.campionato === "1"
        if(valoreForm !== null && valoreForm !== "" && valoreForm !== "ND"){
          if (valoreForm.indexOf('%') !== -1){
            biVal = valoreForm.split("%")
            if (biVal.length < 2){
              //uno dei due range non è settato 
              //segnala messaggio ed esci TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            }else{
              min = biVal[0]
              max = biVal[1]
              isFormEmpty = false
              for (let i = 0; i < lista.length; i++) {
                if ((lista[i][key].replace(",", ".") >= min) && (lista[i][key].replace(",", ".") <= max) ) {
                  if (giaAggiunte.indexOf(i) < 0){
                    risultato.push(lista[i])
                    giaAggiunte.push(i)
                  }
                }
              }
            }
          }else{
            // normal search
            isFormEmpty = false
            for (let i = 0; i < lista.length; i++) {
              if (lista[i][key].replace(",", ".") === valoreForm) {
                if (giaAggiunte.indexOf(i) < 0){
                  risultato.push(lista[i])
                  giaAggiunte.push(i)
                }
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
      return(partiteTrovate)
    }


  const cleanForm = () => {
    setpartitaSelezionata({campionato : "empty"})
    setindicePSelezionata (-1)
    setdatiTabella(fileLetto)
  }

  const explode = (valore) => {
    let indicePartita = valore.split("_")[1]
    setpartitaSelezionata(fileLetto[indicePartita])
    setindicePSelezionata (indicePartita)
  }

 
 

    return (
        <div className="w-screen h-screen">
          <div id="GetCsv" className="w-screen h-5/6 flex items-center">
            <GetCsv  setTabella={setdatiTabella} setFile={setFileLetto} postFile={postFile}></GetCsv>
          </div>         
          <div id="dashboard" className="hidden w-full h-full py-2 relative overflow-hidden">
            <Dashboard setdatiTabella={setdatiTabella} cercaPartite={cercaPartite} cleanForm={cleanForm} setPartita={setPartita} removePartita={removePartita} addPartita={addPartita} explode={explode} datiTabella={datiTabella} partitaSelezionata={partitaSelezionata}></Dashboard>
          </div>
        </div>
    );
}

export default App;


