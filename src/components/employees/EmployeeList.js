import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./employees.css"

export const EmployeeList = ( {}) => {    
    const[employees, setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
            .then(res => res.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        }, []
    )


    return <>
    <h2>Employees</h2>  
    <button onClick={() => navigate("/HiringForm")}>Hire New Employee</button> 

    <article className="employees">
        {employees
        .map(
            (employee) => {
                return <section key={employee.id} className="employee">
                   <div className="employee_div">Name: {employee?.user?.name}</div>
                   <div className="employee_div">Start date: {employee.startDate}</div>
                   <div className="employee_div">Pay rate: ${employee.payRate}/hr</div>
                   <div className="employee_div">Location: {employee?.location?.address}</div>
                </section>
            }
        )
        }
    </article>
</>
}
