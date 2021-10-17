import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Magic } from "magic-sdk"

const AuthContext = createContext()
import { MAGIC_PUBLIC_KEY } from "../utils/urls"

let magic
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email })
      console.log(email, "email")
      await setUser({ email })
      console.log(user, "user")
    } catch (error) {
      console.log(error)
    }
    router.push("/")
  }

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn()
      console.log(isLoggedIn, "isLoggedin")
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata()
        console.log(email)
        await setUser({ email })
        console.log(user)
        const token = await getToken()
        console.log("checkUserLoggedIn:", token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken()
      return token
    } catch (error) {
      console.log(error)
    }
  }
  const logoutUser = async () => {
    try {
      await magic.user.logout()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY)
    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
