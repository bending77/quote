import statdata from './../data/Squadre.json';
import setFormat from '../functs/setFormat';
import SasaList from './../data/SquadreConImmagine.json'

function ImportSettings(props) {


    const test = (e) => {
        // ottieni tutte le squadre presenti nel db 
        let matchInDb = []
        for (let i = 0; i<props.fileLetto.length; i++){
            let squadraCasa = setFormat(props.fileLetto[i].squadraCasa)
            let squadraOspite = setFormat(props.fileLetto[i].squadraOspite)
            if (matchInDb.indexOf(squadraCasa) === -1){
                matchInDb.push(setFormat(props.fileLetto[i].squadraCasa))
            }
            if (matchInDb.indexOf(squadraOspite) === -1){
                matchInDb.push(setFormat(props.fileLetto[i].squadraOspite))
            }
        }
        
        //ottieni tutte le squadre presenti nel JSON 
        let matchInJson = statdata

        //ottieni le squadre che sono nel db ma non nel Json
        let machInDbNoJson = []
        for (let j = 0; j<matchInDb.length; j++){
            let squadraAttuale = matchInDb[j]
            if (matchInJson.indexOf(squadraAttuale) === -1){
                if (machInDbNoJson.indexOf(squadraAttuale) === -1){
                    machInDbNoJson.push(squadraAttuale)
                }
            }
        }

        // ottieni le squadre che sonno nel json ma non nel db
        let matchInJsonNoDb = []
        for (let k = 0; k<matchInJson.length; k++){
            let squadraAttuale = matchInJson[k]
            if (matchInDb.indexOf(squadraAttuale) === -1){
                if (matchInJsonNoDb.indexOf(squadraAttuale) === -1){
                    matchInJsonNoDb.push(squadraAttuale)
                }
            }
        }

        let matchinBoth = []
        for (let i = 0; i<matchInDb.length; i++){
            let squadraAttuale = setFormat(matchInDb[i])
            if (matchInJson.indexOf(squadraAttuale) > -1){
                if (matchinBoth.indexOf(squadraAttuale) === -1){
                    matchinBoth.push(squadraAttuale)
                }
            }
        }

        // ottieni la lista di sasa  e setta il formato
        let newList = SasaList
        for (let i = 0; i<newList.length; i++){
            newList[i] = setFormat(newList[i])
        }
        
        // ottieni la lista di squadre in sasà e in Json
        let matchinSasaEJson = []
        for (let i = 0; i<newList.length; i++){
            let squadraAttuale = newList[i]
            if (matchInJson.indexOf(squadraAttuale) > -1){
                if (matchinSasaEJson.indexOf(squadraAttuale) === -1){
                    matchinSasaEJson.push(squadraAttuale)
                }
            }
        }

        let matchinSasaEDb = []
        for (let i = 0; i<newList.length; i++){
            let squadraAttuale = newList[i]
            if (matchInDb.indexOf(squadraAttuale) > -1){
                if (matchinSasaEDb.indexOf(squadraAttuale) === -1){
                    matchinSasaEDb.push(squadraAttuale)
                }
            }
        }

        let matchinSasaNoJsonNoDb = []
        for (let i = 0; i<newList.length; i++){
            let squadraAttuale = newList[i]
            if (matchInDb.indexOf(squadraAttuale) === -1 && matchInJson.indexOf(squadraAttuale) === -1 ){
                if (matchinSasaNoJsonNoDb.indexOf(squadraAttuale) === -1){
                    matchinSasaNoJsonNoDb.push(squadraAttuale)
                }
            }
        }

        let nuovaListaSasa = []
        for (let i = 0; i<newList.length; i++){
            let squadraAttuale = newList[i]
            if (matchinSasaEJson.indexOf(squadraAttuale) === -1 ){
                if (nuovaListaSasa.indexOf(squadraAttuale) === -1){
                    nuovaListaSasa.push(squadraAttuale)
                }
            }
        }

        let nuovaLista = []
        for (let i = 0; i<matchInJson.length; i++){
            let squadraAttuale = setFormat(matchInJson[i])
            if (nuovaLista.indexOf(squadraAttuale) === -1){
                nuovaLista.push(setFormat(squadraAttuale))
            }
        }
        for (let i = 0; i<newList.length; i++){
            let squadraAttuale = setFormat(newList[i])
            if (nuovaLista.indexOf(squadraAttuale) === -1){
                nuovaLista.push(setFormat(squadraAttuale))
            }
        }
        

        // controllo 1 ---- rimuovere tutto ciò che ho già nel JSON 
        // controllo 2 ---- controllare che il db sia tutto coperto con la lista di sasa 
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nel db')
        console.log(matchInDb)
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nel JSON')
        console.log(matchInJson)
        console.log('------------------------------------------------------------------------------')
        console.log('squadre in entrambi')
        console.log(matchinBoth)
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nel db che non ho nel JSON (da aggiungere)')
        console.log(machInDbNoJson)
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nel JSON che non ho nel db (aggiunte inutilmente)')
        console.log(matchInJsonNoDb) 
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nella lista di sasà')
        console.log(newList) 
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nella lista di sasà che ho già nel JSON  (da rimuovere dalla lista di sasà')
        console.log(matchinSasaEJson) 
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nella lista di sasà che ho già nel DB  (da aggiungere al JSON')
        console.log(matchinSasaEDb)
        console.log('------------------------------------------------------------------------------')
        console.log('squadre nella lista di sasà che non ho nel db ne nel JSON')
        console.log(matchinSasaNoJsonNoDb)

        switch (e.currentTarget.id){
            case "1" : 
                document.querySelector('#risultati').value = matchInDb.join("\r")
            break;
            case "2" : 
                document.querySelector('#risultati').value = matchInJson.join("\r")
            break;
            case "3" : 
                document.querySelector('#risultati').value = newList.join("\r")
            break;
            case "4" : 
                document.querySelector('#risultati').value = matchinBoth.join("\r")
            break;
            case "5" : 
                document.querySelector('#risultati').value = machInDbNoJson.join("\r")
            break;
            case "6" : 
                document.querySelector('#risultati').value = matchInJsonNoDb.join("\r")
            break;
            case "7" : 
                document.querySelector('#risultati').value = matchinSasaEJson.join("\r")
            break;
            case "8" : 
                document.querySelector('#risultati').value = matchinSasaEDb.join("\r")
            break;
            case "9" : 
                document.querySelector('#risultati').value = nuovaLista.join("\r")
            break;
            default : 

            break;
        }


    //elimino dalla lista di sasà le partite che ho già nel JSON 
        //con lista 
        //con controllo manuale  ---> partite in JSON, partite in Sasà 
    
    //verifico la copertura del db da parte della lista di sasà 
        //con lista 
        //con controllo manuale
    
    // ottengo le partite del db ancora scoperte 



        
        

    }
    



    
    
    return (
        <div className="w-full text-center h-full">
            <div className='h-1/3 overflow-y-scroll'>
                <button id="1" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni tutte le squadre nel db</button>
                <button id="2" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni tutte le squadre nel JSON</button>
                <button id="3" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni tutte le squadre nella lista di Sasà</button>
                <button id="4" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni le squadre sia nel db che nel JSON</button>
                <button id="5" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni le squadre nel db NON presenti nel JSON</button>
                <button id="6" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni le squadre nel JSON NON presenti nel db</button>
                <button id="7" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni le squadre sia nella lista di sasà che nel JSON</button>
                <button id="8" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni le squadre sia nella lista di sasà che nel db</button>
                <button id="9" className='bg-blue-500 w-full h-12 mb-4' onClick={test}>ottieni nuova lista di sasà</button>
            </div>
            <div className='w-full h-1/2 p-2'>
                <textarea id="risultati" className='w-full h-full'>

                </textarea>
            </div>
        </div>
    );
}

export default ImportSettings;


