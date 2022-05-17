import { useState, useEffect } from "react";
import getAllLeagues from "../functs/mayorLeagues";
import getCampionati from "../functs/getCampionati";
import getSquadre from "../functs/getSquadre";
import Dropdown from "./Dropdown";
import InputNumber from "./InputNumber";

function Form(props) {
    const [sqCasaenabled, setsqCasaenabled] = useState([]);
    const [sqOspiteenabled, setsqOspiteenabled] = useState([]);

    const [doubleAllowed, setdoubleAll] = useState(false);

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
            
            let indexC = findSelectIndex(props.partitaSelezionata.squadraCasa, getSquadre(props.partitaSelezionata.campionato.trim()))
            let indexO = findSelectIndex(props.partitaSelezionata.squadraOspite, getSquadre(props.partitaSelezionata.campionato.trim()))
            let indexCam = findSelectIndex(props.partitaSelezionata.campionato.trim(), getCampionati(getAllLeagues()))
            let indexSGC = findSelectIndex(props.partitaSelezionata.suGiuCasa, ["S","G"])
            let indexSGF = findSelectIndex(props.partitaSelezionata.suGiuFuori, ["S","G"])
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
            setTimeout(function() {
                document.getElementById("squadraOspite").selectedIndex = indexO;
                document.getElementById("squadraCasa").selectedIndex = indexC;
                document.getElementById("campionato").selectedIndex = indexCam;
                document.getElementById("suGiuCasa").selectedIndex = indexSGC;
                document.getElementById("suGiuFuori").selectedIndex = indexSGF;
            }, 100);
        }
        

    },[props.partitaSelezionata]);


    useEffect(()=>{
        if (props.statoDash === 4){
            setdoubleAll(true)
        }else{
            setdoubleAll(false)
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

   

    return (
        <div>
            <div className="px-4 text-center">
                <p className="text-blue-500 text-4xl">{props.title}</p>
                <div className="">
                    <div className="rounded overflow-hidden p-4">
                        <div className="flex justify-center mb-2">
                            <Dropdown id="campionato" label="Campionato" lista={getCampionati(getAllLeagues())} trigger={handleCampionatoChange}></Dropdown>
                        </div>
                        <div className="flex justify-center mb-2">
                            <Dropdown id="squadraCasa" label="Squadra casa" lista={sqCasaenabled} trigger={emptytrigger} ></Dropdown>
                        </div>
                        <div className="flex justify-center mb-2">
                        <   Dropdown id="squadraOspite" label="Squadra ospite" lista={sqOspiteenabled} trigger={emptytrigger} ></Dropdown>
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

                    <div className="flex">
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
