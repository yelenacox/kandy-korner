import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const HiringForm = () => {
    const [user, update] = useState({
        id: "",
        name: "",
        email: "",
        isStaff: ""
    })

    const [employee, updateEmp] = useState({
        userId: "",
        name: "",
        locationId: "",
        startDate: "",
        payRate: ""
    })

    const navigate = useNavigate()

    const saveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            id: user.id,
            name: user.name,
            email: user.email,
            isStaff: true
        }

        const employeeToSendToAPI = {
            id: employee.id,
            userId: employee.userId,
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(res => res.json())
            .then((userObj) => { employeeToSendToAPI.userId = userObj.id })
            .then(() => {
                fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate("/employees")
                    })
            })
    }

    return (
        <form className="hiringForm">
            <h2 className="hiringForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee_name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee name"
                        value={user.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee_email">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee email"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee_location">Store location:</label>
                    <input
                        required autoFocus
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Store location"
                        value={employee.locationId}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.locationId = parseInt(evt.target.value)
                                updateEmp(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee_start_date">Start date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Employee start date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                updateEmp(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee_pay_rate">Pay rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Employee pay rate"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.payRate = parseInt(evt.target.value)
                                updateEmp(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => saveButtonClick(clickEvent)}
                className="submitButton">
                Save New Employee
            </button>
        </form>
    )
}