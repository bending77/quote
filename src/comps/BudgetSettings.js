import React from 'react';
import InputNumber from "./InputNumber";
import {useEffect } from "react";

function BudgetSettings(props) {

    const trigger = (caller) => {
        caller = caller.split('%')
        let valore = caller[0];
        let chiamante = caller[1];
        let nuoviSettings
        if (chiamante === 'budget_step'){
            nuoviSettings = {budget_step : parseFloat(valore), percentuale : parseFloat(props.budgetSettings.percentuale)}
        }else{
            nuoviSettings = {budget_step : parseFloat(props.budgetSettings.budget_step), percentuale : parseFloat(valore)} 
        }
        props.setbudgetSettings(nuoviSettings)
    };


    // budget target guadagno percentuale target importo
    useEffect(()=>{
        if (props.budgetSettings.budget_step !== "empty"){
            document.querySelector('#budget_step').value = props.budgetSettings.budget_step
            document.querySelector('#percentuale').value = props.budgetSettings.percentuale

        }
    },[props.budgetSettings]); 

    
    
    return (
        <div className="w-full text-center h-full pt-14">
            <div className="w-full px-6">
                <InputNumber trigger={trigger} doubleAllowed={false} id="budget_step" label="Budget step" step="0.1" min="1"></InputNumber> 
                <InputNumber trigger={trigger} doubleAllowed={false} id="percentuale" label="Target percentuale" step="0.1" min="1"></InputNumber>    
            </div>
        </div>
    );
}

export default BudgetSettings;


