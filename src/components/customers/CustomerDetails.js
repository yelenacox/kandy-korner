import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(res => res.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        }, [customerId]
    )

    return <section className="customer">
        <header className="customer__header">{customer?.user?.name}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Loyalty number: {customer.loyaltyNumber} 
        <button
                onClick={() => navigate(`/customers/${customer.id}/edit`)}
                className="button_edit">
                Update
            </button></div>

    </section>
}