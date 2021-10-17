import { useContext } from "react"
import Link from "next/link"
import NextImage from "./Image"

import styles from "../styles/navbar.module.scss"

import AuthContext from "../context/AuthContext"
const Navbar = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="flex justify-between ml-6 mr-6 mt-4">
      <Link href="/">
        <a>
          <NextImage
            src="/strapi.png"
            alt="home"
            className="logo"
            height="44"
            width="150"
          />
        </a>
      </Link>
      <button className="snipcart-checkout flex items-center">
        <NextImage height="150" width="150" src="/cart.svg" alt="Cart" />
        <span className="snipcart-total-price ml-3 font-semibold text-sm text-indigo-500"></span>
      </button>
      <div>
        {user ? (
          <Link href="/account">
            <a className={styles.loginBtn}>{user.email}</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className={styles.loginBtn}>Login</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
