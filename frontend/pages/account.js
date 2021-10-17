import { Fragment, useContext, useState, useEffect } from "react"
import Head from "next/head"
import styles from "../styles/login.module.scss"

import AuthContext from "../context/AuthContext"
import { useRouter } from "next/router"

const Account = () => {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState(true)

  const { user, logoutUser } = useContext(AuthContext)
  console.log(user)

  const handleLogout = () => {
    logoutUser()
  }

  useEffect(() => {
    user ? setLoadingState(false) : null
  }, [user])

  return (
    <Fragment>
      {loadingState ? (
        <div>Loading</div>
      ) : (
        <div>
          <Head>
            <title>Account</title>
          </Head>
          <section className={styles.dashboardContainer}>
            <h1>{user?.email}</h1>
            <button onClick={handleLogout}>Logout</button>
          </section>
        </div>
      )}
    </Fragment>
  )
}

export default Account
