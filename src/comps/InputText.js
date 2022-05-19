function InputText(props) {

    return (
        <div className="w-full ">
            <div className="flex justify-center">
                <label className="lg:text-lg xl:text-xl block text-blue-500 text-md mb-2" htmlFor={props.id}>{props.label}</label>
            </div>
            <div className="flex justify-center">
                <input readOnly type={"text"} id={props.id} name={props.id} className={"lg:text-lg xl:text-xl text-xs border border-gray-500 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"}></input>

            </div>
        </div>
    );
}


export default InputText;


