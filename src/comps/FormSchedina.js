import getImageTeam from "../functs/getImageTeam";
import statdata from './../data/Stats';

function FormSchedina(props) {

    const cercaPartite = (partita) => {
        let partite = props.cercaPartiteSchedina(partita);
        let statJSON = JSON.parse(JSON.stringify(statdata));
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
        //risultati.topStat = maxStat
        return(risultati)
    }

    const getStatsHTML = (risultati) => {
        var gruppi
        if (risultati.partiteTrovate > 0){
            let count = -1
            gruppi = (risultati.maxs).map((statistica =>{
                count = count + 1
                return (
                    <div key={"grafico"+count+' '+risultati.partiteTrovate} className="">
                        <div className="flex items-center justify-between text-gray-400 text-sm">
                            <p>
                                {statistica.label}
                            </p>
                            <p>
                                {statistica.valore+"/"+risultati.partiteTrovate+" - "+statistica.percentuale+"%"}
                            </p>
                        </div>
                        <div className="w-full h-2 bg-red-200 rounded-full mb-4">
                            <div className={"h-full text-center text-xs text-white bg-red-500 rounded-full"} style={{width : statistica.percentuale+"%"}}>
                            </div>
                        </div>
                    </div>
                )
            }))
        }else{
            return(
                <div className="w-full text-center mt-4">
                    <p>Nessuna partita trovata</p>
                </div>
            )
        }
    return gruppi
    }

    // per ogni partita presente nelle props bisogna stampare una card 

    //le immagini dei due teams

    //le statistiche (solo top matches)
    let counter = -1
    let cardPartite = (props.partiteInSchedina).map((partita =>{
        let risultati = cercaPartite(partita)
       // calcola le statistiche
        counter = counter + 1
        return( 
            <div key={"partitaSchedina"+counter} className="w-full flex justify-center mt-4">
                <div className="shadow-lg rounded-xl w-60 p-4 bg-white text-gray-700 relative overflow-hidden">
                    <div className="w-full flex justify-center">
                        <img src={getImageTeam(partita.squadraCasa)} alt={partita.squadraCasa} width="20px" height="20px" className="mr-4"></img>
                        <img src={getImageTeam(partita.squadraOspite)} alt={partita.squadraOspite} width="20px" height="20px" className=""></img>
                    </div>
                    {getStatsHTML(risultati)}
                </div>
            </div> 
        )
    }));


    

    

    return (
        <div className="h-full w-full">
           {cardPartite}
        </div>
    );
}


export default FormSchedina;


