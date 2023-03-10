import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../utils/styles/account.scss'

import Login from '../components/organisms/login'
import Logout from '../components/molecules/logout'
import DashBoard from '../components/organisms/account/dashboard'
import Address from '../components/organisms/account/address'
import AccountDetails from '../components/organisms/account/details'
import OrderList from '../components/organisms/account/orderList'
import {
  toAddShippingAddress,
  toHandleTestField,
} from '../components/atoms/Services/accountServices'

import { Context } from '../utils/Context'

export default function Account() {
  const {
    userData,
    shippingAddress,
    ordersByUser,
    getShippingAddress,
    targetCategory,
    accountCategories,
    getUser,
  } = useContext(Context)
  const [showSection, setShowSection] = useState('dashboard')
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    setCategory(targetCategory)
  }, [targetCategory])

  const handleShowSection = (section) => {
    setShowSection(section)
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  const handleAddBillingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.billing,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'billing'
    )
    getUser()
  }

  const handleAddShippingAddress = async (e) => {
    toAddShippingAddress(e, accountCategories.shipping, userData, {
      errorMsg: handleSubmitErrorMsg,
    })
    getShippingAddress()
  }

  const handleTestFields = () => {
    toHandleTestField(
      targetCategory.category,
      targetCategory.name,
      targetCategory.message,
      {
        errorMsg: handleSubmitErrorMsg,
      }
    )
  }

  return (
    <>
      {!userData.id && <Login />}
      {userData.id && (
        <>
          <div className="account">
            <section className="account">
              <h2 className="">VOTRE COMPTE</h2>
              <div className="account__main">
                <nav className="account__main__nav">
                  <ul>
                    <li
                      className="account__main__nav__accountBoard"
                      onClick={() => handleShowSection('dashboard')}
                    >
                      Tabeau de bord
                    </li>
                    <li
                      className="account__main__nav__orderList"
                      onClick={() => handleShowSection('orderList')}
                    >
                      Commandes
                    </li>
                    <li
                      className="account__main__nav__address"
                      onClick={() => handleShowSection('address')}
                    >
                      Adresses
                    </li>
                    <li
                      className="account__main__nav__accountDetails"
                      onClick={() => handleShowSection('accountDetails')}
                    >
                      Details du compte
                    </li>
                    <Logout
                      name="logout"
                      className="account__logout"
                      origin="account"
                    />
                  </ul>
                </nav>
                <div className="account__main__content">
                  {showSection === 'dashboard' && (
                    <DashBoard userData={userData} orders={ordersByUser} />
                  )}
                  {showSection === 'orderList' && (
                    <OrderList userData={userData} orders={ordersByUser} />
                  )}
                  {showSection === 'address' && (
                    <Address
                      userData={userData}
                      shippingAddress={shippingAddress}
                      onSubmitBillingAddress={handleAddBillingAddress}
                      onSubmitShippingAddress={handleAddShippingAddress}
                      errorMsg={errorMsg}
                      handleBlur={handleTestFields}
                      handleChange={() => setErrorMsg('')}
                      categories={accountCategories}
                    />
                  )}
                  {showSection === 'accountDetails' && (
                    <AccountDetails userData={userData} />
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}
