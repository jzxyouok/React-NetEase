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
      <img src={data.img} className={s.img} alt={data.title} />
    </Link>;


export default class Index extends React.PureComponent {
  state = {
    title:''
  };

  componentDidMount(){
    const {data} = this.props;
    this.setState(() => ({title: data[0].title || ''}))
  }

  afterChange = (i) => {
    const {data} = this.props;
    this.setState(() => ({title: data[i].title || ''}))
  };

  render() {
    const {data, ...rest} = this.props;
    if(data.length === 1) {
      return <Item data={data[0]} />
    }
    return (
      <div className={s.root}>
        <span className={s.title}>{this.state.title}</span>
        <Slider afterChange={this.afterChange} {...rest}>
          {data.map((item,index) => <div key={index}><Item data={item}/></div>)}
        </Slider>
      </div>
    )
  }
}
