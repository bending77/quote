import React from 'react';
import teams from './../data/Squadre.json';
import { useState } from "react";

function InputSearch(props) {

    const [listaChooser, setlistaChooser] = useState(['test','test']);
    

    // cerca i matching 
    const search = (text, toTrim) => {
        let dati = teams
        let prime = []
        let seconde = []
        for (let i = 0; i < dati.length; i++) {
            // controlla che la squadra nella lista inizi con la stringa inserita dall'utente
            if (toTrim){

                if (dati[i].toUpperCase().split(' ').join('') === text.toUpperCase().split(' ').join('')) {
                    //inserisci nel primo array
                    prime.push(dati[i])
                    /*console.log(dati[i].substring(0, text.length).toUpperCase())
                    console.log(dati[i].substring(0, text.length).toUpperCase().split(' '))
                    console.log(dati[i].substring(0, text.length).toUpperCase().split(' ').join(''))
                    console.log('---')
                    console.log(text.toUpperCase())
                    console.log(text.toUpperCase().split(' '))
                    console.log(text.toUpperCase().split(' ').join(''))*/
                }
            }else{
                if (dati[i].substring(0, text.length).toUpperCase() === text.toUpperCase()) {
                    //inserisci nel primo array
                    prime.push(dati[i])
                }
            }
           
        }
        return prime.concat(seconde)
    }



    const ricerca = (e) => {
        if (e.currentTarget.value === ''){
            //[azzera la lista]
            setlistaChooser([])
            //[nascondi il menu]
            document.querySelector('#teamChooser'+props.id).classList.add('hidden')
        }else{
            //[aggiorna la lista di ricerca]
            setlistaChooser(search(e.currentTarget.value),false)
            //[mostro la lista]
            document.querySelector('#teamChooser'+props.id).classList.remove('hidden')
              //[sposto la lista all'alteza giusta]
            let newPosition = document.querySelector('#'+props.id).getBoundingClientRect().top-16
            document.querySelector('#teamChooser'+props.id).style.marginTop = newPosition+'px'
            newPosition = document.querySelector('#'+props.id).getBoundingClientRect().left
            let width = document.querySelector('#'+props.id).getBoundingClientRect().right - document.querySelector('#'+props.id).getBoundingClientRect().left 
            document.querySelector('#teamChooser'+props.id).style.width = width+'px'  
        }
    };

    const chiudiLista = (e) => { 
        setTimeout(function() {
        if (document.querySelector('#'+props.id).value === ''){
            //do nothing
        }else{
                let foundTeams = search(document.querySelector('#'+props.id).value,true).length
                if (foundTeams === 1){
                //=== document.querySelector('#'+props.id).value.length){
                }else{
                    if (foundTeams === 0){
                        props.setToast('la squadra inserita non è presente nel db delle squadre')
                    }else{
                            console.log(document.querySelector('#'+props.id).value)
                            console.log(search(document.querySelector('#'+props.id).value,true))
                            
                            props.setToast('la squadra che hai inserito ha più di un riscontro nel db')
                        
                    }
                    props.showToast() 
                }           
            setlistaChooser([])
            //[nascondi il menu]
            document.querySelector('#teamChooser'+props.id).classList.add('hidden') 
        }
        }, 200);
    }

    const selectSquadra = (e) => {
        document.querySelector('#'+props.id).value = e.currentTarget.id.split('%')[1]
    }

    


    var counter = -1
    var chooserHtml = (listaChooser).map((hint =>{
        counter = counter + 1;
            return (
                <div key={"hint"+counter} className="w-full flex justify-center"  >
                    <div className='bg-white w-full border py-2 hover:bg-gray-200' id={'hint%'+hint} onClick={selectSquadra}>
                        {hint}
                    </div>
                </div>               
            )
    }));


    return (
        <div className="w-full ">
            <div className="flex justify-center">
                <label className="lg:text-lg xl:text-xl block text-blue-400 text-md mb-2" htmlFor={props.id}>{props.label}</label>
            </div>
            <div className="flex justify-center">
                <input autoComplete='off' onBlur={chiudiLista}  onChange={ricerca} type={"text"} id={props.id} name={props.id} className={"lg:text-lg xl:text-xl text-md border border-gray-500 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"}></input>

            </div>
            <div id={"teamChooser"+props.id} className="w-full absolute top-0 hidden max-h-80 overflow-y-scroll rounded-lg">
                <div className="">
                    {chooserHtml}
                </div>
            </div>
        </div>
    );
}


export default InputSearch;


