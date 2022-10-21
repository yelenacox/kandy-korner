import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/productForm"
import { HiringForm } from "../employees/HiringForm"
import { EmployeeList } from "../employees/EmployeeList"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerEdit } from "../customers/CustomerEdit"

export const EmployeeViews = () => {
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
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="HiringForm" element={<HiringForm />} />
                <Route path="customers" element={<CustomerList />} />\
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
				<Route path="customers/:customerId/edit" element={ <CustomerEdit />} />
			</Route>
		</Routes>
	)
	

}