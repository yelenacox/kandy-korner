import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations"
import { ProductForm } from "../products/productForm"
import { ProductList } from "../products/ProductList"
import { ProductContainer } from "../search/ProductContainer"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
				<h1>Kandy Korner</h1>
				<Outlet />
				</>
			}>
				<Route path="locations" element={ <LocationList />} />
				<Route path="products" element={<ProductList />} />
				<Route path="productForm" element={<ProductForm />} />
                <Route path="/search" element={<ProductContainer /> }/>
			</Route>
		</Routes>
	)
	

}