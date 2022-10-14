import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"


export const ProductList = () => {    
    const[products, setProducts] = useState([])
    const[filteredProducts, setFiltered] = useState([])
    const[buttonClick, setButton] = useState(false)

    const kandyUser = JSON.parse(localStorage.getItem("kandy_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType&_sort=name`)
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

    {kandyUser.staff ? 
    <button onClick={() => navigate("/productForm")}>Create New Product</button> 
    : ""}

    <article className="products">
        {filteredProducts
        .map(
            (product) => {
                return <section key={product.id} className="product">
                   <div className="product_div">{product.name}</div>
                   <div className="product_div">${product.price}</div>
                   <div className="product_div">{product.productType?.category}</div>
                    
                </section>
            }
        )
        }
    </article>
</>
}

