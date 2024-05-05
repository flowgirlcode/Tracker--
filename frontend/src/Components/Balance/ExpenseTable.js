import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat'
import { useGlobalContext } from '../../context/globalContext'
import {useReactToPrint} from 'react-to-print'

const ExpenseTable = () => {
    const componentPDF =useRef();

    const { expenses, getExpenses } = useGlobalContext()
    useEffect(() => {
    getExpenses()

    }, [])
    const generatePDF =useReactToPrint({
        content:()=>componentPDF.current,
        documentTitle:"UserData",
        onAfterPrint:()=>alert("Data Saved in PDF")
    });
    return (
    <TableStyled className='container'>
        <div className='scroll'>
            <div ref={componentPDF} style={{width:'100%'}}>
            <table className='table  table-hover  table-condensed p-3'>
                <thead>
                    <tr>
                        <th>
                            title
                        </th>
                        <th>
                            amount
                        </th>
                        <th>
                            date
                        </th>
                        <th>
                            type
                        </th>
                        <th>
                            category
                        </th>
                        <th>
                            description
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{dateFormat(expense.date)}</td>
                            <td>{expense.type}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
            <button onClick={generatePDF}>PDF</button>
        </div>
    </TableStyled>
    )
}

const TableStyled = styled.div` 
.scroll{
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 700px;
}
table {
    overflow: auto;
 width: max-content;
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;

  margin: 20px;
}


th {
    background-color: #ddd;
  text-align: left;
  padding: 8px;
  color: #222260;

}


td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
button {
    margin: 10px;
    display: inline-block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

`


export default ExpenseTable