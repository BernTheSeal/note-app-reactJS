import { createContext, useEffect, useReducer } from "react";
import { getTime, getDay } from "../utils/TimeUtils";
import { v4 as uuidv4 } from 'uuid';

const noteStorageData = localStorage.getItem("allNotes") || '[]'
const listStorageData = localStorage.getItem("allList") || '[]'
const settingStorageData = localStorage.getItem("allSetting") || '{"list": true, "note": true}'


const initialState = {
    notes: JSON.parse(noteStorageData),
    list: JSON.parse(listStorageData),
    settings: JSON.parse(settingStorageData)
}

const reducer = (state, action) => {
    switch (action.type) {
        //*Note actions
        case 'ADD_NOTE':
            const { tittle, description } = action.payload
            return {
                ...state,
                notes: [{
                    id: uuidv4(),
                    tittle: tittle.trim(),
                    description: description.trim(),
                    list: null,
                    color: null,
                    time: getTime(),
                    day: getDay()
                },
                ...state.notes]
            }
        case 'DELETE_NOTE':
            const { deleteId } = action.payload
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== deleteId)
            };
        case 'EDIT_NOTE':
            const { editId, newTittle, newDescription } = action.payload
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === editId) {
                        return {
                            ...note,
                            tittle: newTittle.trim(),
                            description: newDescription.trim()
                        }
                    }
                    return note;
                })
            };
        //*List actions
        case 'ADD_LIST':
            const { listTittle, listColor } = action.payload
            return {
                ...state,
                list: [{
                    id: uuidv4(),
                    tittle: listTittle,
                    color: listColor
                },
                ...state.list]
            };
        case 'DELETE_LIST':
            const { deleteListId, deleteListName } = action.payload
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.list === deleteListName) {
                        return {
                            ...note,
                            list: null
                        }
                    }
                    return note
                }),
                list: state.list.filter(list => list.id !== deleteListId)
            };
        case 'ADDITION_LIST':
            const { listId, listName, color } = action.payload
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id == String(listId)) {
                        return {
                            ...note,
                            list: listName,
                            color: color
                        }
                    }
                    return note
                })
            };

        case 'REMOVE_FROM_LIST':
            const { removeListId } = action.payload
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === String(removeListId)) {
                        return {
                            ...note,
                            list: null
                        }
                    }
                    return note
                })
            }
        case 'EDIT_SETTINGS':
            const { what } = action.payload
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [what]: false
                }
            }
    }
}

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem("allNotes", JSON.stringify(state.notes))
    }, [state.notes])

    useEffect(() => {
        localStorage.setItem("allList", JSON.stringify(state.list))
    }, [state.list])

    useEffect(() => {
        localStorage.setItem("allSetting", JSON.stringify(state.settings))
    }, [state.settings])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}