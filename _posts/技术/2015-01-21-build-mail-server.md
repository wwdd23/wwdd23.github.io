---
layout: post
category : 技术
title: "在Unix/Linux搭建mail服务"
description: "搭建mail服务准备为kindle推送文章"
tagline: "技术就是生产力"
tags : [技术,Linux,Blog,mail ]

---


##首先需要搭建一个mail服务器

建议使用linux系统

修改/etc/mail.rc文件 , 利用外部邮箱发送邮件

et from=wwdd.23@163.com
set smtp=smtp.163.com
set smtp-auth-user=wwdd.23
set smtp-auth-password=075100.321
set smtp-auth=login


设置之后就可以给外部邮箱发送邮件了，have a test:

$ mail -s "test" di.wu@i-soft.com.cn < /dev/null

发送一个正文为空的邮件到i-soft.com.cn邮箱中（/dev/null）

#第二部发送一个附件
