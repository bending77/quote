import React from 'react';
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import InputNumber from "./InputNumber";
import InputSearch from "./inputSearch";
import InputText from "./InputText";

function Form(props) {

    const [doubleAllowed, setdoubleAll] = useState(false);
    const [dropOrText, setdropOrText] = useState(true);

    const [showSquadre, setshowSquadre] = useState("");

    const [showgoal, setshowgoal] = useState("");



    const [isQuoteValore, setisQuoteValore] = useState(" hidden");
    const [isNotQuoteValore, setisNotQuoteValore] = useState("");


    const [formatoForm, setformatoForm] = useState("lg:w-1/2 lg:pt-4");

    const [contatorePartite, setcontatorePartite] = useState("");

    const [listaDrop, setlistaDrop] = useState(["S","G"]);

    const findSelectIndex = (valore, lista) => {
        let indice = lista.indexOf(valore)
        return indice +1 
    };

    const emptytrigger = () => {
        
    };


    useEffect(()=>{
        if (props.partitaSelezionata.campionato === "empty"){
            document.getElementById("squadraCasa").value = "";
            document.getElementById("squadraOspite").value = "";
            document.getElementById("quotaCasa").value = "";
            document.getElementById("quotaFuori").value = "";
            document.getElementById("quotaGol").value = "";
            document.getElementById("quotaNoGol").value = "";
            document.getElementById("quotaO15").value = "";
            document.getElementById("quotaU15").value = "";
            document.getElementById("quotaO25").value = "";
            document.getElementById("quotaU25").value = "";
            document.getElementById("quotaGolCasa").value = "";
            document.getElementById("quotaGolFuori").value = "";

            document.getElementById("quotaCasaA").value = "";
            document.getElementById("quotaFuoriA").value = "";
            document.getElementById("quotaGolA").value = "";
            document.getElementById("quotaNoGolA").value = "";
            document.getElementById("quotaO15A").value = "";
            document.getElementById("quotaU15A").value = "";
            document.getElementById("quotaO25A").value = "";
            document.getElementById("quotaU25A").value = "";
            document.getElementById("quotaGolCasaA").value = "";
            document.getElementById("quotaGolFuoriA").value = "";

            document.getElementById("quotaCasaB").value = "";
            document.getElementById("quotaFuoriB").value = "";
            document.getElementById("quotaGolB").value = "";
            document.getElementById("quotaNoGolB").value = "";
            document.getElementById("quotaO15B").value = "";
            document.getElementById("quotaU15B").value = "";
            document.getElementById("quotaO25B").value = "";
            document.getElementById("quotaU25B").value = "";
            document.getElementById("quotaGolCasaB").value = "";
            document.getElementById("quotaGolFuoriB").value = "";


            setTimeout(function() {
                document.getElementById("suGiuCasa").selectedIndex = -1; // da tenere
                document.getElementById("suGiuFuori").selectedIndex = -1; //da tenere 
            }, 100);
        }else{
            if (props.partitaSelezionata.casa !== '' && props.partitaSelezionata.casa !== "ND"){
                document.getElementById("quotaCasa").value = parseFloat(props.partitaSelezionata.casa.replace(",","."));
            }else{
                document.getElementById("quotaCasa").value = ''  
            }


            if (props.partitaSelezionata.fuori !== '' && props.partitaSelezionata.fuori !== "ND"){
                document.getElementById("quotaFuori").value = parseFloat(props.partitaSelezionata.fuori.replace(",","."));
            }else{
                document.getElementById("quotaFuori").value = ''  
            }
            if (props.partitaSelezionata.gol !== '' && props.partitaSelezionata.gol !== "ND"){
                document.getElementById("quotaGol").value = parseFloat(props.partitaSelezionata.gol.replace(",","."));
            }else{
                document.getElementById("quotaGol").value = ''  
            }
            if (props.partitaSelezionata.noGol !== '' && props.partitaSelezionata.noGol !== "ND"){
                document.getElementById("quotaNoGol").value = parseFloat(props.partitaSelezionata.noGol.replace(",","."));
            }else{
                document.getElementById("quotaNoGol").value = ''  
            }

            if (props.partitaSelezionata.o15 !== '' && props.partitaSelezionata.o15 !== "ND"){
                document.getElementById("quotaO15").value = parseFloat(props.partitaSelezionata.o15.replace(",","."));
            }else{
                document.getElementById("quotaO15").value = ''  
            }
            if (props.partitaSelezionata.u15 !== '' && props.partitaSelezionata.u15 !== "ND"){
                document.getElementById("quotaU15").value = parseFloat(props.partitaSelezionata.u15.replace(",","."));
            }else{
                document.getElementById("quotaU15").value = ''  
            }
            if (props.partitaSelezionata.o25 !== '' && props.partitaSelezionata.o25 !== "ND"){
                document.getElementById("quotaO25").value = parseFloat(props.partitaSelezionata.o25.replace(",","."));
            }else{
                document.getElementById("quotaO25").value = ''  
            }
            if (props.partitaSelezionata.u25 !== '' && props.partitaSelezionata.u25 !== "ND"){
                document.getElementById("quotaU25").value = parseFloat(props.partitaSelezionata.u25.replace(",","."));
            }else{
                document.getElementById("quotaU25").value = ''  
            }
            
            document.getElementById("quotaGolCasa").value = parseInt(props.partitaSelezionata.golCasa);
            document.getElementById("quotaGolFuori").value = parseInt(props.partitaSelezionata.golOspite);



            document.getElementById("squadraOspiteX").value = props.partitaSelezionata.squadraOspite
            document.getElementById("squadraCasaX").value = props.partitaSelezionata.squadraCasa
           

            let indexSGC = findSelectIndex(props.partitaSelezionata.suGiuCasa, ["S","G"])
            let indexSGF = findSelectIndex(props.partitaSelezionata.suGiuFuori, ["S","G"])
            setTimeout(function() {
                document.getElementById("suGiuCasa").selectedIndex = indexSGC;
                document.getElementById("suGiuFuori").selectedIndex = indexSGF;
            }, 100);
        }
    },[props.partitaSelezionata]);


    useEffect(()=>{

        switch (props.statoDash){
            case 10 : 
                setdoubleAll(false)
                setshowSquadre(" hidden")
                setshowgoal(" hidden")
                setcontatorePartite(" hidden")
                setformatoForm("lg:pt-4")
                setlistaDrop(["S","G","ND"])
                setisQuoteValore("")
                setisNotQuoteValore(" hidden")
            break;
            case 4 : 
                setdoubleAll(true)
                setshowSquadre(" hidden")
                setshowgoal("")
                setcontatorePartite(" hidden")
                setformatoForm("lg:pt-4")
                setlistaDrop(["S","G","ND"])
                setisQuoteValore(" hidden")
                setisNotQuoteValore("")
            break;
            case 6:
                setdoubleAll(true)
                setshowgoal(" hidden")
                setcontatorePartite("")
                setformatoForm("lg:pt-4")
                setlistaDrop(["S","G","ND"])
                setisQuoteValore(" hidden")
                setisNotQuoteValore("")
            break;
            case 2 : 
                setdropOrText(false)
                setdoubleAll(false)
                setshowSquadre(" hidden")
                setcontatorePartite(" hidden")
                setshowgoal("")
                setformatoForm(" lg:flex")
                setlistaDrop(["S","G"])
                setisQuoteValore(" hidden")
                setisNotQuoteValore("")
            break;
            default :
                setdropOrText(true) 
                setdoubleAll(false)
                setshowSquadre("")
                setshowgoal("")
                setcontatorePartite(" hidden")
                setformatoForm(" lg:w-1/2 lg:pt-4")
                setlistaDrop(["S","G"])
                setisQuoteValore(" hidden")
                setisNotQuoteValore("")
            break;
        }
    },[props.statoDash]); 

    const contaPartite = () => {
        let risultato
        risultato = props.matchPartite("CONTA","CONTA")

        if (risultato === "KO"){
            risultato = 0
        }
        document.querySelector('#partiteTrovate').innerHTML="Partite trovate: "+risultato
    };

    
    
    
   
    let drop = " hidden"
    let text = " hidden"
    if (dropOrText){
        drop = ""
    }else{
        text=""
    }

    return (
        
        <div className="h-full overflow-y-scroll lg:overflow-y-hidden xl:overflow-y-hidden pb-2 relative">
            <div className={"px-4 text-center "+isNotQuoteValore}>
                <div className="w-full lg:flex lg:justify-center">
                    <div className={"lg:w-1/2 rounded overflow-hidden p-4 "+showSquadre}>
                        
                        <div className={"flex justify-center mb-2"+drop}>
                            <InputSearch setToast={props.setToast} showToast={props.showToast} id="squadraCasa" label="Squadra casa"></InputSearch>
                        </div>
                        <div className={"flex justify-center mb-2"+drop}>
                            <InputSearch setToast={props.setToast} showToast={props.showToast} id="squadraOspite" label="Squadra ospite"></InputSearch>
                        </div>


                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="campionatoX" label="Campionato"></InputText>
                        </div>
                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="squadraCasaX" label="Squadra casa"></InputText>
                        </div>
                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="squadraOspiteX" label="Squadra ospite"></InputText>
                        </div>
                    </div>
                    <div className={" "+formatoForm}>
                        <div className="flex justify-between ">
                            <div className="w-1/2">
                                <div className="flex justify-between mb-2 px-2">
                                    <div className="w-3/5">
                                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaCasa" label="Casa" step="0.1" min="1"></InputNumber>
                                    </div>
                                    <div className="w-1/5">
                                        <Dropdown id="suGiuCasa" label="tend" lista={listaDrop} trigger={emptytrigger} ></Dropdown>
                                    </div>
                                </div>
                                <div className="flex justify-between mb-2 px-2">
                                    <div className="w-3/5">
                                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaFuori" label="Fuori" step="0.1" min="1"></InputNumber>
                                    </div>
                                    <div className="w-1/5">
                                        <Dropdown id="suGiuFuori" label="tend" lista={listaDrop} trigger={emptytrigger} ></Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div  className="w-1/2 px-2">
                                <div >
                                    <div className="">
                                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaGol" label="GOL" step="0.1" min="1"></InputNumber>
                                    </div>
                                    <div className="w-2 h-1"></div>
                                    <div className="">
                                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaNoGol" label="NOGOL" step="0.1" min="1"></InputNumber>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 px-2">
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaO15" label="OVE 1.5" step="0.1" min="1"></InputNumber>
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaO25" label="OVE 2.5" step="0.1" min="1"></InputNumber>
                            </div>
                            <div className="w-1/2 px-2">
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaU15" label="UND 1.5" step="0.1" min="1"></InputNumber>
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaU25" label="UND 2.5" step="0.1" min="1"></InputNumber>
                            </div>
                        </div>
                        <div className={"flex"+showgoal}>
                            <div className="w-1/2 px-2">
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaGolCasa" label="Gol casa" step="1" min="0"></InputNumber>
                            </div>
                            <div className="w-1/2 px-2">
                                <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="quotaGolFuori" label="Gol ospiti" step="1" min="0"></InputNumber>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"px-4 text-center lg:px-64 "+isQuoteValore}>
                <div className='flex justify-between'>
                    <div className="w-1/2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxuno" label="1" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxx" label="X" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxdue" label="2" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxunox" label="1 - X" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxunodue" label="1 - 2" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxxdue" label="X - 2" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxgoal" label="Gol" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxnoGoal" label="no Gol" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxgolCasa" label="Gol casa" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxgolFuori" label="Gol fuori" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxu15" label="Under 1.5" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxo15" label="Over 1.5" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxu25" label="Under 2.5" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxo25" label="Over 2.5" step="0.1" min="1"></InputNumber>
                    </div>
                    
                </div>
                <div className='flex justify-between'>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxu35" label="Under 3.5" step="0.1" min="1"></InputNumber>
                    </div>
                    <div className="w-1/2 ml-2">
                        <InputNumber trigger={emptytrigger} doubleAllowed={doubleAllowed} id="xxo35" label="Over 3.5" step="0.1" min="1"></InputNumber>
                    </div>
                </div>
            </div>

            

            <div className={"fixed mb-4 lg:mb-16 bottom-0 left-0 right-0 h-16 flex justify-center items-center"+contatorePartite}> 
                        <div className="bg-gray-400 h-16 w-5/6 flex py-2 pl-4 rounded-lg max-w-sm">
                            <button onClick={(e) => {contaPartite(e);}} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Conta partite</button>
                            <div id="partiteTrovate" className="w-full px-4 text-white flex items-center">
                                Partite trovate: 0
                            </div>
                        </div>
            </div>

 
        </div>
    );
}

export default Form;

//piazza resistenza numero 20 
