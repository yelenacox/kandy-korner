import { useState, useEffect } from "react"
import "./searchedProducts.css"


export const SearchedList = ( { searchTermState }) => {    
    const[products, setProducts] = useState([])
    const[filteredProducts, setFiltered] = useState([])

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
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedProducts)
        }, [searchTermState, products]
    )
    


    return <>
    <h2>Products</h2>  

    <article className="products">
        {filteredProducts
        .map(
            (product) =>  {
                return <section key={product.id} className="product">
                   <div className="product_div">{product.name}</div>
                   <div className="product_div">${product.price}</div>
                    {/* {searchTermState ? "Plops" :''} */}
                </section>             }
        )
        }
    </article>
</>
}

