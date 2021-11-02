import React, { useState } from 'react'
import './Sidebar.css'
import { BiReceipt } from 'react-icons/bi'
import { CgDatabase } from 'react-icons/cg'
import { RiSettings4Line } from 'react-icons/ri'
import { FcBusinessman } from 'react-icons/fc'
import { HiOutlineClock } from 'react-icons/hi'
import { app } from './Firebase'
import { getAuth, signOut } from 'firebase/auth'
import { userContext } from './UserContext'

export default function Sidebar({ currView }) {

    const [isSelected, setSelected] = useState([true, false, false])
    const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            
        }).catch((error) => {
            console.log(error)
        })
    }

    const setSelectedState = (index) => {

        switch (index) {
            case 0:
                setSelected([true, false, false, false])
                currView("payroll")
                break
            case 1:
                setSelected([false, true, false, false])
                currView("records")
                break
            case 2:
                setSelected([false, false, true, false])
                currView("history")
                break
            case 3:
                setSelected([false, false, false, true])
                currView("settings")
            break
            default:
                setSelected([true, false, false, false])
                currView("payroll")
        }
        
    }

    return (
        <div className="sidebar-wrapper">

                <div className="sidebar-top">
                    <p className="sidebar-title">
                        Menu
                    </p>
                    
                    <div className="sidebar-row" onMouseDown={() => {setSelectedState(0)}} id={isSelected[0] ? "selected" : "unselected"}>
                        <BiReceipt className={isSelected[0] ? "payroll-icon-active" : "payroll-icon"}/>
                        <p>Payroll</p>
                    </div>

                    <div className="sidebar-row" onMouseDown={() => {setSelectedState(1)}} id={isSelected[1] ? "selected" : "unselected"}>
                        <CgDatabase className={isSelected[1] ? "payroll-icon-active" : "payroll-icon"}/>
                        <p>Records</p>
                    </div>

                    <div className="sidebar-row" onMouseDown={() => {setSelectedState(2)}} id={isSelected[2] ? "selected" : "unselected"}>
                        <HiOutlineClock className={isSelected[2] ? "payroll-icon-active" : "payroll-icon"}/>
                        <p>Activities</p>
                    </div>

                    <div className="sidebar-row" onMouseDown={() => {setSelectedState(3)}} id={isSelected[3] ? "selected" : "unselected"}>
                        <RiSettings4Line className={isSelected[3] ? "payroll-icon-active" : "payroll-icon"}/>
                        <p>Settings</p>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div id="profile-icon" onMouseUp={handleSignOut}>
                        <FcBusinessman />
                    </div>
                    <userContext.Consumer>
                        {value => <div>
                                <p id="user-name">{value['name']}</p>
                                <p id="user-role">{value['role']}</p>
                            </div>
                        }
                    </userContext.Consumer>
                </div>
            
            </div>
    )
}
