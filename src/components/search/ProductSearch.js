export const ProductSearch = ({ setterFunction }) => {
    return (
        <div><h2>What candy are you looking for?</h2>
            <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
             type="text" placeholder="Enter search terms"/>
        </div>
    )
}

