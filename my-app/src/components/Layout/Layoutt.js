import React from 'react'
import Header from "../Header/Header"
// import { Outlet } from 'react-router-dom'
function Layoutt({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
export default Layoutt;
 