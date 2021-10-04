import React, { useState } from 'react'
import './Payroll.css'
import PayrollSheet from './PayrollSheet'

export default function Payroll({listItem}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="tile-canvas">
            <div className="tile">

                <p id="name">
                    {listItem.name} 
                </p>

                <p id="gross">
                    RM {parseFloat(listItem.gross_salary).toFixed(2).toLocaleString()} 
                </p>

                <p id="deduction"> 
                    RM {parseFloat(listItem.total_deduction).toFixed(2).toLocaleString()} 
                </p>

                <div id="net-wrapper">
                    <p id="net">
                        RM {parseFloat(listItem.net_salary).toFixed(2).toLocaleString()}
                    </p>

                    <span className="close-icon-back" onClick={() => setIsExpanded(!isExpanded)}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>
                </div>

            </div>

            {isExpanded && <PayrollSheet listItem={listItem}/>}
        </div>
    )
}
