import React, { useState, createContext } from 'react';

export const ThemeContext = createContext() // Creation du context pour le theme, un contexte permet de partager des donnees entre differents composants

export const ThemeProvider = ({ children }) => { // ThemeProvider est un composants qui sert a envelopper d'autres composants pour fournie l'accès au contexte
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
 
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const SurveyContext = createContext()

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({})
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers })
  }

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}