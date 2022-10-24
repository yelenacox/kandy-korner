import { useEffect, useState } from "react"

export const SaveButtonClick = (product, purchases, setPurchases) => {

    const kandyUser = JSON.parse(localStorage.getItem("kandy_user"))
console.log(kandyUser)
    for (const purchase of purchases) {
        if (purchase.productId === product.id) {
            return fetch(`http://localhost:8088/purchases/${purchase.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerId: kandyUser.id,
                    productId: product.id,
                    numberPurchased: purchase.numberPurchased++
                })
            })
                .then(res => res.json())
                .then(
                    fetch(`http://localhost:8088/purchases`)
                        .then(res => res.json())
                        .then((data) => {
                            setPurchases(data)
                        })
                )
        }
    }

    return fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customerId: kandyUser.id,
            productId: product.id,
            numberPurchased: 1
        })
    })
        .then(res => res.json())
}