import React, { useRef } from "react";
import './App.css'

export default function Popup({handleList, handleClose}) {

    const nameRef = useRef();
    const salaryRef = useRef();
    const allowanceRef = useRef();

    function done() {
        handleList(nameRef.current.value, salaryRef.current.value, allowanceRef.current.value);
        handleClose();
    }

    return (
        <div className="popup-box">
          <div className="box">
            
            <div className="popup-header">
                <h5 className="popup-title">Add Item</h5>
                <span className="close-icon" onClick={handleClose}>
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>
            
            <h6 className="input-title">Name</h6>
            <input ref={nameRef} placeholder="John Doe" type="text" id="name-input" className="popup-input" />
    
            <div className="popup-row">
                
                <div className="popup-column"  id="salary-column">
                    <h6 className="input-title">Basic Salary</h6>
                    <input ref={salaryRef} placeholder="0.00" type="text" id="salary-input" className="popup-input" />
                </div>
    
                <div className="popup-column">
                    <h6 className="input-title">Allowance</h6>
                    <input ref={allowanceRef} placeholder="0.00" type="text" id="salary-input" className="popup-input" />
                </div>
            </div>

            <button className="popup-button" onClick={() => done()}>
                Confirm
            </button>
          </div>
        </div>
    )
}