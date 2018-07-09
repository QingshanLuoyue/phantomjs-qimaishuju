var http = require('http'); 
var fs = require('fs'); 

console.log('args', process.argv)
var port
if (process.argv.length === 3) {
    port = Number(process.argv[2]);
} else {
    port = 8080;
}
console.log('node port: ', port)
// var port = 8080
var options = {}
var data = {}
var req
var searchCount = 0
var useArr

var origindataPath = './origindata/search.json'

var searchTypeStoragePath = './storage/1-searchType.txt'

var downloadPageStoragePath = './storage/3-downloadPageHistory.txt'
var downloadNumStoragePath = './storage/4-downloadNumHistory.txt'
var finalDataStoragePath = './storage/5-finalDataHistory.txt'

var downloadPageFilePath = './tempdata/3-downloadPage.txt'
var downloadNumFilePath = './tempdata/4-downloadNum.txt'
var finalDataFilePath = './tempdata/5-finalData.txt'


/*********************************************************************************/
// 生成数据
function productUseArr(readPath) {
    let result = []
    if (readPath === origindataPath) {
        console.log(1)
        result = JSON.parse(fs.readFileSync(readPath, { encoding: 'utf-8'}))
        for (var i = 0; i < result.length; i++) {
            result[i].shelvesLink = result[i].link.replace(/baseinfo/, 'shelves')
            result[i].downTotalLink = result[i].link.replace(/baseinfo/, 'downTotal')
            result[i].readPath = readPath
        }
        console.log(11)
        
    } else {
        console.log(2, readPath)
        result = fs.readFileSync(readPath, { encoding: "utf-8" }).toString().replace(/\n$/, '').split('\n')
        for (let index = 0; index < result.length; index++) {
            result[index] = JSON.parse(result[index])  
            result[index].readPath = readPath
        }
        result = uniqueArr(result)
        console.log('uniqueArr = ', result)
        console.log(22)
        
    }
    console.log('新一轮数据，数据长度 = ', result.length);    
    console.log('********************************************************************\n');    
    return result
}
// useArr = JSON.parse('[' + fs.readFileSync(originDataPath, { encoding: 'utf-8'}).toString().replace(/\n$/, '').split('\n') + ']');
// 数组去重
function uniqueArr(data) {
    var res = [data[0]];
    for (var i = 1; i < data.length; i++) {
         var flag = false;
        for (var j = 0; j < res.length; j++) {
            if (data[i].no == res[j].no) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            res.push(data[i])
        }
    }
    return res;
}
/*********************************************************************************/

var searchTypeList = ['page', 'num', 'final']
var searchTypeCount = 0

var storagePathMap = {
    page: downloadPageStoragePath,
    num: downloadNumStoragePath,
    final: finalDataStoragePath,
}
var originDataPathMap = {
    page: origindataPath,// 当搜索类别是page时，读取数据源为downloadPageFilePath
    num: downloadPageFilePath,
    final: downloadNumFilePath,
}
var filePathMap = {
    page: downloadPageFilePath,// 当搜索类别是page时，写入数据源为downloadPageFilePath
    num: downloadNumFilePath,
    final: finalDataFilePath,
}
var propMap = {
    page: 'shelvesLink',
    num: 'downTotalLink',
    final: 'dlink',
}


var searchTypeCount = readStorage(searchTypeStoragePath) // 读取程序搜索类型
searchTypeCount = searchTypeCount ? searchTypeCount : 0;
if (searchTypeCount >= 3) {
    console.log('没有其他可以搜索了')
    console.log('********************************************************************\n');
    process.exit();
}
searchType = searchTypeList[searchTypeCount]

var currentStoragePath = storagePathMap[searchType]
var currentWriteFilePath = filePathMap[searchType]
var currentReadFilePath = originDataPathMap[searchType]
var currentProp = propMap[searchType]


useArr = productUseArr(currentReadFilePath)


var searchCount = readStorage(currentStoragePath) // 读取程序中途断点位置
searchCount = searchCount ? parseInt(searchCount) : 0;
if (searchCount >= useArr.length) {
    console.log('所有信息已经全部写入' + currentWriteFilePath + '文件！')
}
// 写入缓存
function writeStorage(num, storagePath) {
    fs.writeFileSync(storagePath, num, { flag: 'w'});
}
// 读取缓存
function readStorage(storagePath) {
    var t = fs.readFileSync(storagePath, { encoding: 'utf-8'});
    return t ? t : ''
}

console.log('currentStoragePath = ', currentStoragePath)
console.log('currentWriteFilePath = ', currentWriteFilePath)
console.log('currentReadFilePath = ', currentReadFilePath)
console.log('currentProp = ', currentProp)
console.log('searchCount = ', searchCount)
console.log('searchType = ', searchType)
console.log('searchTypeCount = ', searchTypeCount)
console.log('********************************************************************\n');

/*********************************************************************************/

// console.log(searchCount)
// 初始化发送10个请求
function initStart(useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam) {
    if (useArrParam.length >= 10 && (useArrParam.length - searchCount > 10)) {
        for (let index = searchCount; index < searchCount + 10; index++) {
            console.log(useArrParam[index])
            requestClient(useArrParam[index][currentPropParam], index, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam)
        }
    } else {
        for (let index = searchCount; index < useArrParam.length; index++) {
            // console.log(useArrParam)
            requestClient(useArrParam[index][currentPropParam], index, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam)
        }
    }
}
initStart(useArr, currentProp, currentWriteFilePath, currentStoragePath)

/*********************************************************************************/

var cacheList = {
    shelvesLink: [],
    downTotalLink: [],
    dlink: [],
}
function requestClient(linkUrl, index, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam) {
    //这是需要提交的数据 
    // console.log('linkUrl = ', linkUrl)
    options = { 
        hostname: '127.0.0.1', 
        port: port, 
        path: '/?url=' + linkUrl + '&no=' + index + '&type=' + currentPropParam + '&market=' + useArrParam[index].market, 
        method: 'GET' 
    }; 
       
    req = http.request(options, function (res) { 
        console.log('STATUS: ' + res.statusCode); 
        // console.log('HEADERS: ' + JSON.stringify(res.headers)); 
        res.setEncoding('utf8'); 
        res.on('data', function (chunk) { 
            var content = JSON.parse(chunk)
            console.log('BODY: ' + chunk);
            var innerCount = 0
            var innerLen = cacheList[currentPropParam].length
            for (let index = 0; index < cacheList[currentPropParam].length; index++) {
                if (cacheList[currentPropParam][index].no !== content.no) {
                    innerCount++
                }
            }
            if (innerCount !== innerLen) {
                console.log('有相同元素，抛弃，不往下执行') 
                console.log('********************************************************************\n');
                return 
            } else {
                cacheList[currentPropParam].push(content)
            }
            console.log('********************************************************************');
            console.log('index = ', index)
            console.log('useArr[index] = ', useArrParam[index])
            console.log('currentPropParam = ', currentPropParam)
            console.log('currentWriteFilePathParam = ', currentWriteFilePathParam)
            console.log('currentStoragePathParam = ', currentStoragePathParam)
            if (content.data) {
                for (var key in content.data) {
                    useArrParam[index][key] = content.data[key]
                }
            }
            var flag = writeToTxt(currentWriteFilePathParam, useArrParam[index])  // 写入数据
            writeStorage(searchCount, currentStoragePathParam)  // 返回成功,写入当前搜索序号缓存

            // 一轮已经搜索完毕，不再继续执行
            if (flag) return

            searchCount++;
            // console.log(useArrParam)
            console.log('searchCount1 = ', searchCount)
            if (searchCount < useArrParam.length) {
                console.log('searchCount2 = ', searchCount)
                console.log('useArrParam.length = ', useArrParam.length)
                pushRequest(useArrParam[searchCount][currentPropParam], searchCount, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam)  // 补充请求  凑齐10个
            }
        });
    }); 
       
    req.on('error', function (e) { 
        console.log('problem with request: ' + e.message); 
    }); 
       
    req.end();
}


/*********************************************************************************/

// 添加请求
function pushRequest(linkUrl, pushCount, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam) {
    requestClient(linkUrl, pushCount, useArrParam, currentPropParam, currentWriteFilePathParam, currentStoragePathParam)
}

// 写入数据
function writeToTxt(filePath, html) {
    // console.log('写入 = ', JSON.stringify(html))
    console.log('写入数据， 应用名称：' + html.appName)
    console.log('********************************************************************\n');
    var str = '';

    str += JSON.stringify(html) + '\n';

    /***********************/
    fs.writeFileSync(filePath, str, { flag: 'a'});

    if (searchCount >= useArr.length - 1) {
        console.log('所有详细信息已经全部写入' + filePath + '文件！')
        console.log('********************************************************************\n');

        
        // 读取当前已经录入的数据作为原始数据
        useArr = productUseArr(filePath)
        // 重置当前搜索序号
        searchCount = 0
        
        // 当前搜索类型序号加1
        searchTypeCount++
        writeStorage(searchTypeCount, searchTypeStoragePath)
        console.log('searchTypeCount = ', searchTypeCount)
        if (searchTypeCount === 3) {
            console.log('已经搜索完毕')
            console.log('********************************************************************\n');
            var processChild = require("child_process")
            var execFile = processChild.execFile
            // var duration = 1000 * 3;
            // var initTime = new Date();
            // var i = 0;
            // console.log('page init while', initTime);
            // while (new Date() - initTime < duration) {
            //     ++i;
            // }

            execFile("node", ["6_toJson.js"], null, function (err, stdout, stderr) {
                console.log("execFileSTDOUT:", JSON.stringify(stdout))
                console.log("execFileSTDERR:", JSON.stringify(stderr))
            })
            console.log('生成数据完毕')
            console.log('********************************************************************\n');

            console.log('退出程序')
            console.log('********************************************************************\n');
            sendToPhantomjsExit()
            process.exit()
        } else {
            // 获取当前搜索类型值
            var searchType = searchTypeList[searchTypeCount]

            currentStoragePath = storagePathMap[searchType]
            currentWriteFilePath = filePathMap[searchType]
            currentReadFilePath = originDataPathMap[searchType]
            currentProp = propMap[searchType]

            console.log('新一轮搜索')
            console.log('currentStoragePath = ', currentStoragePath)
            console.log('currentWriteFilePath = ', currentWriteFilePath)
            console.log('currentReadFilePath = ', currentReadFilePath)
            console.log('currentProp = ', currentProp)
            console.log('searchCount = ', searchCount)
            console.log('searchType = ', searchType)
            console.log('searchTypeCount = ', searchTypeCount)
            console.log('********************************************************************\n');
            initStart(useArr, currentProp, currentWriteFilePath, currentStoragePath)
            // pushRequest(useArr[searchCount][currentProp], searchCount, useArr, currentProp, currentWriteFilePath, currentStoragePath)  // 补充请求  凑齐10个            
            return true
        }
    }
}

// 搜索完毕关闭phantomjs
function sendToPhantomjsExit() {
    options = { 
        hostname: '127.0.0.1', 
        port: port, 
        path: '/?exit=yes', 
        method: 'GET' 
    }; 
       
    phantomjsReq = http.request(options, function (res) { 
        console.log('STATUS: ' + res.statusCode); 
        console.log('关闭phantomjs！')
        
    }); 
       
    phantomjsReq.on('error', function (e) { 
        console.log('problem with request: ' + e.message); 
    }); 
       
    phantomjsReq.end();
}