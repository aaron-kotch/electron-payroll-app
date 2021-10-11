import React, { useState } from 'react'
import './Payroll.css'
import PayrollSheet from './PayrollSheet'
import { IoChevronDownOutline } from 'react-icons/io5'

export default function Payroll({list}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="tile-canvas" id={isExpanded ? "tile-collapsed" : "tile-expanded"}>
            <div className="tile">

                <p id="name">
                    {list.name} 
                </p>

                <p id="gross">
                    RM {parseFloat(list.gross_salary).toFixed(2).toLocaleString()} 
                </p>

                <p id="deduction"> 
                    RM {parseFloat(list.total_deduction).toFixed(2).toLocaleString()} 
                </p>

                <div id="net-wrapper">
                    <p id="net">
                        RM {parseFloat(list.net_salary).toFixed(2).toLocaleString()}
                    </p>



                    <span className="close-icon-button" onClick={() => {
                            setIsExpanded(!isExpanded);
                            console.log(isExpanded)
                        }}>
                        <IoChevronDownOutline id={isExpanded === true ? "close-icon-active" : "close-icon-inactive"}/>
                    </span>
                </div>

            </div>

            {isExpanded && <PayrollSheet listItem={list}/>}
        </div>
    )
}
