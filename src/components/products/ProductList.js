import { useState, useEffect } from "react"
import { useNavigate, useResolvedPath } from "react-router-dom"
import { SaveButtonClick } from "./ProductPurchase"
import "./products.css"


export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [purchases, setPurchases] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [buttonClick, setButton] = useState(false)
    const [user, setUser] = useState({})



    const kandyUser = JSON.parse(localStorage.getItem("kandy_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        }, [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType&_sort=name`)
                .then(res => res.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
            fetch(`http://localhost:8088/users/${kandyUser.id}?_embed=customers`)
                .then(res => res.json())
                .then((user) => {
                    setUser(user)
                })
            fetch(`http://localhost:8088/purchases`)
                .then(res => res.json())
                .then((data) => {
                    setPurchases(data)
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
                            <button
                                onClick={() => SaveButtonClick(product, user, purchases, setPurchases)}
                                className="purchase_button"
                            >Purchase</button>

                        </section>
                    }
                )
            }
        </article>
    </>
}

