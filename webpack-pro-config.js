/**
 * 产品模式下的 webpack 2.2.1 配置
 *
 * 注意。两种模式的配置有较大差异！！
 *
 * webpack 2.0+官方配置地址 https://webpack.js.org/configuration/externals/
 */

const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
];

module.exports = {
  devtool: "cheap-module-source-map",
  // 关于选项的选择，http://cheng.logdown.com/posts/2016/03/25/679045
  // 具体请参考 https://webpack.js.org/configuration/devtool/#components/sidebar/sidebar.jsx

  context: path.resolve(__dirname, "src"),
  // 注意，这里指定资源读取的根目录
  // https://webpack.js.org/configuration/entry-context/#components/sidebar/sidebar.jsx

  target: 'web',
  // https://webpack.js.org/configuration/target/

  entry: {
    vendor: ["react", "react-dom"],
    app: "index.js",
  },
  // https://webpack.js.org/configuration/entry-context/

  output: {
    path: path.join(__dirname, 'dist'),
    // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它

    publicPath: '',
    // 模板、样式、脚本、图片等资源对应的server上的路径

    filename: "bundle.js",
    // 命名生成的JS
  },
  // https://webpack.js.org/configuration/output/

  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        exclude:svgDirs,
        options: {
          limit: 15000
        }
      },
      {
        test:/\.(svg)$/i,
        loader:'svg-sprite-loader',
        include:svgDirs,
        options:{
          limit:15000
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },

      /*公有样式*/
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: path.resolve(__dirname, 'src/styles')
      },

      /*私有样式，模块化处理*/
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        include: path.resolve(__dirname, 'src/js')
      }
    ]
  },

  // 引入外部库
  // 适用于一些常用且体积较大的库，充分利用CDN加速，减轻服务器负担，降低加载时间！
  // https://webpack.js.org/configuration/externals/
  externals:{
    moment: 'moment'
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    // 这样，webpack在查找模块时，先查找 node_modules ，如果没找到则在 src 中查找

    extensions: [".js", ".json"],
    // 该配置项将不再要求强制转入一个空字符串，而被改动到了resolve.enforceExtension下
    // 相关文档 https://webpack.js.org/configuration/resolve/
  },

  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // 和 json-loader 一样，OccurrenceOrderPlugin 在 webpack 2.0中默认添加！
    // webapck 会给编译好的代码片段一个id用来区分
    // 而这个插件会让webpack在id分配上优化并保持一致性。
    // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

    new WebpackMd5Hash(),
    // Hash the files using MD5 so that their names change when the content changes.

    new webpack.optimize.UglifyJsPlugin({
      beautify: true, // 添加适当的空格和换行
      compress: {     // 开启代码压缩，包括DCE(dead code elimination)等
        warnings: true,   // 当因为副作用等原因DCE失败时，会在命令行中给出警告
        drop_console: true,   // 不用解释了吧
      },
      output: {comments: true},  // 保留注释，方便寻找`unused harmony`标签
      mangle: false   // 禁用变量混淆，以方便分析
    }),
    // 代码压缩
    // https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEV__: false
    }),
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // 指定入口文件(entry)哪个key需要提取，提取公用的，更新率低的部分。

      filename: "vendor.js",
      // (Give the chunk a different name) 此项如果省略默认生成 vendor.js

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    // https://webpack.js.org/plugins/commons-chunk-plugin/#components/sidebar/sidebar.jsx
    // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk

    new HtmlWebpackPlugin({
      title: '产品模式',

      filename: 'index.html',
      // 文件名以及文件将要存放的位置

      favicon: 'favicon.ico',
      // favicon路径

      template: 'index.html',
      // html模板的路径

      inject: 'body',
      // js插入的位置，true/'head'  false/'body'

      hash: true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

      minify: {
        removeComments: true,
        // 移除HTML中的注释

        collapseWhitespace: true,
        // 删除空白符与换行符

        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    })
  ],
};