import { useState, useEffect } from "react"
import "./products.css"

export const ProductList = () => {    
    const[products, setProducts] = useState([])
    const[filteredProducts, setFiltered] = useState([])
    const[buttonClick, setButton] = useState(false)


    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(res => res.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
        }, []
    )

    useEffect(
        () => {
            if (buttonClick) {
                const expensiveProduct = products.filter(product => product.price > 2)
                setFiltered(expensiveProduct)
            } else {
                setFiltered(products)
            }
        },
        [buttonClick, products]
    )

    return <>
    <h2>Products</h2>
    <button onClick={() => { setButton(!buttonClick) }}>Top Priced</button>
    <article className="products">
        {filteredProducts.sort(
            (a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }
            }
        ).map(
            (product) => {
                return <section key={product.id} className="product">
                   <div className="product_div">{product.name}</div>
                   <div className="product_div">${product.price}</div>
                    
                </section>
            }
        )
        }
    </article>
</>
}

