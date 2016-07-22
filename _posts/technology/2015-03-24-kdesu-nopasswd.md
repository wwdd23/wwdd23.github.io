---
layout: post
category : 技术
title: "不输入密码运行kdesu"
description: "kdesu执行GUI程序时需要输入root密码"
tagline: "工作协同环境搭建"
tags : [Linux,KDE,sudo]
---



1. 开启当前用户,sudo执行不需输入密码功能。

`编辑 /etc/sudoers`

去除注释:

    ## Same thing without a password
    %wheel ALL=(ALL) NOPASSWD: ALL

2. 创建编辑一下内容文件:

KDE下常用kdesu以root权限执行GUI程序。默认情况下，即使root账户被禁用，kdesu仍会尝试使用su切换root。需要配置kdesu以使用sudo，创建/编辑/usr/share/config/kdesurc加入：

    [super-user-command]
    super-user-command=sudo


注销后尝试。
