import React from 'react';
function OutputStats(props) {

    const getStatsHTML = (counter) => {
        var gruppi
        let count = -1
        if (counter === -1){
            gruppi = (props.statistiche.maxs).map((statistica =>{
                count = count + 1
                return (
                    <div key={'statistiche'+counter+''+count} className="">
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
                count = count + 1
                //console.log('idtext'+chiave)
                return( 
                    <div className="" key={'statistiche'+counter+''+count}>
                        <div  className="flex items-center justify-between text-gray-400 text-sm">
                            <p>
                                {props.statistiche.statGroups[counter].stats[chiave].label}
                            </p>
                            <p >
                                {props.statistiche.statGroups[counter].stats[chiave].valore+"/"+props.statistiche.partiteTrovate+" - "+props.statistiche.statGroups[counter].stats[chiave].percentuale+"%"}
                            </p>
                            <div id={'idcontainer'+chiave} className='flex items-center hidden'>
                                <div id={'idcolor'+chiave} className='h-3 w-3 rounded-full mr-2'></div>
                                 <p id={'idtext'+chiave}></p> 
                            </div>
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
            <div key={"gruppoStat"+counter} className="w-full flex justify-center mt-4 lg:h-80">
                <div className="shadow-lg rounded-xl w-60 p-4 bg-white text-gray-700 relative overflow-hidden lg:overflow-y-scroll">
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
        <div className="lg:flex">
            <div className="w-full flex justify-center ">
                <div className="lg:mt-4 lg:h-80 shadow-lg rounded-xl w-60 p-4 bg-white text-gray-700 relative overflow-hidden lg:overflow-y-scroll">
                    <div className="w-full text-center ">
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


