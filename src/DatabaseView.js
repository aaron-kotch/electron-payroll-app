import React, { useState, useEffect } from "react";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import './DatabaseView.css'
import { FiSearch } from 'react-icons/fi'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FiChevronRight } from 'react-icons/fi'

const DatabaseView = () => {

    const db = getFirestore()

    const [isFetchingData, setFetchingData] = useState(false)
    const [staffList, setStaffList] = useState([])

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
                        doc.data()
                    ])
                })
            })
        
        return staffList
    }

    useEffect(() => {

        retrieveStaffs()

    }, [])

    return <SimpleBar style={{ height: '100vh' }}>
        <div className="database-view-main">
                <div className="database-view-header">
                    <div className="database-view">
                        <p className="view-title">Database</p>
                        <p className="view-subtitle">View and manage staff records</p>
                    </div>

                    <div className="search">
                        <FiSearch />
                    </div>
                </div>

                <div className="database-action">
                    <button className="add-staff-button">
                        <p>Add Staff</p>
                    </button>
                </div>
                
                <div className="database-list">

                    <div className="list-header">

                        <p id="list-header-name">Name</p>
                    </div>

                    {staffList.length !== 0 &&
                        staffList.map((item, index) => {
                            return <div key={item.id} className="database-tile">
                                
                                <div className="tile-column">
                                    <p id="staff-name">{item.name}</p>
                                    <p id="staff-id">{item.id}</p>
                                </div>

                                <div className="tile-row">
                                    <div className="tile-column">
                                        <p id="staff-position">{item.position}</p>
                                        <p id="staff-location">Kijal</p>
                                    </div>
                                    
                                    <div className="arrow-icon">
                                        <FiChevronRight />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
    </SimpleBar>
}

export default DatabaseView;