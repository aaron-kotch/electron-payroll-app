import LoginView from "./LoginView";
import PayrollView from "./PayrollView";
import Sidebar from "./Sidebar";
import Quickbar from './QuickBar'
import './App.css';
import { useState } from "react";
import DatabaseView from "./Database/DatabaseView";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { userContext } from "./UserContext";
import HistoryView from "./History/HistoryView";

const App = () => {

  const [currentView, setCurrentView] = useState("payroll")

  const [hasUser, setHasUser] = useState(false)

  const auth = getAuth()

  const [user, setUser] = useState([])
  
  const db = getFirestore()

  const getUser = async () => {

      const docRef = doc(db, "users", "uCuYDeT0fCg3kFkRNRfPNnImccD2")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
          console.log("Data: ", docSnap.data())
          setUser(docSnap.data())
      } else {
          console.log("No")
      }
  }

  //observes login / signout activity
  onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log(user.email + " is signed in")
          if (!hasUser) {
            getUser()
          }
          setHasUser(true)
      } else {
          console.log("No user signed in")
          setHasUser(false)
      }
  })

  return <div>

    {hasUser && user !== null
      ? <userContext.Provider value={user}>
        <div className="main">

          <Sidebar currView={view => setCurrentView(view)}/>

          <Quickbar />

          {/* TODO: Put page (payroll) into individual page, will switch view here (Database/ Settings) */}

          <div className="main-content">

            {currentView === "payroll" && <PayrollView />}
            {currentView === "records" && <DatabaseView />}
            {currentView === "history" && <HistoryView />}

            {/* {isOpen && <Popup handleList={handleAddList} handleClose={togglePopup}/>} */}
          </div>

        </div>
      </userContext.Provider>
      : <LoginView />
    }

    

  </div>
}

export default App