import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations"
import { ProductList } from "../products/products"
import { ProductForm } from "../products/productForm"

export const ApplicationViews = () => {
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
			</Route>
		</Routes>
	)
	

}

