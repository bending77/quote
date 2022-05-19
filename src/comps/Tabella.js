import getImage from "../functs/getImage";
import getImageTeam from "../functs/getImageTeam";

function Tabella(props) {
    const handleRowClick = (e) => {
        props.explode(e.currentTarget.id)
      };
    



    let large = " hidden"
    let xLarge = " hidden"

    if (window.screen.width > 1024){
        large = ""
    }
    if (window.screen.width >= 1280){
        xLarge = ""
    }

    

 
    if (typeof props.lista === 'undefined'){
        
    }else{

        var counter = -1
        var lista = (props.lista).map((partita =>{
        counter = counter + 1;
            return (
                //stampa una riga
                <tr onClick={handleRowClick} id={"rig_"+counter} key={"rig_"+counter} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <td className="hidden px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-normal">
                        <div className="flex">
                            <img src={getImage(partita.campionato.trim())} alt={partita.campionato.trim()} width="30px" height="30px" className="mr-6"></img>
                            <div className="hidden">
                                {partita.campionato}
                            </div>
                        </div>
                    </td>
                    <td className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-normal">
                        <div className="flex justify-center">
                            <img src={getImageTeam(partita.squadraCasa)} alt={partita.squadraCasa}  className="w-5 h-5 lg:w-8 lg:h-8"></img>
                            <div className={" ml-2 "+large}>
                                {partita.squadraCasa}
                            </div>
                        </div>
                    </td>
                    <td className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-normal">
                    <div className="flex justify-center">
                        <img src={getImageTeam(partita.squadraOspite)} alt={partita.squadraOspite} className="w-5 h-5 lg:w-8 lg:h-8"></img>
                        <div className={" ml-2 "+large}>
                            {partita.squadraOspite}
                        </div>
                    </div>
                    </td>
                    <td className={"py-4 text-center "+large}>
                        {partita.casa}
                    </td>
                    <td className={"py-4 text-center "+large}>
                        {partita.suGiuCasa}
                    </td>
                    <td className={"py-4 text-center "+large}>
                        {partita.fuori}
                    </td>
                    <td className={"py-4 text-center "+large}>
                        {partita.suGiuFuori}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.gol}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.noGol}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.u15}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.o15}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.u25}
                    </td>
                    <td className={"py-4 text-center "+xLarge}>
                        {partita.o25}
                    </td>
                    <td className=" text-center  py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {partita.golCasa}
                    </td>
                    <td className="text-center  py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {partita.golOspite}
                    </td>
                </tr> 
            )
    }));
    }
    

    return (
        <div className="px-4 h-full overflow-y-scroll">
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead key={"idid"+counter} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="hidden px-2 py-2">
                                Campionato
                            </th>
                            <th scope="col" className="px-2 py-2 text-center lg:w-16">
                                Casa
                            </th>
                            <th scope="col" className="px-2 py-2 text-center lg:w-16">
                                Ospite
                            </th>

                            
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+large}>
                                CASA
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+large}>
                                SU / GIU CASA
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+large}>
                                FUORI
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+large}>
                                SU / GIU FUORI
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                GOL
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                NO GOL
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                UNDER 1.5
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                OVER 1.5
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                UNDER 2.5
                            </th>
                            <th scope="col" className={"px-2 py-2 text-center lg:w-8 "+xLarge}>
                                OVER 2.5
                            </th>
                            <th scope="col" className="px-2 py-2 text-center lg:w-8">
                                GOL CASA
                            </th>
                            <th scope="col" className="px-2 py-2 text-center lg:w-8">
                                GOL OSPITI
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tabella;


