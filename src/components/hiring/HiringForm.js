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
        name: "",
        locationId: "",
        startDate: "",
        payRate: ""
    })

    const navigate = useNavigate

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
        "Boo!"
    )    
 }