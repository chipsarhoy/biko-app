import {createContext, useContext, useEffect, useState} from 'react';

const AuthToggleContext = createContext();

export function AuthToggleProvider({children}) {

    const [toggleForm, setToggleForm] = useState();

    return (
        <AuthToggleContext.Provider value={{toggleForm, setToggleForm}}>
            {children}
        </AuthToggleContext.Provider>
    )
}

export const useToggleForm = () => useContext(AuthToggleContext);
