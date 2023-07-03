import fs from 'fs-extra'
import path from 'path'

export function deleteFolder(folderPath) {
  fs.rmSync(folderPath, { recursive: true, force: true });
}

export function ensureDirExists(filePath) {
  var currentDirName = path.dirname(filePath)
  if (fs.existsSync(currentDirName)) return true
  ensureDirExists(currentDirName) // check nested dir
  fs.mkdirSync(currentDirName) // create folder for this one
}

export function readJson(path) {
  const text = fs.readFileSync(path, 'utf8')
  const parsed = JSON.parse(text)
  return parsed
}

export function saveJson(path, object) {
  ensureDirExists(path)
  fs.writeFileSync(path, JSON.stringify(object, null, 2))
}

export function readText(path) {
  const str = fs.readFileSync(path, 'utf8')
  return str
}

export function saveText(path, str) {
  ensureDirExists(path)
  fs.writeFileSync(path, str)
}

export function shuffle(array) {
  if (!array) return []
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function getRandomItems(list, count) {
  let shuffledList = shuffle(list)
  return shuffledList.slice(0, count)
}

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function padInt(number, length) {
  let str = '' + number
  while (str.length < length) {
    str = '0' + str
  }
  return number.toString().padStart(4, '0')
}

export const timer = (ms) => new Promise((res) => setTimeout(res, ms))

export function daysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  let month = date.getMonth() + 1 // months are zero indexed
  let day = date.getDate()
  let monthPadded = month.toString().padStart(2, '0')
  let dayPadded = day.toString().padStart(2, '0')
  return `${year}-${monthPadded}-${dayPadded}`
}
