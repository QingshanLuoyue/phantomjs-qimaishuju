var fs = require('fs');

var system = require('system');  //get args
var args = system.args;
console.log(args)
if (args.length === 2) {
    var port = Number(args[1]);
} else {
    var port = 8080;
}
console.log(port)
var webserver = require('webserver');
var server = webserver.create()

// 第一部分
/********************************************************************/
// 1、原始数据
// var originDataPath = './tempdata/2-satisfactionLinks.txt'
// // 2、存储当前已经搜索到的有效位置
// var storagePath = './storage/3-downloadPageHistory.txt'
// // 3、将结果写入的文件的路径
// var filePath = './tempdata/3-downloadPage.txt'



// 第二部分
/********************************************************************/
// var useArr = [];
// useArr = JSON.parse('[' + fs.read(originDataPath).toString().replace(/\n$/, '').split('\n') + ']');
// console.log('useArr = ', '[' + fs.read(originDataPath).toString().replace(/\n$/, '').split('\n') + ']')


// 当前搜索列表序号
// var searchCount = readFromTxt() ? parseInt(readFromTxt()) : 0;
// if (searchCount >= useArr.length) {
//     // console.log('所有公司详细信息已经全部写入' + filePath + '文件！接下来请执行node step5_changeFinalDataToXlsx.js转换文本数据为xlsx数据！')
//     phantom.exit();
// }
// function readFromTxt() {
//     var readTxt = fs.read(storagePath);
//     return readTxt ? readTxt : ''
// }



// 第三部分
/********************************************************************/
// 初始化请求url
// var initialurl = encodeURI(useArr[searchCount].shelvesLink)
// console.log('0 = ', initialurl)

var failBack = { code: 0}

var service = server.listen(port, function(request, response) {
    // console.log('request = ', JSON.stringify(request))
    var query = getQuery(request.url)
    // var initialurl = encodeURI(request.url.slice(2).split('=')[1])
    var initialurl = query.url
    var no = query.no
    var type = query.type
    var market = query.market
    var exit = query.exit
    if (exit) {
        console.log('搜索完毕，关闭phantonjs进程')
        phantom.exit()
    }

    // console.log(JSON.stringify(xxx))
    // console.log('2=', initialurl)
    /********************************************************************/
    var page = require('webpage').create();
    page.settings.resourceTimeout = 30000;//timeout is 20s
    var USER_AGENTS = [
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; AcooBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
        "Mozilla/4.0 (compatible; MSIE 7.0; AOL 9.5; AOLBuild 4337.35; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
        "Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)",
        "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)",
        "Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 3.0.04506.30)",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.3 (Change: 287 c9dfb30)",
        "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.2pre) Gecko/20070215 K-Ninja/2.1.1",
        "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9) Gecko/20080705 Firefox/3.0 Kapiko/3.0",
        "Mozilla/5.0 (X11; Linux i686; U;) Gecko/20070322 Kazehakase/0.4.5",
        "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20",
        "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E; LBBROWSER)",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 LBBROWSER",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SV1; QQDownload 732; .NET4.0C; .NET4.0E; 360SE)",
        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)",
        "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1",
        "Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:16.0) Gecko/20100101 Firefox/16.0",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
        "Mozilla/5.0 (X11; U; Linux x86_64; zh-CN; rv:1.9.2.10) Gecko/20100922 Ubuntu/10.10 (maverick) Firefox/3.6.10"
    ];
    
    
    // 页面错误捕捉
    page.onError = function(msg, trace) {
        console.log("[Warning]This is page.onError", msg);
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
              msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }
        // console.error(msgStack.join('\n'));
    };
    // phantomjs错误捕捉
    phantom.onError = function(msg, trace) {
        console.log("[Warning]This is phantom.onError", msg);
        var msgStack = ['PHANTOM ERROR: ' + msg];
        if (trace && trace.length) {
          msgStack.push('TRACE:');
          trace.forEach(function(t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
          });
        }
          console.error(msgStack.join('\n'));
          phantom.exit(1);
    };
    
    
    /********************************************************************/
    // 一开始就获取失败的重试变量
    var failTryCount = 1;
    var failTryMaxNum = 3;
    
    // 获取到信息，但是没有搜索结果或者js还未执行得不到结果，从而进行重试的变量
    var reTryCount = 1;
    var reTryMaxNum = 3;
    
    
    function startSearch(initialurlParam) {
        var n = Math.floor(Math.random() * USER_AGENTS.length + 1) - 1;
        // console.log(initialurlParam)
        // console.log(no)
        //page.settings.userAgent= 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36';
        page.settings.userAgent = USER_AGENTS[n];
        page.open(initialurlParam, function(status) {
            //Page is loaded!
            console.log('\n')
            // console.log('当前搜索数据序号 = ', searchCount);
            console.log('搜索url = ', initialurlParam);
            console.log('搜索序号 = ', no);
            // console.log('搜索词语 = ', useArr[searchCount]);
            if (initialurlParam === 'undefined') {
                console.log('搜索url 为  undefined  直接返回空结果！')
                response.status = 200;
                // response.write(body);       //返回获取到的网页源码
                failBack.no = no;
                response.write(JSON.stringify(failBack));    //返回当前的网页url
                page.close();
                response.close();
                return;
            }
            console.log('1111*8888')
            if (status !== 'success') {
                if (failTryCount <= failTryMaxNum) {
                    console.log('获取失败，第'+ failTryCount +'次重试···');
                    // page.close();
                    startSearch(initialurlParam);
                    failTryCount++
                } else {
                    console.log('获取失败，第'+ failTryCount +'次重试失败，放弃，查询下一个···');
                    // 失败超过限制次数，放弃，执行获取下一个链接
                    // reSearch();
                    response.status = 200;
                    // response.write(body);       //返回获取到的网页源码
                    failBack.no = no;
                    response.write(JSON.stringify(failBack));    //返回当前的网页url
                    page.close();
                    response.close();
                }
            } else {
                // var current_url = page.url;  // 页面url
                // var body = page.content;    // 网页源码
                failTryCount = 1;
                window.setTimeout(function() {
                    // page.render("details.png"); //截图
                    page.includeJs("https://cdn.bootcss.com/jquery/1.11.3/jquery.min.js", function() {
                        // 第四部分
                        /********************************************************************/
                        var content = null;
                        console.log('type = ', type)
                        // evaluate执行JS
                        if (type === 'shelvesLink') {
                            // 市场/bundleid
                            console.log('shelvesLink1')
                            
                            content = page.evaluate(function() {
                                var BundleID = $('.app-header .appid .value').html()
                                var searchRes = $('#shelves .ivu-table-row');
                                var versionObj = []
                                searchRes.each(function(index, item){
                                    versionObj.push({
                                        market: $(item).find('.ivu-table-column-center').eq(0).find('.ivu-table-cell span').html(),
                                        appName: $(item).find('.ivu-table-column-center').eq(2).find('.ivu-table-cell div').html(),
                                        v: $(item).find('.ivu-table-column-center').eq(3).find('.ivu-table-cell div').html(),
                                        dlink: $(item).find('.ivu-table-column-center').eq(4).find('.ivu-table-cell a').attr('href'),
                                        bundleID: BundleID
                                    })
                                })
                                var finalRes = [];
                                for (var m = 0; m < versionObj.length; m++) {
                                    if (versionObj[m].market === '应用宝' && versionObj[m].dlink) {
                                        finalRes = versionObj[m];
                                        break;
                                    } else if (versionObj[m].market === '百度' && versionObj[m].dlink) {
                                        finalRes = versionObj[m]
                                        break;
                                    } else if (versionObj[m].market === '360' && versionObj[m].dlink) {
                                        finalRes = versionObj[m]
                                        break;
                                    }
                                }
                                if (finalRes.length === 0) {
                                    return '未上架'
                                } else if (!finalRes.dlink) {
                                    return '未上架'
                                }
                                return {data: finalRes, code: 'page'};
                                
                            })
                            console.log('shelvesLink2')
                        } else if (type === 'downTotalLink') {
                            // 下载量
                            console.log('downTotalLink1')
                            
                            content = page.evaluate(function() {
                                var totalDownloadNum = $('#down-total-stat .col-box.active').html() 
                                return { data: {totalDownloadNum: totalDownloadNum}, code: 'num'}
                            })
                            console.log('downTotalLinkk2')
                            
                        } else if (type === 'dlink') {
                            console.log('dlink1')
                            
                            // apk下载地址
                            if (market === '应用宝') {
                                content = page.evaluate(function() {
                                    // 获取搜索出来的公司详细信息
                                    var searchRes = $('.det-ins-btn-box .det-down-btn').attr('data-apkurl');
                                    return { data: {apkUrl: searchRes},  code: 'final'};
                                })
                            } else if (market === '百度') {
                                content = page.evaluate(function() {
                                    // 获取搜索出来的公司详细信息
                                    var searchRes = $('#doc .yui3-g .app-intro .area-download a').attr('href');
                                    return { data: {apkUrl: searchRes},  code: 'final'};
                                })
                            } else if (market === '360') {
                                content = page.evaluate(function() {
                                    // 获取搜索出来的公司详细信息
                                    var searchRes = $('#app-info-panel .js-downLog.dbtn').attr('href').match(/(^|&)url=([^&]*)(&|$)/)[2]
                                    return { data: {apkUrl: searchRes},  code: 'final'};
                                })
                            }
                            console.log('dlink2')
                            
                        }

                        
                        
                        console.log('content = ', JSON.stringify(content));
    
    
                        if (content === '未上架') {
                            reTryCount = 1;
                            console.log('未上架，放弃，查询下一个···');
                            // writeHistoryDetails(searchCount + 1)
                            // reSearch();
                            response.status = 200;
                            // response.write(body);       //返回获取到的网页源码
                            failBack.no = no;                    
                            response.write(JSON.stringify(failBack));    //返回当前的网页url
                            page.close();
                            response.close();
                        } else if (content) {
                            reTryCount = 1;
                            content.no = no
                            // for (var key in content) {
                            //     useArr[searchCount][key] = content[key]
                            // }
                            // writeToTxt(useArr[searchCount]);
                            response.status = 200;
                            // response.write(body);       //返回获取到的网页源码
                            response.write(JSON.stringify(content));    //返回当前的网页url
                            page.close();
                            response.close();
                        } else {
                            if (reTryCount <= reTryMaxNum) {
                                console.log('没有搜索到结果，可能是获取速度过快，js还未执行，第'+ reTryCount +'次重试···');
                                console.log('initialurlParam = ',initialurlParam)
                                // page.close();
                                startSearch(initialurlParam);
                                reTryCount++;
                            } else {
                                console.log('没有搜索到结果，可能是获取速度过快，js还未执行，第'+ reTryCount +'次重试失败，放弃，查询下一个···');
                                // 失败超过限制次数，放弃，执行获取下一个链接
                                // reSearch();
                                response.status = 200;
                                // response.write(body);       //返回获取到的网页源码
                                failBack.no = no;                    
                                response.write(JSON.stringify(failBack));    //返回当前的网页url
                                page.close();
                                response.close();
                            }
                        }
                        // 退出phantomJs， 必须写在includeJs里面， 否则可能jquery没加载完成， 便结束了phantom
                        
                        /********************************************************************/
    
                    })
                }, 2000);
            }
            
        });
    }
    
    // 开始启动---执行搜索
    startSearch(initialurl);


    // 第五部分  功能函数
    /********************************************************************/
    // 写入数据
    function writeToTxt(html) {
        // console.log('写入 = ', JSON.stringify(html))
        console.log('写入数据， 应用名称：' + html.appName)
        console.log('********************************************************************\n');
        var str = '';
        if (searchCount >= useArr.length) {
            str += JSON.stringify(html);
        } else {
            str += JSON.stringify(html) + '\n';
        }
    
        /***********************/
        fs.write(filePath, str, 'a');
        writeHistoryDetails(searchCount + 1)
        reSearch();
    }
    
    // 重新执行搜索函数
    function reSearch() {
        searchCount++;
        failTryCount = 1;
        reTryCount = 1;
        if (searchCount >= useArr.length) {
            console.log('所有详细信息已经全部写入' + filePath + '文件！')
            phantom.exit();
        }
        var link = changeSearchWord(searchCount);
        startSearch(link);
    }
    // 切换搜索关键字
    function changeSearchWord(searchWordIndex) {
        var initialurl = encodeURI(useArr[searchWordIndex].shelvesLink)
        return initialurl;
    }
    // 写入当前已经搜索过的序号到本地文件 作为缓存
    function writeHistoryDetails(num) {
        fs.write(storagePath, num, 'w');
    }
})

function getQuery(url) {
    var matches = url.match(/([^?=&]+)(=([^&]*))?/g);
    matches.shift();
    return matches.reduce(function(a, b){var item = b.split('='); a[item[0]] = item[1] ; return a}, {});
}

var process = require("child_process")
var execFile = process.execFile
var duration = 1000 * 3;
var initTime = new Date();
var i = 0;
console.log('page init while', initTime);
while (new Date() - initTime < duration) {
    ++i;
}

execFile("node", ["node-client.js", port], null, function (err, stdout, stderr) {
    // console.log("execFileSTDOUT:", JSON.stringify(stdout))
    // console.log("execFileSTDERR:", JSON.stringify(stderr))
    console.log('搜索完毕，关闭phantonjs进程')
    console.log('********************************************************************\n');
    phantom.exit()
})