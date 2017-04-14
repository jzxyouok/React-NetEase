import React from "react"
import {Link} from "react-router-dom"
import Slider from 'react-slick'
import s from './index.scss'

const Item = ({data}) =>
  data.link.indexOf('http://') > -1 ?
    <a href={data.link} className={s.link}>
      <span className={s.title}>{data.title}</span>
      <img src={data.img} className={s.img} alt={data.title} />
    </a> :
    <Link to={data.link} className={s.link}>
      <span className={s.title}>{data.title}</span>
      <img src={data.img} className={s.img} alt={data.title} />
    </Link>;

export default ({data, ...rest}) =>
  data.length === 1 ?
    <Item data={data[0]}/> :
    <Slider {...rest}>
      {data.map((item,index) => <div key={index}><Item data={item}/></div>)}
    </Slider>;