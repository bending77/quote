function Dropdown(props) {

    function trigger(){
        props.trigger(document.querySelector('#'+props.id).value)
    }


    let counter = 0
    counter = 0
    var lista = (props.lista).map((campionato =>{
        counter = counter + 1;
    return (
        <option key={props.id+counter} className="text-center text-md">
            {campionato}
        </option>
    )
    }));

 
    

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <label className="lg:text-lg xl:text-xl block text-blue-400 text-md mb-2" htmlFor={props.id}>{props.label}</label>
            </div>
            <select onChange={trigger} id={props.id} name={props.id} className="lg:text-lg xl:text-xl text-md block appearance-none w-full bg-white border border-gray-500 hover:border-gray-500 px-1 py-1 pr-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value=""></option>
                {lista}
            </select>
        </div>
    );
    //Le option vanno stampate con un ciclo 
    //<option><img src={getImage("serieA")} alt="serieA" height="100px" width="100px"></img> Really long option that will likely overlap the chevron</option>
    
}
 
export default Dropdown;


