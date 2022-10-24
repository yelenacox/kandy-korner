import { useEffect, useState } from "react"
import "./products.css"

export const ProductOrders = () => {
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [purchases, setPurchases] = useState([])
    const [filteredPurchases, setFiltered] = useState([])

    const kandyUser = JSON.parse(localStorage.getItem("kandy_user"))

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
            fetch(`http://localhost:8088/purchases?_expand=product&_expand=customer`)
                .then(res => res.json())
                .then((data) => {
                    setPurchases(data)
                })
            // fetch(`http://localhost:8088/products`)
            //     .then(res => res.json())
            //     .then((productObj) => {
            //         setProducts(productObj)
            //     })

        }, []
    )

    useEffect(
        () => {
            const myOrders = purchases.filter(purchase => {return purchase?.customer?.userId === kandyUser.id}) //For customers
            setFiltered(myOrders)
        }
        ,
        [purchases]
    )

    return <>
        <h2>My Orders</h2>

        <article className="purchases">
            {filteredPurchases
                .map(
                    (purchase) => {

                        return <section key={purchase.id} className="purchase">
                            <div className="purchase__div">{purchase?.product?.name}</div>
                            <div className="purchase__div">${purchase?.product?.price}
                            </div>

                        </section>
                    }
                )
            }
        </article></>
}