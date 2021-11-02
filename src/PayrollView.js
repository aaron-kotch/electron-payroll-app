import React, { useState, useRef, useEffect } from 'react'
import Payroll from './Payroll'
import './PayrollView.css'
import PayrollReport from './PayrollReport'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { BsFillPlayFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FcOpenedFolder,  FcFolder, FcCalendar } from 'react-icons/fc'
import { GrRotateLeft } from 'react-icons/gr'
import { AiOutlineLoading } from 'react-icons/ai'
import { getFirestore, getDocs, doc, addDoc, setDoc, collection, query, where } from 'firebase/firestore'
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
    const [currentMonthLong, setCurrentMonthLong] = useState("OCTOBER")
    const [currentYear, setCurrentYear] = useState(2021)
    const [isSelectingMonth, setSelectingMonth] = useState(false)
    const monthList = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]

    const monthListLong = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
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

    const decreaseYear = () => {
        setCurrentYear(currentYear - 1)
    }

    const increaseYear = () => {
        setCurrentYear(currentYear + 1)
    }

    const selectMonth = (month) => {
        setCurrentMonth(monthList[month])
        setCurrentMonthLong(monthListLong[month])
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

    const processStatement = async () => {

        if (list.length === 0) console.log("LIST IS EMPTY")

        setProcessingReport(true)

        let bankList = []
        var sessionID = ""

        await addDoc(collection(db, "history"), {
            title: "Payroll for " + currentMonthLong.slice(0, 1) + currentMonthLong.slice(1, currentMonthLong.length).toLowerCase() + " " + currentYear,
            date: moment().format('D MMM YYYY - h:mm a'),
            activity: "write"
        }).then((data) => {
            console.log("ID: " + data.id)
            sessionID = data.id
        }).then(() => {
            list.forEach(async(data, index) => {
    
                const month = currentMonthLong + " " + currentYear

                const q = query(staffRef, where("name", "==", data.name))
                let docID = ""

                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(async(queryDoc) => {
                    bankList.push({
                        name: data.name,
                        ic_no: queryDoc.id,
                        religion: queryDoc.data().religion,
                        position: queryDoc.data().position,
                        sessionID: sessionID,
                        month: currentMonthLong + " " + currentYear,
                        bank: {
                            no: queryDoc.data()['bank-no'],
                        },
                        salary: {
                            overtime: "0.00",
                            claims: "0.00",
                            allowance: "0.00",
                            net: parseFloat(data.net_salary).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            basic: parseFloat(data.basic_salary).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            gross: parseFloat(data.gross_salary).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                        },
                        epf: {
                            no: queryDoc.data()['epf-no'],
                            total: parseFloat(data.total_epf).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employee: parseFloat(data.employee_epf).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employer: parseFloat(data.employer_epf).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                        },
                        socso: {
                            no:  queryDoc.data()['socso-no'],
                            total: parseFloat(data.total_socso).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employee: parseFloat(data.employee_socso).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employer: parseFloat(data.employer_socso).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                        },
                        eis: {
                            no: queryDoc.data()['eis-no'],
                            total: parseFloat(data.total_eis).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employee: parseFloat(data.employee_eis).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            employer: parseFloat(data.employer_eis).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                        },
                        tax: {
                            no: queryDoc.data()['income-tax-no'],
                            cp38: parseFloat(data.cp38).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                            pcb: parseFloat(data.pcb).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                        },
                        zakat: "0.00",
                        baitulmal: "0.00",
                        others: parseFloat(data.other_deduction).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                        total_deduction: parseFloat(data.total_deduction).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                        total_employer: (parseFloat(data.employer_epf) + parseFloat(data.employer_socso) + parseFloat(data.employer_eis)).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2}),
                    })

                    const docRef = await addDoc(collection(db, "staffs", queryDoc.id, "pay-record"), {
                        
                    }).then((currDoc) => {
                        setDoc(doc(db, "staffs", queryDoc.id, "pay-record", currDoc.id), {
                            name: data.name,
                            id: currDoc.id,
                            sessionId: sessionID,
                            month: month,
                            creationDate: moment().format('D MMM YYYY - h:mm a'),
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
                            zakat: 0,
                            baitulmal: 0,
                            bank: {
                                no: queryDoc.data()['bank-no'],
                            },
                            netSalary: data.net_salary
                        })
                    })
                })

                if (index + 1 === list.length) {
                    setProcessedList(bankList)
                }
            });
        }).then(() => {
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
                        <FcCalendar id="cycle-leading"/>
                        <p>{currentMonthLong}</p>
                        <p id="current-year">{currentYear}</p>
                        
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
                    <div className="month-picker-header">
                        <div className="month-arrow-wrapper" onMouseUp={decreaseYear}>
                            <BsChevronLeft className="month-arrow"/>
                        </div>
                        <p>{currentYear}</p>
                        <div className="month-arrow-wrapper" onMouseUp={increaseYear}>
                            <BsChevronRight className="month-arrow"/>
                        </div>
                    </div>
                    <div className="month-picker-body">
                        {monthList.map((month, index) => {
                            return <div key={index} className="month-canvas" id={currentMonth === month ? "selected-month" : "unselected-month"} onClick={() => {selectMonth(index)}} >
                                <p className="month">
                                    {month}
                                </p>
                            </div>
                        })}
                    </div>
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