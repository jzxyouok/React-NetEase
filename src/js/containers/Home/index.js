import React from 'react'
import {Nav, Brand, Swipe} from 'app/components'
export default class index extends React.Component {
  state = {
    banners: [
      {
        img: 'http://placekitten.com/g/750/380',
        title: '澳洲发现最大恐龙脚化石',
        link: '/hot'
      },
      {
        img: 'http://placekitten.com/g/750/380',
        title: '日前朝鲜计划登陆太阳',
        link: '/hot'
      },{
        img: 'http://placekitten.com/g/750/380',
        title: '日前朝1234',
        link: '/hot'
      }
    ]
  };

  render() {
    const settings = {
      dots: true,
      arrows: false,
      speed: 500,
      dotsClass: 'swipe-dots',
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const {banners} = this.state;
    return (
      <div>
        <Brand />
        {banners && banners.length > 0 && <Swipe data={banners} {...settings} />}
        <h1>adsf234</h1>
        <Nav />
      </div>
    )
  }
}
