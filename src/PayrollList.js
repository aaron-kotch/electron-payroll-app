import React from 'react'
import Payroll from './Payroll'

export default function PayrollList({list}) {
    return (
        list.map(listItem => {
            return <Payroll key={listItem.id} listItem = {listItem} />
        })
    )
}
