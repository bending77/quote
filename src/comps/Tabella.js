import getImage from "../functs/getImage";
import getImageTeam from "../functs/getImageTeam";

function Tabella(props) {
    const handleRowClick = (e) => {
        props.explode(e.currentTarget.id)
      };
 
    if (typeof props.lista === 'undefined'){
        
    }else{

        var counter = -1
        var lista = (props.lista).map((partita =>{
        counter = counter + 1;
            return (
                //stampa una riga
                <tr onClick={handleRowClick} id={"rig_"+counter} key={"rig_"+counter} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <th scope="row" className="hidden px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className="flex">
                            <img src={getImage(partita.campionato.trim())} alt={partita.campionato.trim()} width="30px" height="30px" className="mr-6"></img>
                            {partita.campionato}
                        </div>
                    </th>
                    <th className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className="flex justify-center">
                        <img src={getImageTeam(partita.squadraCasa)} alt={partita.squadraCasa} width="20px" height="20px" className=""></img>
                        <div className="hidden">
                            {partita.squadraCasa}
                        </div>
                    </div>
                    </th>
                    <th className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div className="flex justify-center">
                        <img src={getImageTeam(partita.squadraOspite)} alt={partita.squadraOspite} width="20px" height="20px" className=""></img>
                        <div className="hidden">
                            {partita.squadraOspite}
                        </div>
                    </div>
                    </th>
                    <td className="hidden px-6 py-4 text-center">
                        {partita.casa}
                    </td>
                    <td className="hidden px-6 py-4 text-center">
                        {partita.suGiuCasa}
                    </td>
                    <td className="hidden px-6 py-4 text-center">
                        {partita.fuori}
                    </td>
                    <td className="hidden px-6 py-4 text-center">
                        {partita.suGiuFuori}
                    </td>
                    <th scope="row" className=" text-center px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {partita.golCasa}
                    </th>
                    <th scope="row" className="text-center px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {partita.golOspite}
                    </th>
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
                        <th scope="col" className="px-2 py-2 text-center">
                            Casa
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            Ospite
                        </th>
                        <th scope="col" className="hidden px-2 py-2">
                            CASA
                        </th>
                        <th scope="col" className="hidden px-2 py-2">
                            SU / GIU CASA
                        </th>
                        <th scope="col" className="hidden px-2 py-2">
                            FUORI
                        </th>
                        <th scope="col" className="hidden px-2 py-2">
                            SU / GIU FUORI
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
                            GOL CASA
                        </th>
                        <th scope="col" className="px-2 py-2 text-center">
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


