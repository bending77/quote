import { useState, useEffect } from "react";
import getAllLeagues from "../functs/mayorLeagues";
import getCampionati from "../functs/getCampionati";
import getSquadre from "../functs/getSquadre";
import Dropdown from "./Dropdown";
import InputNumber from "./InputNumber";
import InputText from "./InputText";

function Form(props) {
    const [sqCasaenabled, setsqCasaenabled] = useState([]);
    const [sqOspiteenabled, setsqOspiteenabled] = useState([]);

    const [doubleAllowed, setdoubleAll] = useState(false);
    const [dropOrText, setdropOrText] = useState(true);

    const [showSquadre, setshowSquadre] = useState("");

    const [showgoal, setshowgoal] = useState("");


    
    const findSelectIndex = (valore, lista) => {
        let indice = lista.indexOf(valore)
        return indice +1 
      };

    useEffect(()=>{
        if (props.partitaSelezionata.campionato === "empty"){
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
            setsqCasaenabled([])
            setsqOspiteenabled([])
            setTimeout(function() {
                document.getElementById("squadraOspite").selectedIndex = -1;
                document.getElementById("squadraCasa").selectedIndex = -1;
                document.getElementById("campionato").selectedIndex = -1;
                document.getElementById("suGiuCasa").selectedIndex = -1;
                document.getElementById("suGiuFuori").selectedIndex = -1;
            }, 100);
        }else{
            document.getElementById("quotaCasa").value = parseFloat(props.partitaSelezionata.casa.replace(",","."));
            document.getElementById("quotaFuori").value = parseFloat(props.partitaSelezionata.fuori.replace(",","."));
            document.getElementById("quotaGol").value = parseFloat(props.partitaSelezionata.gol.replace(",","."));
            document.getElementById("quotaNoGol").value = parseFloat(props.partitaSelezionata.noGol.replace(",","."));
            document.getElementById("quotaO15").value = parseFloat(props.partitaSelezionata.o15.replace(",","."));
            document.getElementById("quotaU15").value = parseFloat(props.partitaSelezionata.u15.replace(",","."));
            document.getElementById("quotaO25").value = parseFloat(props.partitaSelezionata.o25.replace(",","."));
            document.getElementById("quotaU25").value = parseFloat(props.partitaSelezionata.u25.replace(",","."));
            document.getElementById("quotaGolCasa").value = parseInt(props.partitaSelezionata.golCasa);
            document.getElementById("quotaGolFuori").value = parseInt(props.partitaSelezionata.golOspite);

            setsqCasaenabled(getSquadre(props.partitaSelezionata.campionato.trim()))
            setsqOspiteenabled(getSquadre(props.partitaSelezionata.campionato.trim()))

            document.getElementById("squadraOspiteX").value = props.partitaSelezionata.squadraOspite
            document.getElementById("squadraCasaX").value = props.partitaSelezionata.squadraCasa
            document.getElementById("campionatoX").value = props.partitaSelezionata.campionato.trim()

            let indexSGC = findSelectIndex(props.partitaSelezionata.suGiuCasa, ["S","G"])
            let indexSGF = findSelectIndex(props.partitaSelezionata.suGiuFuori, ["S","G"])
            setTimeout(function() {
                document.getElementById("suGiuCasa").selectedIndex = indexSGC;
                document.getElementById("suGiuFuori").selectedIndex = indexSGF;
            }, 100);
            
            
            
            /*let indexC = findSelectIndex(props.partitaSelezionata.squadraCasa, getSquadre(props.partitaSelezionata.campionato.trim()))
            let indexO = findSelectIndex(props.partitaSelezionata.squadraOspite, getSquadre(props.partitaSelezionata.campionato.trim()))
            let indexCam = findSelectIndex(props.partitaSelezionata.campionato.trim(), getCampionati(getAllLeagues()))
           
            setTimeout(function() {
                document.getElementById("squadraOspite").selectedIndex = indexO;
                document.getElementById("squadraCasa").selectedIndex = indexC;
                document.getElementById("campionato").selectedIndex = indexCam;
            }, 100);*/
        }
        

    },[props.partitaSelezionata]);


    useEffect(()=>{

        switch (props.statoDash){
            case 4 : 
                setdoubleAll(true)
                setshowSquadre(" hidden")
                setshowgoal("")
            break;
            case 6:
                setdoubleAll(true)
                setshowgoal(" hidden")
            break;
            case 2 : 
                setdropOrText(false)
                setdoubleAll(false)
                setshowSquadre(" hidden")
                setshowgoal("")
            break;
            default :
                setdropOrText(true) 
                setdoubleAll(false)
                setshowSquadre("")
                setshowgoal("")
            break;
        }
    },[props.statoDash]); 

    const handleCampionatoChange = (value) => {
        setsqCasaenabled(getSquadre(value.trim()))
        setsqOspiteenabled(getSquadre(value.trim()))
        document.getElementById("squadraCasa").selectedIndex = -1;
        document.getElementById("squadraOspite").selectedIndex = -1;
    };
    const emptytrigger = () => {
        
    };

   
    let drop = " hidden"
    let text = " hidden"
    if (dropOrText){
        drop = ""
    }else{
        text=""
    }

    return (
        <div className="h-full overflow-scroll pb-2">
            <div className="px-4 text-center">
                <div className="">
                    <div className={"rounded overflow-hidden p-4 "+showSquadre}>
                        <div className={"flex justify-center mb-2"+drop}>
                            <Dropdown id="campionato" label="Campionato" lista={getCampionati(getAllLeagues())} trigger={handleCampionatoChange}></Dropdown>
                        </div>
                        <div className={"flex justify-center mb-2"+drop}>
                            <Dropdown id="squadraCasa" label="Squadra casa" lista={sqCasaenabled} trigger={emptytrigger} ></Dropdown>
                        </div>
                        <div className={"flex justify-center mb-2"+drop}>
                            <Dropdown id="squadraOspite" label="Squadra ospite" lista={sqOspiteenabled} trigger={emptytrigger} ></Dropdown>
                        </div>
                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="campionatoX" label="Campionato"></InputText>
                        </div>
                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="squadraCasaX" label="Campionato"></InputText>
                        </div>
                        <div className={"flex justify-center mb-2"+text}>
                            <InputText id="squadraOspiteX" label="Campionato"></InputText>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="w-1/2">
                            <div className="flex justify-between mb-2 px-2">
                                <div className="w-3/5">
                                    <InputNumber doubleAllowed={doubleAllowed} id="quotaCasa" label="Casa" step="0.1" min="1"></InputNumber>
                                </div>
                                <div className="w-1/5">
                                    <Dropdown id="suGiuCasa" label="tend" lista={["S","G"]} trigger={emptytrigger} ></Dropdown>
                                </div>
                            </div>
                            <div className="flex justify-between mb-2 px-2">
                                <div className="w-3/5">
                                    <InputNumber doubleAllowed={doubleAllowed} id="quotaFuori" label="Fuori" step="0.1" min="1"></InputNumber>
                                </div>
                                <div className="w-1/5">
                                    <Dropdown id="suGiuFuori" label="tend" lista={["S","G"]} trigger={emptytrigger} ></Dropdown>
                                </div>
                            </div>
                        </div>
                        <div  className="w-1/2 px-2">
                            <div >
                                <div className="">
                                    <InputNumber doubleAllowed={doubleAllowed} id="quotaGol" label="GOL" step="0.1" min="1"></InputNumber>
                                </div>
                                <div className="w-2 h-1"></div>
                                <div className="">
                                    <InputNumber doubleAllowed={doubleAllowed} id="quotaNoGol" label="NOGOL" step="0.1" min="1"></InputNumber>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 px-2">
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaO15" label="OVE 1.5" step="0.1" min="1"></InputNumber>
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaU15" label="UND 1.5" step="0.1" min="1"></InputNumber>
                        </div>
                        <div className="w-1/2 px-2">
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaO25" label="OVE 2.5" step="0.1" min="1"></InputNumber>
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaU25" label="UND 2.5" step="0.1" min="1"></InputNumber>
                        </div>
                    </div>

                    <div className={"flex"+showgoal}>
                        <div className="w-1/2 px-2">
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaGolCasa" label="Gol casa" step="1" min="0"></InputNumber>
                        </div>
                        <div className="w-1/2 px-2">
                            <InputNumber doubleAllowed={doubleAllowed} id="quotaGolFuori" label="Gol ospiti" step="1" min="0"></InputNumber>  
                        </div>
                    </div>

                </div>
            </div>

 
        </div>
    );
}

export default Form;

//piazza resistenza numero 20 
