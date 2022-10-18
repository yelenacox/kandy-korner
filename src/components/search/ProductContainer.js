import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { SearchedList } from "./SearchedList"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        <SearchedList searchTermState={searchTerms} />
    </>

}

