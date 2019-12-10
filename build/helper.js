const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootPath = path.resolve('src', 'pages')
const titles = {}

const setAllEntries = () => {
  const entries = {}
  fs.readdirSync(rootPath).forEach(fileName => {
    entries[fileName] = path.join(rootPath, fileName, 'main.js')
  })
  return entries
}

const setHtmlPlugin = () => {
  const htmlPlugins = []
  fs.readdirSync(rootPath).forEach(fileName => {
    htmlPlugins.push(new HtmlWebpackPlugin({
      title: titles[fileName] || 'The end of the fucking world',
      filename: `${fileName}.html`,
      template: path.join(rootPath, fileName, 'index.pug'),
      inject: true,
      chunks: [fileName, 'vendor', 'common', 'common_style']
    }))
  })
  return htmlPlugins
}

module.exports = {
  setAllEntries,
  setHtmlPlugin
}
