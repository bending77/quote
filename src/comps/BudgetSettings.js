import React from 'react';
import InputNumber from "./InputNumber";

function BudgetSettings(props) {





    
    
    return (
        <div className="w-full text-center h-full pt-14">
            <div className="w-full px-6">
                <InputNumber doubleAllowed={false} id="budget_mensile" label="Budget mensile" step="0.1" min="1"></InputNumber> 
                <InputNumber doubleAllowed={false} id="percentuale" label="Percentuale singola giocata" step="0.1" min="1"></InputNumber>    
                <InputNumber doubleAllowed={false} id="data" label="Giorno di chiusura mese" step="0.1" min="1"></InputNumber>                      
            </div>
        </div>
    );
}

export default BudgetSettings;


