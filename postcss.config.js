/*
 * 官方推荐的 postcss 插件使用方式
 * https://npm.taobao.org/package/postcss-loader
 * */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 100,
      propWhiteList: [],
    })
  ]
};