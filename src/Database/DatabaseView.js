import React, { useState, useEffect, useRef } from "react";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import './DatabaseView.css'
import { FiSearch, FiPlus } from 'react-icons/fi'
import { RiMore2Fill } from 'react-icons/ri'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { BsChevronRight } from 'react-icons/bs'
import useWindowDimensions from "../GetWindowDimension";
import StaffDetails from "./StaffDetails";
import AddStaff from "./AddStaff";

const DatabaseView = () => {

    const db = getFirestore()

    const [isFetchingData, setFetchingData] = useState(false)
    const [staffList, setStaffList] = useState([])
    const [staff, setStaff] = useState({})
    const [isHoverList, setHoverList] = useState(false)
    const [isViewingList, setViewingList] = useState(true)
    const [isAddStaff, setAddStaff] = useState(false)
    const { width } = useWindowDimensions()

    const retrieveStaffs = async () => {

        setStaffList([])

        setFetchingData(true)

        await getDocs(collection(db, "staffs"))
            .then(data => {
                setFetchingData(false)
                data.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data())
                    setStaffList(oldList => [
                        ...oldList,
                        {
                            name: doc.data().name,
                            id: doc.data().id
                        }
                    ])
                })
            })
        
        return staffList
    }

    const handleListClick = (item) => {
        setStaff(item)
        setViewingList(false)
    }

    useEffect(() => {

        retrieveStaffs()

    }, [])

    useEffect(() => {
        console.log(isAddStaff)
    }, [isAddStaff])

    return <div className="database-wrapper">

        {isAddStaff && 
            <AddStaff isOpen={(val) => {setAddStaff(val)}}/>
        }

        <SimpleBar className="database-base" style={{ height: '100vh' }} id={isViewingList ? "list-appear" : isHoverList ? "list-hover" : "list-hidden"}>
            <div className="database-view-main">

                <div className="database-view-header">
                    <div className="title-wrapper">
                        <div className="database-view-title">
                            <h3>Database</h3>
                            <h5>View and manage staff records</h5>
                        </div>
                        <div className="more-icon-wrapper" onMouseUp={() => {setAddStaff(true)}}>
                            <FiPlus className="more-icon"/>
                        </div>

                    </div>

                    <div className="search" onMouseUp={() => {console.log("width " + {width})}}>
                        <FiSearch className="search-icon"/>
                        <p className="search-placeholder">Search</p>
                    </div>
                    <p id="list-header-name">Staffs</p>
                </div>

                <div className="database-list">
                    {staffList.length !== 0 &&
                        staffList.map((item, index) => {

                            return <div key={item.id}>

                                {index === 0 && <div className="tile-leading">
                                    {index === 0 && <p>M</p>}
                                </div>}
                                <div className="database-tile-wrapper" onMouseUp={() => {handleListClick(item)}}>
                                    <div className="database-tile">

                                        <div className="tile-column">
                                            <p id="staff-name">{item.name}</p>
                                            <p id="staff-id">{item.id}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </SimpleBar>

        {width < 1200 && 
        <div 
            className="peek-handle" 
            id={isViewingList ? "peek-handle-appear" : "peek-handle-hidden"}
            onMouseUp={() => {setViewingList(!isViewingList)}} 
            onMouseEnter={() => {setHoverList(true)}} 
            onMouseLeave={() => {setHoverList(false)}}>

            <BsChevronRight id={isViewingList ? "peek-icon-appear" : "peek-icon-hidden"} />

        </div>}

        <div className="staff-view">
            <StaffDetails staff={staff} />
        </div>
    </div>
}

export default DatabaseView;