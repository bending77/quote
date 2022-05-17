
function OutputStats(props) {

    const getStatsHTML = (counter) => {
        var gruppi
        if (counter === -1){
            gruppi = (props.statistiche.maxs).map((statistica =>{
                return (
                    <div className="">
                        <div className="flex items-center justify-between text-gray-400 text-sm">
                            <p>
                                {statistica.label}
                            </p>
                            <p>
                                {statistica.valore+"/"+props.statistiche.partiteTrovate+" - "+statistica.percentuale+"%"}
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
            gruppi = (props.statistiche.statGroups[counter].list).map((chiave =>{
                let color = " bg-blue-200"
                let darkColor = " bg-blue-500"

                if (props.statistiche.maxs.indexOf(props.statistiche.statGroups[counter].stats[chiave]) !== -1){
                    color = " bg-red-200"
                    darkColor = " bg-red-500" 
                }
                return( 
                    <div className="">
                        <div className="flex items-center justify-between text-gray-400 text-sm">
                            <p>
                                {props.statistiche.statGroups[counter].stats[chiave].label}
                            </p>
                            <p>
                                {props.statistiche.statGroups[counter].stats[chiave].valore+"/"+props.statistiche.partiteTrovate+" - "+props.statistiche.statGroups[counter].stats[chiave].percentuale+"%"}
                            </p>
                        </div>
                        <div className={"w-full h-2 rounded-full mb-4"+color}>
                            <div className={"h-full text-center text-xs text-white rounded-full"+darkColor} style={{width : props.statistiche.statGroups[counter].stats[chiave].percentuale+"%"}}>
                            </div>
                        </div>
                    </div>
                )
            }));
        }
        return gruppi
    }
    var counter = -1
    var gruppi = (props.statistiche.statGroups).map((gruppo =>{
        counter = counter + 1;
        return (
            <div className="w-full flex justify-center mt-4">
                <div className="shadow-lg rounded-xl w-60 p-4 bg-white text-gray-700 relative overflow-hidden">
                    <div className="w-full text-center">
                        <p className="text-gray-700 dark:text-white  text-2xl font-light mb-4">
                            {gruppo.title}
                        </p>
                        {getStatsHTML(counter)}
                    </div>
                </div>
            </div>               
            )
    }));


    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="shadow-lg rounded-xl w-60 p-4 bg-white text-gray-700 relative overflow-hidden">
                    <div className="w-full text-center">
                        <p className="text-gray-700 dark:text-white  text-2xl font-light mb-4">
                            Top matchings
                        </p>
                        {getStatsHTML(-1)}
                    </div>
                </div>
            </div>
            {gruppi}
        </div>
    );
}

export default OutputStats;

