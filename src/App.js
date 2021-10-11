import React,  { useState, useRef } from "react";
import PayrollView from "./PayrollView";
import { v4 as uuid} from 'uuid';
import Popup from "./PopUp";
import Sidebar from "./Sidebar";
import Quickbar from './QuickBar'
import './App.css';

const { ipcRenderer } = window.require('electron');

const App = () => {

  const [lists, setList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const listInputRef = useRef()

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  async function handleAddList(staffName, staffSalary, staffAllowance) {

    const grossSalary = (parseInt(staffSalary) + parseInt(staffAllowance))

    // send instruction to main, then receive data
    const data = await ipcRenderer.invoke('calculate-payroll', (grossSalary))
    console.log(data)

    const totalDeduction = parseInt(data['employee-epf']) + parseInt(data['employee-socso']) + parseInt(data['employee-eis'])
    const netSalary = (grossSalary - totalDeduction)

    setList(currentList => {
      return [
        ...currentList, 
        { id: uuid(), 
          name: staffName, 
          basic_salary: parseFloat(staffSalary).toFixed(2), 
          allowance: parseFloat(staffAllowance).toFixed(2), 
          gross_salary: parseFloat(grossSalary).toFixed(2),
          employee_epf: parseFloat(data['employee-epf']).toFixed(2),
          employer_epf: parseFloat(data['employer-epf']).toFixed(2),
          employee_socso: parseFloat(data['employee-socso']).toFixed(2),
          employer_socso: parseFloat(data['employer-socso']).toFixed(2),
          employee_eis: parseFloat(data['employee-eis']).toFixed(2),
          employer_eis: parseFloat(data['employer-epf']).toFixed(2),
          zakat: parseFloat(data['zakat']).toFixed(2),
          baitulmal: parseFloat(data['baitulmal']).toFixed(2),
          pcb: parseFloat(data['pcb']).toFixed(2),
          cp38: parseFloat(data['cp38']).toFixed(2),
          other: parseFloat(data['other']).toFixed(2),
          total_deduction: parseFloat(totalDeduction).toFixed(2),
          net_salary: parseFloat(netSalary).toFixed(2)
        }
      ]
    })
  }

  function getMonth() {
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long'})

    return month;
  }

  return <div>

    <div>

      <Sidebar />

      <Quickbar />


      {/* TODO: Put page (payroll) into individual page, will switch view here (Database/ Settings) */}

      <div className="main-content">

        <PayrollView />

        {/* {isOpen && <Popup handleList={handleAddList} handleClose={togglePopup}/>} */}
      </div>

    </div>

  </div>
}

export default App