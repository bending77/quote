import React from 'react';

function TabellaQuote(props) {
    




    

    
    if (typeof props.lista === 'undefined'){
        
    }else{
        var counter = -1
        var lista = (props.lista).map((riga =>{
        counter = counter + 1;
        
                return (
                    //stampa una riga
                    <tr id={"rig_"+counter} key={"rig_"+counter} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <td className="px-2 py-1 font-medium text-gray-900 dark:text-white whitespace-normal">
                            <div className="flex justify-center">
                                <div className="">
                                    {riga.quota.toFixed(2)}
                                    
                                </div>
                            </div>
                        </td>
                        <td className="px-2 py-1 font-medium text-gray-900 dark:text-white whitespace-normal">
                            <div className="flex justify-center ">
                                <div className={"lg:ml-4 ml-2"}>
                                    {Number.parseFloat(riga.importo)}
                                </div>
                            </div>
                        </td>
                    </tr> 
                )
           
    }));
    }
    

    return (
        <div className="h-full">
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead key={"idid"+counter} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-1 w-1/2 text-center py-1">
                                Quota
                            </th>
                            <th scope="col" className="px-1 w-1/2 py-1 text-center ">
                                Importo
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

export default TabellaQuote;


