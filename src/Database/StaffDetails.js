import React from "react";
import './StaffDetails.css'
import { getFirestore, getDoc, getDocs, doc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FcBriefcase } from 'react-icons/fc'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { RiSettings4Line } from 'react-icons/ri'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

const StaffDetails = ({ staff }) => {

    const [staffDetail, setStaffDetail] = useState([{}])
    const [paymentList, setPaymentList] = useState([{}])

    useEffect(() => {

        const db = getFirestore()
        setPaymentList([])

        if (staff) {
            const getStaffDetails = async () => {

                const docRef = doc(db, "staffs", String(staff.id))
                const docSnap = await getDoc(docRef)
        
                if (docSnap.exists()) {
                    setStaffDetail(docSnap.data())

                    const querySnapshot = await getDocs(collection(db, "staffs", docSnap.data().id, "pay-record"))
                    querySnapshot.forEach((doc) => {
                        setPaymentList(oldList => [
                            ...oldList,
                            doc.data()
                        ])
                    })
                } else {
                    console.log("Document not found!")
                }
        
            }

            getStaffDetails()
        }
    }, [staff])

    return !staff.name
        ? <div className="empty-staff-view">
            <div className="empty-icon-wrapper">
                <FcBriefcase id="empty-icon"/>
            </div>
            <h6>No staff selected</h6>
            <p>Select staff to view details</p>
        </div>
        : <SimpleBar style={{ height: '100vh' }}>
            <div className="staff-details-wrapper"> 
                <p className="view-subtitle">Staff</p>
                <h3 className="staff-name">{staffDetail.name}</h3>
                
                <div className="staff-details-panel">

                    <div className="staff-settings-wrapper">
                        <RiSettings4Line id="staff-settings-icon"/>
                    </div>

                    <h5>Personal Details</h5>
                    <div className="panel-column">
                        <h6>IC No.</h6>
                        <p>{staffDetail['id']}</p>
                    </div>

                    <div className="panel-column">
                        <h6>Position</h6>
                        <p>{staffDetail['position']}</p>
                    </div>

                    <h5>Billing Details</h5>
                    <div className="panel-row">
                        <div className="panel-column">
                            <h6>Bank Account</h6>
                            <p>{staffDetail['bank-no']}</p>
                        </div>

                        <div className="panel-column">
                            <h6>EPF No.</h6>
                            <p>{staffDetail['epf-no']}</p>
                        </div>

                    </div>

                    <div className="panel-row">
                    
                        <div className="panel-column">
                            <h6>EIS No.</h6>
                            <p>{staffDetail['eis-no']}</p>
                        </div>

                        <div className="panel-column">
                            <h6>SOCSO No.</h6>
                            <p>{staffDetail['socso-no']}</p>
                        </div>

                    </div>

                    <div className="panel-row">
                    
                    <div className="panel-column">
                        <h6>Income Tax No.</h6>
                        <p>{staffDetail['income-tax-no']}</p>
                    </div>

                </div>

                </div>

                <h4 id="staff-section-title">Payment Records</h4>

                {paymentList 
                    ? <div className="record-wrapper">
                        {paymentList.map(item => {
                        return <div className="record-tile" key={item.id}>
                            <h5>{item.month}</h5>
                        </div>
                    })}
                    </div>
                    : <p>Empty list</p>
                }
                

            </div>
        </SimpleBar>
        
}

export default StaffDetails