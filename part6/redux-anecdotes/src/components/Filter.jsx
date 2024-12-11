import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch() // hook to make changes to (dispatch actions to) state of the Redux store defined in main.jsx
  
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value
    dispatch(filterChange(filter.toLowerCase()))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter