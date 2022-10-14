import { useEffect, useState } from "react"
import "./locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

useEffect(
    () => {
        fetch(`http://localhost:8088/locations`)
            .then(res => res.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
    }, []
)

return <>
    <h2>Locations</h2>
    <article className="locations">
        {locations.map(
            (location) => {
                return <section key={location.id} className="location">
                    <div className="location_div">Location {location.id}</div>
                   <div className="location_div">{location.address}</div>
                   <div className="location_div">Square footage: {location.squareFootage}</div>
                    
                </section>
            }
        )
        }
    </article>
</>
}