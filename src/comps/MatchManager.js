import React from 'react';
import { useState } from "react";
import InputText from './InputText';
import TeamEditor from './TeamEditor';




function MatchManager(props) {
    

    return (
        <div className="w-full h-screen text-center">
           <div className='w-full h-1/6 flex'>
                <div className='h-full w-1/5 bg-red-100'>

                </div>
                <div className='h-full w-1/5 bg-red-200'>

                </div>
                <div className='h-full w-1/5 bg-red-300'>

                </div>
                <div className='h-full w-1/5 bg-red-400'>

                </div>
                <div className='h-full w-1/5 bg-red-500'>

                </div>
           </div>
           <div className='w-full h-3/6 flex bg-gray-200'>


            </div>
           <div className='w-full h-1/6 flex'>
                <div className='h-full w-1/5 bg-green-100'>

                </div>
                <div className='h-full w-1/5 bg-green-200'>

                </div>
                <div className='h-full w-1/5 bg-green-300'>

                </div>
                <div className='h-full w-1/5 bg-green-400'>

                </div>
                <div className='h-full w-1/5 bg-green-500'>

                </div>
           </div>
           <div className='w-full h-1/6 flex bg-gray-200'>


           </div>
        </div>
    );
}

export default MatchManager;


