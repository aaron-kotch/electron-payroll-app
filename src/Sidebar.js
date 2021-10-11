import React from 'react'
import './Sidebar.css'
import { BiReceipt } from 'react-icons/bi'
import { CgDatabase } from 'react-icons/cg'
import { RiSettings4Line } from 'react-icons/ri'

export default function Sidebar() {
    return (
        <div className="sidebar-wrapper">

            <p className="sidebar-title">
                Menu
            </p>
            
            <div className="sidebar-row">
                <BiReceipt className="payroll-icon"/>
                <p>Payroll</p>
            </div>

            <div className="sidebar-row">
                <CgDatabase className="payroll-icon"/>
                <p>Database</p>
            </div>

            <div className="sidebar-row">
                <RiSettings4Line className="payroll-icon"/>
                <p>Settings</p>
            </div>
            
        </div>
    )
}
