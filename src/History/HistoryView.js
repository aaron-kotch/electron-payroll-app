import React, { useState, useEffect } from "react";
import './HistoryView.css'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { BiEditAlt } from 'react-icons/bi'

const HistoryView = () => {

    const [historyList, setHistoryList] = useState([])

    const retrieveHistoryData = async () => {

        const db = getFirestore()

        await getDocs(collection(db, "history")).then((data) => {
            data.forEach((doc) => {
                setHistoryList(currList => [
                    ...currList,
                    doc.data()
                ])
            })

            console.log(historyList)
        })

    }

    useEffect(() => {

        retrieveHistoryData()

    }, [])

    return <div className="history-view-wrapper">

        <h3>Activity</h3>
        <h5>View past activity</h5>

        {historyList
            ? <div className="history-list-wrapper">
                {historyList.map((item) => {
                    return <div className="history-list-item">
                        <div className="history-list-leading">
                            <BiEditAlt />
                        </div>
                        <div className="list-item-column">
                            <h3>{item.title}</h3>
                            <p>{item.date}</p>
                        </div>
                    </div>
                })}
            </div>
            : <p>Empty</p>
        }


    </div>

}

export default HistoryView