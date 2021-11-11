import { createContext, useReducer } from 'react'

// return a new context object
export const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_FONT_SIZE':
            return { ...state, fontSize: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state
    }
}

export function ThemeProvider({ children }) {

    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',
        fontSize: '18px',
        mode: 'dark'
    })

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }

    const changeFontSize = (fontSize) => {
        dispatch({ type: 'CHANGE_FONT_SIZE', payload: fontSize })
    }

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    // pass custom logic here

    // children is App component
    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeFontSize, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}