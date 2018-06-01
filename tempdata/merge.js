var fs = require('fs')


var mertPatha = './3-downloadPage.txt'
var mertPathb = './4-downloadNum.txt'

var finalPath = './5-finalData.txt'

var str = ''
var result = null;

fs.writeFileSync(finalPath, '', {flag: 'w'})


resulta = fs.readFileSync(mertPatha, { encoding: "utf-8" }).toString().replace(/\n$/, '').split('\n')
resultb = fs.readFileSync(mertPathb, { encoding: "utf-8" }).toString().replace(/\n$/, '').split('\n')
for (let index = 0; index < resulta.length; index++) {
    let ele = resulta[index]
    ele = JSON.parse(ele)
    for (let k = 0; k < resultb.length; k++) {
        let innerele = resultb[k]
        innerele = JSON.parse(innerele)
        if (innerele.no === ele.no) {
            if (innerele.totalDownloadNum) {
                ele.totalDownloadNum = innerele.totalDownloadNum
            }
        }
    }
    str = JSON.stringify(ele) + '\n';
    fs.writeFileSync(finalPath, str, {flag: 'a'})
}   
    
