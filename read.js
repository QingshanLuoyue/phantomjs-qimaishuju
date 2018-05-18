var fs = require('fs')

var searchObj = ''

searchObj = fs.readFileSync('./tempdata/search.json', { encoding:"utf-8" })
console.log(searchObj)