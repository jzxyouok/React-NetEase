import React from "react";
import NavLink from "./NavLink";
import s from "./index.scss";

export default () =>
    <div>
        <div style={{height: '1.2rem'}}></div>
        <div className={s.root}>
            <NavLink
                pathUrl="/"
                icoName={"i-repeat"}
                active={s.navOne}
                linkName="首页"
            />
            <NavLink
                pathUrl="/hot"
                icoName="i-head"
                active={s.navTwo}
                linkName="我"
            />
        </div>
    </div>;
