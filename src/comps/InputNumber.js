import React from 'react';
import { useState, useEffect } from "react";
function InputNumber(props) {


    const [stato, setStato] = useState(0);

    const openDouble = (e) => {
        if (stato === 0){
            document.querySelector('#'+props.id).value = ""
            document.querySelector('#'+props.id+"A").value = ""
            document.querySelector('#'+props.id+"B").value = ""
            setStato(1);
        }else{
            document.querySelector('#'+props.id).value = ""
            document.querySelector('#'+props.id+"A").value = ""
            document.querySelector('#'+props.id+"B").value = ""
            setStato(0);
        }
        
    };
    useEffect(()=>{
        if (props.doubleAllowed){
        }else{
            setStato(0);
        }
    },[props.doubleAllowed]);

    const setRealValue = (e) => {
        if (e.currentTarget.id === props.id+"A"){
            if (document.querySelector("#"+props.id).value === ""){
                document.querySelector("#"+props.id).value = e.currentTarget.value+"%"
            }else{
                let risultato = document.querySelector("#"+props.id).value.split("%")
                if (risultato.length < 2){
                    document.querySelector("#"+props.id).value = e.currentTarget.value+"%" 
                }else{
                    risultato[0] = e.currentTarget.value
                    document.querySelector("#"+props.id).value = risultato[0]+"%"+risultato[1]
                }
            }
        }else{
            if (document.querySelector("#"+props.id).value === ""){
                // non fare nulla
            }else{
                let risultato = document.querySelector("#"+props.id).value.split("%")
                if (risultato.length < 2){
                    document.querySelector("#"+props.id).value = risultato[0]+"%"+e.currentTarget.value
                }else{
                    risultato[1] = e.currentTarget.value
                    document.querySelector("#"+props.id).value = risultato[0]+"%"+risultato[1]
                }
            }
        } 
    };

    function trigger(){
        props.trigger(document.querySelector('#'+props.id).value+'%'+props.id)
    }

    

    let original = " hidden"
    let double = " hidden"
    let inputType = "number"
    if (stato === 0){
        original = ""
    }else{
        double = ""
        inputType = "text"
    }

    let tastoDouble = " hidden"
    if(props.doubleAllowed){
        tastoDouble = ""
    }

    let blocked = false
    if (props.bloccato){
        blocked = true
    }

    return (
        <div className="w-full ">
            <div className="flex justify-center">
                <label className="block text-blue-400 lg:text-lg xl:text-xl text-md mb-2" htmlFor={props.id}>{props.label}</label>
                <div id={"campo$"+props.id} className={"ml-2"+ tastoDouble} onClick={openDouble}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </div>
            </div>
            <div className="flex justify-center">
                <input readOnly={blocked} onChange={trigger} autoComplete='off' type={inputType} min={props.min} step={props.step} id={props.id} name={props.id} className={"lg:text-lg xl:text-xl border border-gray-500 text-xs shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"+original}></input>

                <input autoComplete='off' onChange={setRealValue} type="number" min={props.min} step={props.step} id={props.id+"A"} name={props.id} className={"lg:text-lg xl:text-xl border border-gray-500 px-2 mr-2 text-xs shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"+double}></input>
                <input autoComplete='off' onChange={setRealValue} type="number" min={props.min} step={props.step} id={props.id+"B"} name={props.id} className={"lg:text-lg xl:text-xl border border-gray-500 px-2 text-xs shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"+double}></input>
            </div>
        </div>
    );
}


export default InputNumber;


