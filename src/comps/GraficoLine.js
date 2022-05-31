import React from 'react';
import {useEffect } from "react";

function GraficoLine(props) {


    useEffect(()=>{
        // da prendere nelle props
        let step = props.step;
        let valori = props.valori;
        if (props.statoGestore === 1){
            //tiro 3 righe ai quarti
            let quartoGrafico =  130/4
            let quartoCash =  Math.trunc((step[1]-step[0])/4)

            let passo = 130/(step[1]-step[0])
            for (let i = 0 ; i<valori.length ; i++){
                let valAtt = Math.trunc(valori[i]*passo)
                if (valAtt > 130){
                    valAtt = 130
                }
                valori[i] = valAtt
            }
            var canvas = document.getElementById(props.id);


            if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
                ctx.font = '8px';
                ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                ctx.fillRect(0, 0, 300, 200)
                ctx.beginPath();
                // assi
                ctx.moveTo(10, 140);
                //ctx.lineTo(10, 140);
                ctx.lineTo(298, 140);
                //ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
                ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                //linee quarti
                ctx.beginPath();
                ctx.moveTo(10, 140-quartoGrafico);
                ctx.lineTo(298, 140-quartoGrafico);
                ctx.fillText(quartoCash, 0, 140-quartoGrafico);
                ctx.moveTo(10, 140-(2*quartoGrafico));
                ctx.lineTo(298, 140-(2*quartoGrafico));
                ctx.fillText(2*quartoCash, 0, 140-(2*quartoGrafico));
                ctx.moveTo(10, 140-(3*quartoGrafico));
                ctx.lineTo(298, 140-(3*quartoGrafico));
                ctx.fillText(3*quartoCash, 0, 140-(3*quartoGrafico));
                ctx.fillText(4*quartoCash, 0, 140-(4*quartoGrafico));
                //ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.stroke();

                //linee mesi
                ctx.beginPath();
                ctx.fillText(props.mesi[0], 0, 150);
                ctx.moveTo(34, 140);
                ctx.lineTo(34, 10);
                ctx.moveTo(58, 140);
                ctx.lineTo(58, 10);
                ctx.moveTo(82, 140);
                ctx.lineTo(82, 10);
                ctx.moveTo(106, 140);
                ctx.lineTo(106, 10);
                ctx.moveTo(130, 140);
                ctx.lineTo(130, 10);
                ctx.moveTo(154, 140);
                ctx.lineTo(154, 10);
                ctx.moveTo(178, 140);
                ctx.lineTo(178, 10);
                ctx.moveTo(202, 140);
                ctx.lineTo(202, 10);
                ctx.moveTo(226, 140);
                ctx.lineTo(226, 10);
                ctx.moveTo(250, 140);
                ctx.lineTo(250, 10);
                ctx.moveTo(274, 140);
                ctx.lineTo(274, 10);
                ctx.stroke();
                //grafico 
                ctx.beginPath();
                let startColumn = 10
                ctx.strokeStyle = props.colore;
                //ctx.arc(startColumn, 140-valori[0], 3, 0, Math.PI * 2, true);
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.moveTo(startColumn, 140-valori[0]);
                for (let i = 1 ; i<valori.length ; i++){
                    startColumn=startColumn+24
                    ctx.lineTo(startColumn, 140-valori[i]);
                    //ctx.arc(startColumn, 140-valori[i], 3, 0, Math.PI * 2, true);
                    
                }
                ctx.fillText(props.mesi[1], startColumn-10, 150);
                ctx.stroke();
                


                
            } else {
            // canvas-unsupported code here
            }
        }
    },[props.statoGestore]); 

        
        
   
    return (
        <div className='shadow-lg rounded-xl p-4 bg-gray-800  text-gray-700'>
            <div className='w-full text-white text-center text-lg mb-2'>
                {props.label}
            </div>
            <canvas id={props.id} className='w-full '></canvas>
        </div>
    );
}

export default GraficoLine;
