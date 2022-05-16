import Form from "./Form";
import Tabella from "./Tabella"
function Dashboard(props) {

    return (
        <div className="w-full h-full py-2 relative overflow-hidden">
            <div id="form" className="w-full h-3/6 overflow-y-scroll">
              <div>
                <Form partitaSelezionata={props.partitaSelezionata}></Form>
              </div>
            </div>
          
            <div className="h-3/6 overflow-y-scroll rounded-lg pt-2 pb-12">
              <Tabella lista={props.datiTabella} explode={props.explode}> </Tabella>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-12 py-1">
            <div className="flex justify-evenly">
                <button onClick={props.addPartita} disabled={props.aggiungiEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Aggiungi partita
                </button>
                <button onClick={props.removePartita} disabled={props.rimuoviEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Rimuovi partita
                </button>
                <button onClick={props.setPartita} disabled={props.modificaEnabled} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Salva le modifiche 
                </button>
                <button onClick={props.cleanForm} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Pulisci form
                </button>
              </div>
            </div>
          </div>
    );
}

export default Dashboard;
