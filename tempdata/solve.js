var fs = require('fs')

// var readPath = './3-downloadPage.txt'
var readPath = './4-downloadNum.txt'
// var writePath = './3-downloadPage.txt'
var writePath = './4-downloadNum.txt'

var str = ''
var result = null;



result = fs.readFileSync(readPath, { encoding: "utf-8" }).toString().replace(/\n$/, '').split('\n')
fs.writeFileSync(writePath, '', {flag: 'w'})
for (let index = 0; index < result.length; index++) {
    let ele = result[index]
    ele = JSON.parse(ele)
    if (ele.data) {
        for (var key in ele.data) {
            ele[key] = ele.data[key]
        }
        delete ele.data
    }
    str = JSON.stringify(ele) + '\n';

    fs.writeFileSync(writePath, str, {flag: 'a'})
}   
    
