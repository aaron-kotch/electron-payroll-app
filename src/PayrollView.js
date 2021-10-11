import React, { useState } from 'react'
import Payroll from './Payroll'
import './PayrollView.css'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaPlay } from 'react-icons/fa'
import { FcOpenedFolder,  FcFolder } from 'react-icons/fc'

const { ipcRenderer } = window.require('electron');

export default function PayrollView() {

    const [isHover, setHover] = useState(false)
    const [list, setList] = useState([])

    async function openFile() {
        const result = await ipcRenderer.invoke('open-file');

        setList(result)
    }    


    return <div className="view">

        <p className="view-title">Payroll</p>
        <p className="view-subtitle">Manage payroll</p>

        <div className="payroll-header-row">
            <div className="payroll-cycle">
                <p>Cycle</p>
                <div className="cycle-selector">
                    <p>OCTOBER 2021</p>
                    <GoPrimitiveDot className="cycle-icon"/>
                </div>
            </div>

            <div className="report-button" onClick={() => {console.log(list[0].name)}}>
                <FaPlay className="button-icon"/>
                <p>Run Payroll</p>
            </div>

        </div>

        <div className="payroll-view-table">
            <div className="table-header">
                <p id="payroll-name">Name</p>
                <p id="payroll-gross">Gross Salary</p>
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
                        <p className="empty-desc-subtitle">Upload or Drag file here to start working</p>
                    </div>
                </div>
                : list.map(listItem => {
                    console.log(listItem.name)
                    return <Payroll key={listItem.no} list = {listItem} />
                })
            }
        </div>
        
    </div>
}
