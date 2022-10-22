import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerEdit = () => {
    const [customer, updateCustomer] = useState({})
    
    const { customerId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/customers/${customerId}?_expand=user`)
            .then(response => response.json())
            .then((user) => {
                updateCustomer(user)
            })
    }, [customerId])

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Get the customer state from the API.
        return fetch(`http://localhost:8088/customers/${customer.id}?_expand=user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/customers/${customer.id}`)
            })
    }

    return <form className="customer_form">
        <header className="customer__header">{customer?.user?.name}</header>
        <div>Email: {customer?.user?.email}</div>
        <fieldset>
            <div className="form-group">
                <label htmlFor="loyalty_number">Loyalty Number:</label>
                <textarea
                    required autoFocus
                        type="number"
                        className="form-control"
                    value={customer.loyaltyNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.loyaltyNumber = parseInt(evt.target.value)
                            updateCustomer(copy)
                            // TODO: Update state with a mod ified copy
                        }
                    }>{customer.loyaltyNumber}</textarea>
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="button_edit">
            Save Edits
        </button>
    </form>

}