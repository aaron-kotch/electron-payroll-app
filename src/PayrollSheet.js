import React from 'react'
import './Payroll.css'

export default function PayrollSheet({listItem}) {
    return (
        <div className="hidden-tile">

                <div className="salary-section">

                    <p className="section-title">Salary</p>

                    <div className="section-row">

                        <p className="section-row-title">Basic</p>
                        <p>{listItem.basic_salary.toLocaleString()}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">Allowance</p>
                        <p>{listItem.allowance.toLocaleString()}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">Gross</p>
                        <p>{listItem.gross_salary.toLocaleString()}</p>

                    </div>

                    <div className="tax-section" id="tax-title">

                        <p className="section-title">Income Tax</p>

                        <div className="section-row">

                            <p className="section-row-title">PCB</p>
                            <p>{listItem.pcb}</p>

                        </div>

                        <div className="section-row">

                            <p className="section-row-title">CP38</p>
                            <p>{listItem.cp38}</p>

                        </div>
                    </div>
                </div>

                <div className="employee-section">

                    <p className="section-title">Employee Deductions</p>

                    <div className="section-row">

                        <p className="section-row-title">EPF</p>
                        <p>{parseFloat(listItem.employee_epf).toFixed(2)}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">SOCSO</p>
                        <p>{parseFloat(listItem.employee_socso).toFixed(2)}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">EIS</p>
                        <p>{parseFloat(listItem.employee_eis).toFixed(2)}</p>

                    </div>

                    <div className="others-section" id="others-title">

                        <p className="section-title">Others</p>

                        <div className="section-row">

                            <p className="section-row-title">ZAKAT</p>
                            <p>{listItem.zakat === isNaN ? parseFloat(listItem.zakat).toFixed(2) : "0.00"}</p>

                        </div>

                        <div className="section-row">

                            <p className="section-row-title">BAITULMAL</p>
                            <p>{parseFloat(listItem.baitulmal).toFixed(2)}</p>

                        </div>
                    </div>

                </div>

                <div className="employer-section">

                    <p className="section-title">Employer Contributions</p>

                    <div className="section-row">

                        <p className="section-row-title">EPF</p>
                        <p>{parseFloat(listItem.employer_epf).toFixed(2)}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">SOCSO</p>
                        <p>{parseFloat(listItem.employer_socso).toFixed(2)}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">EIS</p>
                        <p>{parseFloat(listItem.employer_eis).toFixed(2)}</p>

                    </div>
                </div>

            </div>

    )
}
