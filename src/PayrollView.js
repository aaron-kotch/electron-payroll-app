import React, { useState, useRef, useEffect } from 'react'
import Payroll from './Payroll'
import './PayrollView.css'
import PayrollReport from './PayrollReport'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { BsFillPlayFill } from 'react-icons/bs'
import { FcOpenedFolder,  FcFolder, FcCalendar } from 'react-icons/fc'
import { GrRotateLeft } from 'react-icons/gr'
import { AiOutlineLoading } from 'react-icons/ai'
import { getFirestore, getDocs, doc, setDoc, collection, query, where } from 'firebase/firestore'
import moment from 'moment'

const { ipcRenderer } = window.require('electron');

const PayrollView = () => {

    const db = getFirestore()
    const staffRef = collection(db, "staffs")
    const node = useRef();

    const [isProcessingReport, setProcessingReport] = useState(false)
    const [isDoneReport, setDoneReport] = useState(false)
    const [isHover, setHover] = useState(false)
    const [list, setList] = useState([])
    const [processedList, setProcessedList] = useState([{}])
    const [currentMonth, setCurrentMonth] = useState("OCT")
    const [isSelectingMonth, setSelectingMonth] = useState(false)
    const monthList = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]

    async function openFile() {
        const result = await ipcRenderer.invoke('open-file', list);

        setList(result)
    }

    const clearList = () => {
        setList([])
    }

    const dismiss = e => {
        if (node.current.contains(e.target)) {
            setSelectingMonth(true)
            return;
        }

        setSelectingMonth(false)
    }

    const selectMonth = (month) => {
        setCurrentMonth(month)
        setSelectingMonth(false)
    }

    const setSelectMonthState = () => {
        if (isSelectingMonth === false) {
            setSelectingMonth(!isSelectingMonth)
        }
    }

    useEffect(() => {

        if (isSelectingMonth) {
            document.addEventListener("mousedown", dismiss)
        } else {
            document.removeEventListener("mousedown", dismiss)
        }
        
        return () => {
            document.removeEventListener("mousedown", dismiss)
        }
    }, [isSelectingMonth])

    const writeToDatabase = () => {

        const dateToday = moment().format("MMMM-YYYY").toUpperCase()

        list.forEach(async(item) => {

            console.log("START item: ", item.name)

            const q = query(staffRef, where("name", "==", item.name))

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(async(queryDoc) => {
                console.log(queryDoc.id,  " => ", queryDoc.data())
                await setDoc(doc(db, "staffs", queryDoc.id, "pay-record", dateToday), {
                    allowance: item.allowance,
                    baitulmal: item.baitulmal,
                    basic_salary: item.basic_salary,
                    cp38: item.cp38,
                    employee_eis: item.employee_eis,
                    employee_epf: item.employee_epf,
                    employee_socso: item.employee_socso,
                    employer_eis: item.employer_eis,
                    employer_epf: item.employer_epf,
                    employer_socso: item.employer_socso,
                    gross_salary: item.gross_salary,
                    net_salary: item.net_salary,
                    pcb: item.pcb,
                    total_deduction: item.total_deduction,
                    total_eis: item.total_eis,
                    total_epf: item.total_epf,
                    total_socso: item.total_socso,
                })
                console.log("Write complete for: ", item.name)
            })
        })
    }

    const processStatement = async () => {

        if (list.length === 0) console.log("LIST IS EMPTY")

        setProcessingReport(true)

        let bankList = []

        var getDetails = new Promise((resolve, reject) => {
            list.forEach(async(data, index) => {

                const q = query(staffRef, where("name", "==", data.name))
    
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(async(queryDoc) => {
                    bankList.push({
                        name: data.name,
                        id: queryDoc.id,
                        epf: {
                            no: queryDoc.data()['epf-no'],
                            total: data.total_epf
                        },
                        socso: {
                            no:  queryDoc.data()['socso-no'],
                            total: data.total_socso
                        },
                        eis: {
                            no: queryDoc.data()['eis-no'],
                            total: data.total_eis
                        },
                        tax: {
                            no: queryDoc.data()['income-tax-no'],
                            cp38: data.cp38,
                            pcn: data.pcb
                        },
                        bank: {
                            no: queryDoc.data()['bank-no'],
                        },
                        netSalary: data.net_salary
                    })
                })

                if (index + 1 === list.length) {
                    setProcessedList(bankList)
                    console.log("List: " + processedList)
                    resolve()
                }
            });
        })

        getDetails.then(() => {
            setDoneReport(true)
            setProcessingReport(false)
            console.log("Done process")
        })
    }

    

    return <div className="payroll-view-wrapper">

        {isDoneReport && <PayrollReport payrollList={processedList} isOpen={cond => setDoneReport(cond)} />}

        {/* laoding indicator */}
        {isProcessingReport &&
                <div className="loading-wrapper">
                    <div className="loading-box">
                        <div className="loading-icon-wrapper">
                            <AiOutlineLoading id="loading-icon" />
                        </div>
                        <p id="loading-text">Processing payroll</p>
                    </div>

                </div>
        }

        <SimpleBar style={{ height: '100vh' }}>
            <div className="view">

                <p className="view-title">Payroll</p>
                <p className="view-subtitle">Manage payroll</p>

                <div className="payroll-header-row">
                    <div className="cycle-selector" id={isSelectingMonth ? "selected-month-active" : "selected-month-inactive"} ref={node} onMouseDown={setSelectMonthState}>
                        
                        <p>{currentMonth}</p>
                        <FcCalendar id="cycle-trailing"/>
                    </div>

                    <div id="button-wrapper">
                        {list.length !== 0 &&
                            <div>
                                <div className="cycle-selector" id="reset-button" onMouseUp={() => {clearList()}}>
                                    <GrRotateLeft id="reset-icon"/>
                                    <p>Reset</p>
                                </div>
                            </div>
                        }

                        <div className="cycle-selector" id="report-button" onMouseUp={processStatement}>
                            <BsFillPlayFill id="button-leading"/>
                            <p>Run</p>
                        </div>
                    </div>
                </div>

                {isSelectingMonth && <div className="month-picker" ref={node}>
                    {monthList.map((month, index) => {
                        return <div key={index} id="month-canvas" onClick={() => {selectMonth(month)}} >
                            <p className="month">
                                {month}
                            </p>
                        </div>
                    })}
                </div>}

                <div className="payroll-view-table">
                    <div className="table-header">
                        <p id="payroll-id">#</p>
                        <p id="payroll-name">Name</p>
                        <p id="payroll-deduction">Total Deduction</p>
                        <p id="payroll-net">Net Salary</p>
                    </div>

                    {list.length === 0 
                        ? <div className="empty-list">
                            <div className="empty-list-content">
                                
                                <div className="folder-icon" onClick={openFile} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    {isHover === false ? <FcFolder className="empty-icon"/>: <FcOpenedFolder className="empty-icon"/>}
                                </div>

                                <p className="empty-desc-title">Workspace is empty</p>
                                <p className="empty-desc-subtitle">Upload or Drop file here to start working</p>
                            </div>
                        </div>
                        : list.map((listItem, index) => {
                            return <Payroll key={listItem.no} list = {listItem} index = {index} />
                        })
                    }
                </div>

            </div>
        </SimpleBar>
    </div>
}

export default PayrollView;