import React from 'react'
import {Nav, Brand, Swipe} from 'app/components'
export default class index extends React.Component {
  state = {
    banners: [
      {
        img: 'http://temp.im/640x314/FF2D55/000',
        title: '澳洲发现最大恐龙脚化石',
        link: '/hot'
      },
      {
        img: 'http://temp.im/640x314/3debd4/000',
        title: '日前朝鲜计划登陆太阳',
        link: '/hot'
      },{
        img: 'http://temp.im/640x314/3debd4/000',
        title: '日前朝鲜计划登陆太阳',
        link: '/hot'
      }
    ]
  };

  render() {
    const settings = {
      dots: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const {banners} = this.state;
    return (
      <div>
        {banners && banners.length > 0 && <Swipe data={banners} {...settings} />}
        <h1>adsf234</h1>
        <Nav />
      </div>
    )
  }
}
