const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require('fs')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {

  handleMD()
  
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

/**
 * 更新文章list:
 * 用于读取"articles"文件夹下的所有".md"文件，
 * 并提取文件主题(subject)、标题(title)、标签(tags)、摘要(summary)、日期(date)等内容
 * 将提取的articles、dates、tags内容写入"list"文件
 */
async function handleMD () {
  let articles = []
  const dir = await fs.promises.opendir("./articles/article");
  for await (const md of dir) {
    let content = fs.readFileSync(`./articles/article/${md.name}`, {"encoding": "utf8"});

    const head = content.split("---")[1]
    let obj = {}
    obj.fileName = md.name

    if (head.includes('subject:')) {
      obj.subject = head.match(/subject:(.+)/)[1].replace(/\s/g, "")
    }
    if (head.includes('title:')) {
      obj.title = head.match(/title:(.+)/)[1].replace(/\s/g, "")
    }
    if (head.includes('tags:')) {
      let tagArr = head.match(/( +- +[^\n]+){1,10}/g)
      obj.tags = []
      for (let tag of tagArr) {
        obj.tags.push(tag.replace(' - ', "").replace(/\s/g, ""))
      }
    }
    if(head.includes('summary:')) {
      obj.summary = head.match(/summary:(.+)/)[1].replace(/\s/g, "")
    }
    if (head.includes('date:')) {
      obj.date = head.match(/date:(.+)/)[1].replace(/\s/g, "").replace(/-/g, "")
    }
    articles.push(obj)
  }
  articles.sort(compare ("date")) // 文章按日期从晚到早排序

  let dates = {}
  let tags = {}

  for (let item of articles) { // 以articles为基础生成dates(日期)、tags(标签)对象
    dates[item.date] ? dates[item.date].push(item.title) : dates[item.date] = [item.title];
    for (let tag of item.tags) {
      tags[tag] ? tags[tag].push(item.title) : tags[tag] = [item.title];
    }
  }

  // 将对象转换成字符串
  let formatArticles = format(articles, 1, "")
  let formatDates = format(dates, 1, "")
  let formatTags = format(tags, 1, "")
  formatTags = formatTags.substring(0, formatTags.length - 1)

  fs.writeFile('./articles/list.js', `export default {\n  articles:${formatArticles}\n  dates:${formatDates}\n  tags:${formatTags}\n}\n`, function(err) {
    if (err) { return console.err(err) }
    console.log('文章列表文件更新成功')
  })
}

/**
 * Object转String:
 * 将对象或数组转化成格式规范的字符串
 * @param {*} data - 对象/数组
 * @param {*} level - 层级
 * @param {*} str - 用于拼接的初始字符串
 */
function format (data, level, str) {
  if (typeof data !== "object") { return }
  let tab = (new Array(2 * level + 1)).join(" ")
  let tabs = (new Array(2 * (level + 1) + 1)).join(" ")

  if (Array.isArray(data)) { // Array

    str += `\n${tab}[`
    for (let item of data) {
      if (typeof item == 'object') {
        let levels = Number(level) + 1
        str = format (item, levels, str)
      } else {
        str += `\n${tabs}'${item}',`
      }
    }
    str = str.substring(0, str.length - 1) + `\n${tab}],`

  } else { // Object

    str += `\n${tab}{`
    for (let key in data) {
      if (typeof data[key] == 'object') {
        str += `\n${tabs}${key}:`
        let levels = Number(level) + 1
        str = format(data[key], levels, str)
      } else {
        str += `\n${tabs}${key}: '${data[key]}',`
      }
    }
    str = str.substring(0, str.length - 1) + `\n${tab}},`
  }
  return str
}

/**
 * 将对象按时间从晚到早排序的函数:
 * @param {*} key - 键名
 * @returns
 */
function compare (key) {
  return function (obj1, obj2) {
    let num1 = Date.parse(obj1[key])
    let num2 = Date.parse(obj2[key])
    return num2 - num1
  }
}