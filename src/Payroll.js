import React, { useState } from 'react'
import './Payroll.css'
import PayrollSheet from './PayrollSheet'
import { IoChevronDownOutline } from 'react-icons/io5'

export default function Payroll({list, index}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="tile-canvas" id={isExpanded ? "tile-collapsed" : "tile-expanded"}>
            <div className="tile">

                <div className="index-wrapper">
                    <div className="index-circle">
                        <p id="id">
                            {index + 1} 
                        </p>
                    </div>
                </div>

                <div id="name-wrapper">
                    <p id="name">
                        {list.name} 
                    </p>
                    <p id="position">
                        Position
                    </p>
                </div>

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
