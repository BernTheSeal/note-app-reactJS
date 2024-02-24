import { useState } from "react"
import { handleInputLimit } from "../helpers/inputHelpers"
import { useContext, } from "react"
import { DataContext } from "../context/DataContext"

export default function AddListPage({ SetIsAddListPage }) {
    const [listTittle, setListTittle] = useState('')
    const [currentColor, setCurrentColor] = useState(null)

    const { dispatch } = useContext(DataContext)

    const colors = ['#3491a3', '#7eab02', '#8c52ff', '#ff1616', '#ff66c4', '#ff914d ', '#dab82e', '#896363', '#3cb371', '#4682b4', '#ff6347', '#ba55d3', '#ffa500', '#20b2aa ', '#800000', '#ffa07a']

    return (
        <div className="pages-container">
            <form>
                <div className="form-header">
                    <h3> Add List</h3>
                    <button onClick={() => SetIsAddListPage(false)}><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div className="form-main">
                    <input type="text" placeholder="list name" value={listTittle} onChange={(e) => {
                        setListTittle(e.target.value)
                        handleInputLimit(30, e, 'LIST', listTittle, setListTittle)
                    }} />
                    <div className="color-palet">
                        <h3>Choose a Color</h3>
                        <div className="colors">
                            <div className="colors-row">
                                {colors.slice(0, 8).map(color => (
                                    <div onClick={() => setCurrentColor(color)} className="circle" style={{ backgroundColor: color }}  >
                                        {currentColor === color
                                            ? <i class="fa-solid fa-check"></i>
                                            : null}
                                    </div>
                                ))}
                            </div>
                            <div className="colors-row">
                                {colors.slice(8, 16).map(color => (
                                    <div onClick={() => setCurrentColor(color)} className="circle" style={{ backgroundColor: color }}  >
                                        {currentColor === color
                                            ? <i class="fa-solid fa-check"></i>
                                            : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-footer">
                    <button className="grn-btn" onClick={(e) => {
                        e.preventDefault()
                        if (listTittle !== '' && currentColor !== null) {
                            dispatch({ type: 'ADD_LIST', payload: { 'listTittle': listTittle, 'listColor': currentColor } })
                        } else {
                            console.log('liste ismi veya color bos')
                        }
                    }}> Add </button>
                    <button onClick={() => SetIsAddListPage(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}