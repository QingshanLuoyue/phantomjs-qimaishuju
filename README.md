# phantomjs-qimaishuju
这是一个七麦数据的爬虫

>利用 phantomjs抓取动态js渲染的网页

##origindata目录存储 原始json数据

##tempdata目录存储 临时的中间数据，用来进行数据的转换

##storage目录存储 获取超链接／详细信息时程序中断的位置，以便下一次程序启动后接着上一次中断位置开始搜索

##result目录存储 最终生成的json数据

首先安装依赖文件
进入命令行工具 进入文件根目录   运行命令 cnpm install
等待安装完依赖文件之后执行以下命令


1、进入命令行工具 运行命令 node 11_init.js  置空相关txt文件,以及storage目录中的缓存文件


2、运行命令 phantomjs 2_getSatisfactionLinks.js（有时候会出现无法获取数据，一直在等待状态，未知原因，等待较长时间才会有反应）
   通过已得到的链接，在七麦数据上搜索信息，如果满足关键字 音频/视频 即符合条件 保留当前信息组

   结果将得到一个数组，数据存储在./tempdata/2-satisfactionLinks.txt

3、运行命令 phantomjs 3_getDownloadPage.js（有时候会出现无法获取数据，一直在等待状态，未知原因，等待较长时间才会有反应）
   遍历满足条件的数组，获取该应用的  bundleId / 版本 / 上架市场/ 下载页面 等等
   数据存储在./tempdata/3-downloadPage.txt

4、运行命令 phantomjs 4_getDownloadNum.js（有时候会出现无法获取数据，一直在等待状态，未知原因，等待较长时间才会有反应）
   遍历满足条件的数组，获取该应用的  总下载数量 
   数据存储在./tempdata/4-downloadNum.txt

注释：步骤3/4可以同时运行

5、运行命令 node 5_productData.js
   遍历phantomjs 3_getDownloadPage.js获取的数组，进入该应用的下载页面获取  apk下载链接 
   数据存储在./tempdata/5-finalData.txt

6、运行命令 node 6_toJson.js
   获取5-finalData.txt最终的数据   与   4-downloadNum.txt  中的totalDownloadNum下载总量合并，
   使用nodejs  fs模块写入生成json数据文件
   数据存储在./result/search.json


收工！