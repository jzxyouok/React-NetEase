import React from "react";
import {NavLink} from "react-router-dom";
import s from "./index.scss";

export default ({pathUrl, active, icoName, linkName, ...rest}) =>
  <NavLink
    {...rest}
    to={pathUrl}
    activeClassName={active}
    className={s.root}
  >
    <i className={icoName + ' ' + s.ico} />
    <span className={s.text}>{linkName}</span>
  </NavLink>;