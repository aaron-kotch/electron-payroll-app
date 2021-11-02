import React, { useState } from "react";
import './PayrollReport.css'
import { IoClose } from 'react-icons/io5'
import { AiOutlineLoading } from 'react-icons/ai'
import { FcDocument } from 'react-icons/fc'
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import SimpleBar from 'simplebar-react'

const { ipcRenderer } = window.require('electron');

const PayrollReport = ({ payrollList, isOpen }) => {

    const [isGeneratingReport, setGeneratingReport] = useState(false)

    const generateBankStatement = (list) => {
        ipcRenderer.invoke('generate-bank-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generateEpfStatement = (list) => {
        ipcRenderer.invoke('generate-epf-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generateSocsoStatement = (list) => {
        ipcRenderer.invoke('generate-socso-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generateEisStatement = (list) => {
        ipcRenderer.invoke('generate-eis-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generateBaitulmalStatement = (list) => {
        ipcRenderer.invoke('generate-baitulmal-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generateZakatStatement = (list) => {
        ipcRenderer.invoke('generate-zakat-statement', list).then((result) => {
            console.log("RESULT: " + result)
        })
    }

    const generatePaySlip = (staff) => {

        ipcRenderer.invoke('generate-payslip', staff).then((result) => {
            console.log("RESULT: " + result)
        })

    }

    return <div className="payroll-report-wrapper">
        <SimpleBar style={{ height: '100vh' }}>
            <div className="payroll-report">
                <div id="payroll-header">
                    <p className="report-title" onClick={() => {console.log(payrollList)}}>Report</p>

                    <div className="close-button" onMouseUp={() => {isOpen(false)}}>
                            <IoClose id="close-icon"/>
                    </div>
                </div>

                {isGeneratingReport && 
                    <div className="report-row">
                        <div className="report-loading">
                            <AiOutlineLoading id="loading-icon"/>
                        </div>
                        <p>Generating report</p>
                    </div>
                }

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>Bank Statement</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateBankStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>EPF</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateEpfStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>SOCSO</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateSocsoStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>EIS</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateEisStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>BAITULMAL</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateBaitulmalStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>ZAKAT</h6>
                    </div>
                    <div className="view-button" onMouseUp={() => {generateZakatStatement(payrollList)}}>
                        <p>VIEW</p>
                    </div>
                </div>

                <div className="row-space-between">
                    <div className="view-row">
                        <div className="icon-wrapper">
                            <FcDocument id="folder-icon" />
                        </div>
                        <h6>Income Tax</h6>
                    </div>
                    <div className="view-button">
                        <p>VIEW</p>
                    </div>
                </div>

                <h5 id="section-title">Individual Payslip</h5>

                {payrollList.map((item) => {
                    return <div className="row-space-between">
                        <div className="view-row">
                            <div className="icon-wrapper">
                                <FcDocument id="folder-icon" />
                            </div>
                            <h6>{item.name}</h6>
                        </div>
                        <div className="view-button" onMouseUp={() => generatePaySlip(item)}>
                            <p>VIEW</p>
                        </div>
                    </div>
                })}
            </div>
        </SimpleBar>
    </div>
   

}

export default PayrollReport