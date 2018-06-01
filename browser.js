var nodeList = document.querySelector('#searchList .ivu-table-wrapper').querySelectorAll('.ivu-table-row')
var searchObj = []
var host = location.host
var proto = location.protocol
var origin = proto + '//' + host

var companyName = '';
for (var i = 0; i < nodeList.length; i++) {
    var t1 = nodeList[i].querySelectorAll('.ivu-table-cell')[1].querySelector('.app-info .small-txt')
    // var t2 = nodeList[i].querySelectorAll('.ivu-table-cell')[1].querySelector('.app-info .small')
    if (t1) {
        companyName = t1.innerHTML
    } else {
        companyName = t2.innerHTML
    }
	searchObj.push({
		no: nodeList[i].querySelectorAll('.ivu-table-cell')[0].querySelector('span').innerHTML,
		link: origin + nodeList[i].querySelectorAll('.ivu-table-cell')[1].querySelector('.app-info a').getAttribute('href'),
		appName: nodeList[i].querySelectorAll('.ivu-table-cell')[1].querySelector('.app-info .info-content a').innerHTML,
		companyName: companyName
	})
}
function funDownload (content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};
funDownload(JSON.stringify(searchObj), 'search.json')