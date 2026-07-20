"use client"
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

export const DisplayThemeContext = createContext('default');

interface DisplayThemeProviderProps {
    children: React.ReactNode
}

export function DisplayThemeProvider(props: DisplayThemeProviderProps) {
    const [theme, setTheme] = useState('default');

    const changeTheme = useCallback((themeValue: string) => {
        setTheme(themeValue)
    }, [])

    const themeValue = useMemo(() => ({
        theme,
        changeTheme
    }), [theme, changeTheme])

    return (
        <DisplayThemeContext value={String(themeValue)}>
            {props.children}
        </DisplayThemeContext>
    )
}