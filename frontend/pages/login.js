import { useContext, useState } from "react"
import Head from "next/head"
import styles from "../styles/login.module.scss"

import AuthContext from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")

  const { user, loginUser } = useContext(AuthContext)
  console.log(user)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(email)
    loginUser(email)
  }
  return (
    <div>
      <Head>
        <title>Strapi Next.js E-commerce</title>
      </Head>
      <section className={styles.formContainer}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="eg. michael@dundermifflin.com"
          ></input>
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  )
}

export default Login
