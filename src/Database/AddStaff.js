import React, { useRef, useEffect, useState } from "react";
import './AddStaff.css'
import { IoClose, IoAlert, IoCheckmark } from 'react-icons/io5'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { getFirestore, getDocs, doc, addDoc, setDoc, collection, query, where } from 'firebase/firestore'

const AddStaff = ({ isOpen }) => {

    const node = useRef()
    const nameRef = useRef()
    const icRef = useRef()
    const religionRef = useRef()
    const posRef = useRef()
    const bankRef = useRef()
    const epfRef = useRef()
    const socsoRef = useRef()
    const eisRef = useRef()
    const taxRef = useRef()
    const [isAlert, setIsAlert] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const dismiss = e => {
        if (node.current.contains(e.target)) {
            return;
        }

        isOpen(false)
    }

    const db = getFirestore()

    const handleAddStaff = async () => {

        var exist = false

        const staffDetails = {
            name: nameRef.current.value,
            id: icRef.current.value,
            religion: religionRef.current.value,
            position: posRef.current.value,
            'bank-no': bankRef.current.value,
            'epf-no': epfRef.current.value,
            'socso-no': socsoRef.current.value,
            'eis-no': eisRef.current.value,
            'income-tax-no': taxRef.current.value
        }

        const checkExisting = new Promise(async(resolve, reject) => {
            const staffRef = collection(db, "staffs")
            const q = query(staffRef, where("id", "==", staffDetails.id))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                exist = true
            })
            resolve()
        })

        checkExisting.then(() => {
            if (exist) {
                setIsAlert(true)
            } else {
                setIsSuccess(true)
                setDoc(doc(db, "staffs", staffDetails.id), staffDetails)
            }
        })        

    }

    const handleDoneAdd = () => {
        setIsSuccess(false)
        isOpen(false)
    }

    useEffect(() => {

        if (isOpen) {
            document.addEventListener("mousedown", dismiss)
        } else {
            document.removeEventListener("mousedown", dismiss)
        }
        
        return () => {
            document.removeEventListener("mousedown", dismiss)
        }
    }, [isOpen])

    return <div className="add-staff-wrapper">

        <div className="add-staff-box" ref={node}>


            {isAlert && 
                <div className="alert-box">
                    <div className="alert-icon-wrapper">
                        <IoAlert />
                    </div>
                    <div className="alert-column">
                            <h3>Record Exists</h3>
                            <p>This user already exist in the database. Please try again.</p>
                            <div className="ok-button" onMouseUp={() => setIsAlert(false)}>
                                <h4>OK</h4>
                            </div>
                        </div>
                </div>
            }

            {isSuccess && 
                <div className="alert-box">
                    <div className="alert-icon-wrapper" id="success-icon">
                        <IoCheckmark />
                    </div>
                    <div className="alert-column">
                            <h3>Success</h3>
                            <p>Data has been added successfully</p>
                            <div className="ok-button" onMouseUp={handleDoneAdd}>
                                <h4>OK</h4>
                            </div>
                        </div>
                </div>
            }

            <div className="add-close-icon-wrapper">
                <div className="add-close-icon" onMouseUp={() => {isOpen(false)}}>
                    <IoClose />
                </div>
            </div>

           

            <div className="add-staff-column-left">

                <div>
                    <h3>New Staff</h3>
                    <p>Enter staff details to be inserted into the database.</p>
                </div>

                <div className="column-left-bottom-section">
                    <p>Or add from existing list</p>
                    <div className="import-staff-button">
                        <p>Add from list</p>
                    </div>
                </div>
                
            </div>

            
            
            <div className="column-right-wrapper">
                <SimpleBar style={{ height: '100%' }}>
                    <div className="add-staff-column-right">

                        <h2>Personal Details</h2>
                        <div className="input-section">
                            <h4>Name</h4>
                            <input placeholder="Name" className="input-box" ref={nameRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>IC No.</h4>
                            <input placeholder="Enter IC No." className="input-box" ref={icRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>Religion</h4>
                            <input placeholder="Enter religion" className="input-box" ref={religionRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>Job Position</h4>
                            <input placeholder="e.g. Staff" className="input-box" ref={posRef}></input>
                        </div>

                        <h2 id="sub-section-title">Payment Details</h2>

                        <div className="input-section">
                            <h4>Bank Account No.</h4>
                            <input placeholder="Enter bank account no." className="input-box" ref={bankRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>EPF No.</h4>
                            <input placeholder="Enter EPF No." className="input-box" ref={epfRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>SOCSO No.</h4>
                            <input placeholder="Enter SOCSO No." className="input-box" ref={socsoRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>EIS No.</h4>
                            <input placeholder="Enter EIS No." className="input-box" ref={eisRef}></input>
                        </div>

                        <div className="input-section">
                            <h4>Income Tax No.</h4>
                            <input placeholder="Enter Tax No." className="input-box" ref={taxRef}></input>
                        </div>

                        <div className="next-button" onMouseUp={handleAddStaff}>
                            <p>Add Staff</p>
                        </div>
                    </div>
                </SimpleBar>
            </div>
            
           

        </div>
    </div>

}

export default AddStaff