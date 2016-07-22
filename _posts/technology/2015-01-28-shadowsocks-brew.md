---
layout: post
category : 技术
title: "命令行使用shadowsocks下载"
description: "在终端中使用代理下载文件"
tagline: "终端下载技术"
tags : [Termial,Linux,Mac,代理]

---

###起因

部门领导出差，清早翘班刷完了《霍比特人3 五军之战》IMAX

回到公司一天百无聊赖，为了不虚度光阴，我决定在mac中试验wifi破解工具。

找到这两个工具：

> aircrack-ng
> reaver

但是使用brew 安装时发现总无法下载报错。

这才想起来shadowsocks全局无法应用到Termial中。

###解决

查到了proxychains这个工具，可以然终端中的命令使用代理权限


[github proxychains](https://github.com/shadowsocks/shadowsocks/wiki/Using-Shadowsocks-with-Command-Line-Tools)

On Mac OSX:

    brew install proxychains-ng

Make a config file at ~/.proxychains/proxychains.conf 

    strict_chain
    proxy_dns 
    remote_dns_subnet 224
    tcp_read_time_out 15000
    tcp_connect_time_out 8000
    localnet 127.0.0.0/255.0.0.0
    quiet_mode
    
    [ProxyList]
    socks5  127.0.0.1 1080


Then run command with proxychains.

    proxychains4 brew install reaver


    install reaver 15-01-28 23:01
    [proxychains] config file found: /Users/wudi/.proxychains/proxychains.conf
    [proxychains] preloading /usr/local/Cellar/proxychains-ng/4.7/lib/libproxychains4.dylib
    ==> Downloading https://reaver-wps.googlecode.com/files/reaver-1.4.tar.gz
    ######################################################################## 100.0%
    ==> Downloading https://gist.githubusercontent.com/syndicut/6134996/raw/16f1b4336c104375ff
    ######################################################################## 100.0%
    ==> Patching
    patching file src/80211.c
    Hunk #1 succeeded at 39 with fuzz 1.
    patching file src/80211.h
    patching file src/Makefile.in
    patching file src/iface.c
    patching file src/iface.h
    patching file src/init.c
    patching file src/wpsmon.c
    ==> ./configure --prefix=/usr/local/Cellar/reaver/1.4
    ==> make
    ==> make install
    🍺  /usr/local/Cellar/reaver/1.4: 7 files, 832K, built in 23 seconds


Perfect

Other expamle:

    proxychains4 curl https://www.twitter.com/
    proxychains4 git push origin master
    proxychains4 bash curl https://www.twitter.com/


虽然有这样，但是git已经通过配置文件出墙了。。

具体操作步骤忘记了。
