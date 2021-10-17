import { Fragment, useContext, useState, useEffect } from "react"
import Head from "next/head"
import styles from "../styles/login.module.scss"
import { useRouter } from "next/router"

import AuthContext from "../context/AuthContext"
// import { API_URL } from ""

const API_URL = "http://localhost:1337"

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const token = await getToken()
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const data = await order_res.json()
          setOrders(data)
        } catch (error) {
          setOrders([])
        }
      }
    }
    fetchOrders()
  }, [user])
  return orders
}

const Account = () => {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState(true)

  const { user, logoutUser, getToken } = useContext(AuthContext)
  console.log(user)

  const orders = useOrders(user, getToken)
  console.log("account orders", orders)

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
          <section>
            <h2>Your orders</h2>
            {orders?.map((order, index) => {
              return (
                <div key={index}>
                  Order Name:{order.checkout_session} <br />
                  Order Status: {order.status}
                  Product Details:{" "}
                  <div>
                    Product Name: {order.product.title} <br />
                    Product Description: {order.product.description}
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      )}
    </Fragment>
  )
}

export default Account
