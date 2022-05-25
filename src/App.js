import { useState } from "react";
import GetCsv from "./comps/GetCsv";
import './AppStyle.css';
import Dashboard from "./comps/Dashboard"
import ImportSettings from "./comps/ImportSettings";
import squadre from "./data/Squadre.json"
import setFormat from "./functs/setFormat";


function App() {

  const [fileLetto, setFileLetto] = useState();
  const [partitaSelezionata, setpartitaSelezionata] = useState({campionato : "empty"});
  const [indicePSelezionata, setindicePSelezionata] = useState(-1)
  const [datiTabella, setdatiTabella] = useState();

  const [isDbChanged, setisDbChanged] = useState(false);

  //------ test 
  const postFile = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");    
  };

  const importST = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("ImportSettings").classList.remove("hidden");    
  };
  //--------------
    const removePartita = () => {
      if (indicePSelezionata < 0){
        setToast('Prima seleziona una partita')
      }else{
        let nuovodb = fileLetto.slice()
        nuovodb.splice(indicePSelezionata,1)
        cleanForm()
        setFileLetto(nuovodb)
        setdatiTabella(nuovodb)
        setToast('Partita eliminata dallo storico')
        if (!isDbChanged){
          setisDbChanged(true)
        }
      }
      showToast()
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
        setToast('Partita modificata')
        showToast()
        if (!isDbChanged){
          setisDbChanged(true)
        }
      }else{
        alert("la partita che stai tentando di inserire contiene degli errori: le squadre, almeno una quota ed i risultati devono essere valorizzati.")
      }
    }

    const addPartita = () => {
      let partita = getPartitaDaForm();
      partita.squadraCasa = setFormat(partita.squadraCasa)
      partita.squadraOspite = setFormat(partita.squadraOspite)
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
        setToast('Partita inserita')
        showToast()
        if (!isDbChanged){
          setisDbChanged(true)
        }
      }else{
        alert("la partita che stai tentando di inserire contiene degli errori: le squadre, almeno una quota ed i risultati devono essere valorizzati.")
      }
    }
    const getPartitaDaForm = () => {
      let partita = {campionato : "", squadraCasa : "", squadraOspite : "",casa : "", fuori : "", suGiuCasa : "", suGiuFuori : "", gol : "", noGol : "", o15 : "", u15 : "", o25 : "", u25 : "", golCasa : "", golOspite : "" } 
      partita.squadraCasa =  setFormat(document.getElementById("squadraCasa").value);
      partita.squadraOspite =  setFormat(document.getElementById("squadraOspite").value);
      if (partita.squadraCasa === "" && partita.squadraOspite === "" ){
        partita.squadraCasa =  setFormat(document.getElementById("squadraCasaX").value);
        partita.squadraOspite =  setFormat(document.getElementById("squadraOspiteX").value);
      }


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
        if (squadre.indexOf(partita.squadraCasa) !== -1 && squadre.indexOf(partita.squadraOspite) !== -1){
          hasTeams = true
        }
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

    // true se almeno una quota O I GOL sono settati
    const hasMoreThan0Quote = (partita) => {
      let hasMoreThan0Quote = false
      if (partita.suGiuCasa !== "" || partita.suGiuFuori!== "" || partita.casa !== "" || partita.fuori !== ""){
        hasMoreThan0Quote = true
      }
      if ( partita.gol !== "" || partita.noGol !== "" || partita.o15 !== "" || partita.u15 !== "" || partita.o25 !== "" || partita.u25 !== "" ){
        hasMoreThan0Quote = true
      }
      if (partita.golCasa !== "" || partita.golOspite !== ""){
        hasMoreThan0Quote = true
      }  
      return hasMoreThan0Quote
    };

    const cercaPartite = () => {
      let partita = getPartitaDaForm();
      partita.campionato = ""
      partita.squadraCasa = ""
      partita.squadraOspite = ""
      if (!hasMoreThan0Quote(partita)){
        return "KO"
      }else{
        let partiteTrovate = matchPartite(partita, fileLetto);
        if (partiteTrovate === "KO"){
          return "DO-NOTHING"
        }
        return(partiteTrovate)
      }
      
    }

    const cercaPartiteSchedina = (partita) => {
      let partitaJSON = JSON.parse(JSON.stringify(partita));
      partitaJSON.campionato = ""
      partitaJSON.squadraCasa = ""
      partitaJSON.squadraOspite = ""
      let partiteTrovate = matchPartite(partitaJSON, fileLetto);
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

  const showToast = () => {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  const setToast = (text) => {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
}

const downloadFileCsv = () => {
  if (isDbChanged){
    let csvContent = "data:text/csv;charset=utf-8,";
    let primaRiga = "c;c;o;c;s;f;s;g;n;o;u;o;u;c;o;\r"
    let oggetto = fileLetto.map(function(elem){
      let partita = ""
      for (var key in elem) {
        partita = partita+elem[key]+";"
      }
      partita = partita + "\r"
      return partita
    }).join("")
    csvContent += primaRiga+oggetto 
  
  
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);

  }
}

const downloadFileJson = () => {
  // do nothing 
}

const matchPartite = (partita, lista) => {
  let isCounter = false
  if(partita === "CONTA" && lista === "CONTA"){
    partita = getPartitaDaForm()
    partita.campionato = ""
    partita.squadraCasa = ""
    partita.squadraOspite = ""
    if (!hasMoreThan0Quote(partita)){
      return "KO"
    }
    lista = fileLetto
    isCounter = true
  }
  let risultati = []
  for (let i = 0; i < lista.length; i++){
    let partitaAttuale = lista[i]
    let match = true
    for (var key in partita) {
      let valoreForm = partita[key]
      if(valoreForm !== null && valoreForm !== "" && valoreForm !== "ND"){

        //check bival fields
        if (valoreForm.indexOf('%') !== -1){
          let bival = valoreForm.split("%")
          if (bival.length < 2){
            setToast('intervallo non completo per '+key)
            showToast()
            return "KO"
          }else{
            if (bival[0] > bival[1]){
              setToast('intervallo errato per '+key)
              showToast()
              return "KO"
            }else{
              if (partitaAttuale[key].replace(",", ".") >= bival[0] && partitaAttuale[key].replace(",", ".") <= bival[1]){

              }else{
                match = false
              }
            }
          }
        }else{
          if (partitaAttuale[key].replace(",", ".") === valoreForm){

          }else{
            match = false
          }
        }
      }else{
        //se il campo form è vuoto non fare niente 
      }
    }
    if (match){
      risultati.push(partitaAttuale)
    }
  }
  if(isCounter){
    return (risultati.length)
  }else{
    return (risultati)
  }
}



    return (
        <div className="w-screen h-screen bg-gray-900 ">
          <div id="GetCsv" className="w-screen h-5/6 flex items-center">
            <GetCsv  ImportSettings={importST} setToast={setToast} showToast={showToast} setTabella={setdatiTabella} setFile={setFileLetto} postFile={postFile}></GetCsv>
          </div> 
          <div id="ImportSettings" className="hidden w-screen h-full">
            <ImportSettings fileLetto={fileLetto}></ImportSettings>
          </div>        
          <div id="dashboard" className="hidden w-full h-full relative overflow-hidden">
            <Dashboard matchPartite={matchPartite} isDbChanged={isDbChanged} downloadFileJson={downloadFileJson} downloadFileCsv={downloadFileCsv} setToast={setToast} showToast={showToast} fileLetto={fileLetto} cercaPartiteSchedina={cercaPartiteSchedina} getPartitaDaForm={getPartitaDaForm} setdatiTabella={setdatiTabella} cercaPartite={cercaPartite} cleanForm={cleanForm} setPartita={setPartita} removePartita={removePartita} addPartita={addPartita} explode={explode} datiTabella={datiTabella} partitaSelezionata={partitaSelezionata}></Dashboard>
          </div>
          <div id="snackbar">
            testo toast
          </div>
        </div>
    );
}

export default App;


