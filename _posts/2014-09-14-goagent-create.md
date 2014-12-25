---
layout: post
title:  "Mac中goagent上传时问题小结"
description: "技术分享"
tags : [python2.7,goagent,Mac,技术，分享,小窍门]
---
{% include JB/setup %}

在mac 中安装goagent上传，创建appid时会遇到几个问题。
以下是相关的几个解决办法：


1. Mac 中输入命令的注意事项。

  python2.7 updater.zip 上传时需要使用，此状态是否需要root权限，我也有些迷茫了。但最好使用sudo su 进入root账号。

  python2.7 proxy.py

2. 首次创建appid，updater.zip上传时，出现无法上传的问题。

 这个问题需要使用https://www.google.com/settings/security/lesssecureapps

 将访问不够安全账户功能开启后即可上传。

 上传时需要输入两次gmail账户。

 部署到服务器报错AttributeError: can't set attribute 

3. error 403  添加环境变量
 
