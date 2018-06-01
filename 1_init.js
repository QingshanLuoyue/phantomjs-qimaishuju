var fs = require('fs');

function writeToTxt() {
	fs.writeFileSync('./tempdata/3-downloadPage.txt', '');
	fs.writeFileSync('./tempdata/4-downloadNum.txt', '');
	fs.writeFileSync('./tempdata/5-finalData.txt', '');
	
	
	fs.writeFileSync('./storage/1-searchType.txt', '0');

	fs.writeFileSync('./storage/3-downloadPageHistory.txt', '0');
	fs.writeFileSync('./storage/4-downloadNumHistory.txt', '0');
	fs.writeFileSync('./storage/5-finalDataHistory.txt', '0');

	console.log('已经置空完毕！接下来请执行');
}
writeToTxt();