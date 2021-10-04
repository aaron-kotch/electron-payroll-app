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
                        <p>{listItem.employee_epf}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">SOCSO</p>
                        <p>{listItem.employee_socso}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">EIS</p>
                        <p>{listItem.employee_eis}</p>

                    </div>

                    <div className="others-section" id="others-title">

                        <p className="section-title">Others</p>

                        <div className="section-row">

                            <p className="section-row-title">ZAKAT</p>
                            <p>{listItem.zakat}</p>

                        </div>

                        <div className="section-row">

                            <p className="section-row-title">BAITULMAL</p>
                            <p>{listItem.cp38}</p>

                        </div>
                    </div>

                </div>

                <div className="employer-section">

                    <p className="section-title">Employer Contributions</p>

                    <div className="section-row">

                        <p className="section-row-title">EPF</p>
                        <p>{listItem.employer_epf}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">SOCSO</p>
                        <p>{listItem.employer_socso}</p>

                    </div>

                    <div className="section-row">

                        <p className="section-row-title">EIS</p>
                        <p>{listItem.employer_eis}</p>

                    </div>
                </div>

            </div>

    )
}
