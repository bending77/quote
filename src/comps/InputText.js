function InputText(props) {

    return (
        <div className="w-full ">
            <div className="flex justify-center">
                <label className="block text-blue-500 text-md mb-2" htmlFor={props.id}>{props.label}</label>
            </div>
            <div className="flex justify-center">
                <input readOnly type={"text"} id={props.id} name={props.id} className={"text-xs shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"}></input>

            </div>
        </div>
    );
}


export default InputText;


