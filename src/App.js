import React from 'react';
import { useState } from "react";
import GetCsv from "./comps/GetCsv";
import './AppStyle.css';
import Dashboard from "./comps/Dashboard"
import squadre from "./data/Squadre.json"
import setFormat from "./functs/setFormat";


function App() {

  const [fileLetto, setFileLetto] = useState();
  const [partitaSelezionata, setpartitaSelezionata] = useState({campionato : "empty"});
  const [indicePSelezionata, setindicePSelezionata] = useState(-1)
  const [datiTabella, setdatiTabella] = useState();
  

  const [isDbChanged, setisDbChanged] = useState(false);

  const [budgetSettings, setbudgetSettings] = useState({budget_step : "empty"});
  const [budgetData, setbudgetData] = useState([]);
  const [vecchiBudget, setvecchiBudget] = useState([]);

  //------ test 
  const postFile = () => {
    document.getElementById("GetCsv").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");    
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


        //ordina l'array delle partite
        nuovodb = mergeSort(nuovodb,'gol');
        nuovodb = mergeSort(nuovodb,'sugiu');
        nuovodb = mergeSort(nuovodb,'casa');
        //-----


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
        let isIn = false
        for (let i=0 ; i<fileLetto.length ; i++){
          let indb = JSON.stringify(fileLetto[i])
          let inserted = JSON.stringify(partita)
          if (indb === inserted){
            isIn = true
          }
        }
        if (!isIn){
          nuovodb.push(partita)
          cleanForm()
        //ordina l'array delle partite
        nuovodb = mergeSort(nuovodb,'gol');
        nuovodb = mergeSort(nuovodb,'sugiu');
        nuovodb = mergeSort(nuovodb,'casa');
        //-----



          setFileLetto(nuovodb)
          setdatiTabella(nuovodb)
          setToast('Partita inserita')
          
          if (!isDbChanged){
            setisDbChanged(true)
          }
        }else{
          setToast('Partita già presente nello storico')
        }

        showToast()
        
      }else{
        alert("la partita che stai tentando di inserire contiene degli errori: le squadre, almeno una quota ed i risultati devono essere valorizzati.")
      }
    }

    const getQuoteForm = () => {
      let chiavi = ['uno','x','due','unox','unodue','xdue', 'goal', 'noGoal', 'golCasa', 'golFuori', 'u15', 'o15', 'u25', 'o25', 'u35', 'o35','mg13','mg14','mg24','mg25'];
      let quote=[[],[]];
      for (let i=0 ; i<chiavi.length ; i++){
        let valore = document.getElementById('xx'+chiavi[i]).value;
        if (valore !== 0 && valore !== null && valore !== ''){
          quote[0].push(chiavi[i])
          quote[1].push(valore)
        }
      }
      return quote
    };
    

  function calcolaValore(statistiche) {
    let quote = getQuoteForm();
      if (quote[0].length > 0){
        let listaGruppi = statistiche.statGroups
        let perc = []
        for (let i=0 ; i<listaGruppi.length ; i++){
          let gruppoAttuale = listaGruppi[i]
          for (let j=0; j<quote[0].length; j++){
            if (gruppoAttuale.list.indexOf(quote[0][j]) > -1){
              perc.push(gruppoAttuale.stats[quote[0][j]].percentuale)
            }
          }
          
        }
        let htmls = [];
        for (let i=0 ; i<quote[0].length ; i++){
          let honest = ((1*quote[1][i])*(perc[i]/100)-1);
          //arrotonda honest 
          honest=honest+''
          let arr = honest.split('.')
          let numero;
          if(arr.length === 1){
            numero = arr[0]
          }else{
            let decimali = arr[1]
            if (decimali.length > 2){
              decimali=decimali.substring(0, 2)
            }
            numero = parseFloat(arr[0]+'.'+decimali)
          }
          
          //lo pusho dentro la stat 
          htmls.push(quote[0][i]+";;"+numero)
        }
        return htmls;

      }else{
        setToast('Inserisci almeno una quota per calcolare le quote di valore.')
        showToast()
        return -1;
      }
  }

  function merge(left, right,chiave) {
      let arr = []
      // Break out of loop if any one of the array gets empty
      while (left.length && right.length) {

          switch (chiave){
              case 'gol' : 
                  if (left[0].gol < right[0].gol) {
                      arr.push(left.shift())  
                  } else {
                      arr.push(right.shift()) 
                  }
              break;
              case 'sugiu' :
                  if (left[0].suGiuCasa < right[0].suGiuCasa) {
                      arr.push(left.shift())  
                  } else {
                      arr.push(right.shift()) 
                  }
              break;
              case 'casa' :
                  if (left[0].casa < right[0].casa) {
                      arr.push(left.shift())  
                  } else {
                      arr.push(right.shift()) 
                  }
              break;
              default :

              break;
          }
      }
      
      // Concatenating the leftover elements
      // (in case we didn't go through the entire left or right array)
      return [ ...arr, ...left, ...right ]
  }

  function mergeSort(array,chiave) {
      const half = array.length / 2
      
      // Base case or terminating case
      if(array.length < 2){
        return array 
      }
      
      const left = array.splice(0, half)
      return merge(mergeSort(left,chiave),mergeSort(array,chiave),chiave)
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

  const cleanValueForm = () => {
    let chiavi = ['uno','x','due','unox','unodue','xdue', 'goal', 'noGoal', 'golCasa', 'golFuori', 'u15', 'o15', 'u25', 'o25', 'u35', 'o35','mg13','mg14','mg24', 'mg25'];
    for (let i=0 ; i<chiavi.length ; i++){
      document.getElementById("idcontainer"+chiavi[i]).classList.add('hidden')
      document.getElementById("idtext"+chiavi[i]).innerHTML = ''
      document.getElementById("idcolor"+chiavi[i]).classList.remove('bg-red-700')
      document.getElementById("idcolor"+chiavi[i]).classList.remove('bg-red-400')
      document.getElementById("idcolor"+chiavi[i]).classList.remove('bg-yellow-500')
      document.getElementById("idcolor"+chiavi[i]).classList.remove('bg-green-700')
      document.getElementById("idcolor"+chiavi[i]).classList.remove('bg-green-400')
      document.getElementById("xx"+chiavi[i]).value = ""
      
    }
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
 /* if (isDbChanged){
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

  }*/
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
      let isFormFieldSetted = valoreForm !== null && valoreForm !== "" && valoreForm !== "ND"
      if (key === "suGiuCasa" || key === "suGiuFuori"){
        isFormFieldSetted = valoreForm !== null && valoreForm !== ""
      }

      if(isFormFieldSetted){

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
        <div className="w-screen h-screen bg-gray-900 relative">
            <div id="GetCsv" className="w-screen h-5/6 flex items-center">
              <GetCsv setvecchiBudget={setvecchiBudget} setbudgetData={setbudgetData} setbudgetSettings={setbudgetSettings} setToast={setToast} showToast={showToast} setTabella={setdatiTabella} setFile={setFileLetto} postFile={postFile}></GetCsv>
            </div>       
            <div id="dashboard" className="hidden w-full h-full relative overflow-hidden">
              <Dashboard cleanValueForm={cleanValueForm} calcolaValore={calcolaValore} setisDbChanged={setisDbChanged} vecchiBudget={vecchiBudget} setvecchiBudget={setvecchiBudget} setbudgetData={setbudgetData} setbudgetSettings={setbudgetSettings} budgetData={budgetData} budgetSettings={budgetSettings} matchPartite={matchPartite} isDbChanged={isDbChanged} downloadFileJson={downloadFileJson} downloadFileCsv={downloadFileCsv} setToast={setToast} showToast={showToast} setFileLetto={setFileLetto} fileLetto={fileLetto} cercaPartiteSchedina={cercaPartiteSchedina} getPartitaDaForm={getPartitaDaForm} setdatiTabella={setdatiTabella} cercaPartite={cercaPartite} cleanForm={cleanForm} setPartita={setPartita} removePartita={removePartita} addPartita={addPartita} explode={explode} datiTabella={datiTabella} partitaSelezionata={partitaSelezionata}></Dashboard>
            </div>
            <div id="snackbar">
              testo toast
            </div>
          </div>
    );
}

export default App;


