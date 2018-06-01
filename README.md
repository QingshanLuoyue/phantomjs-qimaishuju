# qimaishuju
七麦数据数据抓取
>利用 phantomjs抓取动态js渲染的网页

## origindata目录存储 原始json数据

## tempdata目录存储 临时的中间数据，用来进行数据的转换

## storage目录存储 获取超链接／详细信息时程序中断的位置，以便下一次程序启动后接着上一次中断位置开始搜索

## result目录存储 最终生成的json数据

首先安装依赖文件
进入命令行工具 进入文件根目录   运行命令 cnpm install
等待安装完依赖文件之后执行以下命令


1、进入命令行工具 运行命令 node 1_init.js  置空相关txt文件,以及storage目录中的缓存文件


2、运行命令 phantomjs 2_getDownloadPage.js

收工！