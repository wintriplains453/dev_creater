import { createContext, useState, useEffect, FC } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";

import { IAuthContext, defaultAuthContext } from "./IAuthProviderProps";

import useLocalStorage from "../utils/useLocalStorage";
import domain from "../constants/constants";

interface CustomJwtPayload extends JwtPayload {
    user_id: string; 
}

const AuthContext = createContext<IAuthContext>(defaultAuthContext)
export default AuthContext

export const AuthProvider: FC<any> = ({ children }) => {

  const [authTokens, setAuthTokens] = useLocalStorage("authTokens", defaultAuthContext.authTokens);
  const [user, setUser] = useLocalStorage("user", defaultAuthContext.user, "jwt")
  const [loading, setLoading] = useState<boolean>(true)

  const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${domain}/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    const data = await response.json()

    if (response.status === 200){
      setAuthTokens(data)
      setUser(jwtDecode(data))
      // const id = jwtDecode<CustomJwtPayload>(data.access)

      localStorage.setItem("authTokens", JSON.stringify(data));
      // router.push(`/profile/account/${id.user_id}`)
    } else {
        return data
    }
    return null
  }

  const registerUser = async (email: string, company_id: string, password: string, second_password: string) => {
    const response = await fetch(`${domain}/registration`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, second_password, company_id})
    })
    const data = await response.json()

    if (response.status === 201 || response.status === 200){
      localStorage.setItem("authTokens", JSON.stringify(data.token));
      return "verify"
    } else {
      return data
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
  }

  const createCompany = async(name: string) => {
    const response = await fetch(`${domain}/create_company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name})
    })
    const data = await response.json()
    return data
  }

  const contextData: IAuthContext  = {
    user, authTokens,
    setAuthTokens, setUser,
    registerUser, loginUser, logoutUser, createCompany
  }

  useEffect(()=>{
    if (authTokens) {
      setUser(jwtDecode(authTokens))
    } 
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
        {loading ? null : children}
    </AuthContext.Provider>
  )
}
