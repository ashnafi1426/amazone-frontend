import React from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import classes from "./Lowerheade.module.css"
function LowerHeader() {
  return (
    <div className={classes.lower_header}>
      <ul className={classes.menu}>
        <li className={classes.menu_item}>
          <AiOutlineMenu size={18} />
          <span>All</span>
        </li>
        <li className={classes.menu_item}>Today's Deals</li>
        <li className={classes.menu_item}>Customer Service</li>
        <li className={classes.menu_item}>Registry</li>
        <li className={classes.menu_item}>Gift Cards</li>
        <li className={classes.menu_item}>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader
