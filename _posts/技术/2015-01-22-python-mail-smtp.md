---
layout: post
category : 技术
title: "使用pyhton SMTP发送邮件"
description: "搭建mail服务准备为kindle推送文章之一"
tagline: "技术就是生产力"
tags : [技术,Linux,Blog,mail ]

---

##首先完成使用python发送邮件
###使用163邮箱向工作邮箱发送邮件


    #!/usr/bin/env python
    # -*- coding: utf-8 -*-
    
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    import smtplib
    
    #创建一个带附件的实例
    msg = MIMEMultipart()
    
    #加邮件头
    msg['from'] = 'wwdd.23@163.com'
    msg['to'] = 'di.wu@i-soft.com.cn'
    msg['subject'] = 'hello world'
    #发送邮件
    try:
        server = smtplib.SMTP()
        server.connect('smtp.163.com')
        server.login('wwdd.23','xxxx')#XXX为用户名，XXXXX为密码
        server.sendmail(msg['from'], msg['to'],msg.as_string())
        server.quit()
        print '发送成功'
    
    except Exception, e:  
        print str(e) 


发送成功。


##第二部发送附件

>添加附件，使用att1


    att1 = MIMEText(open('/Users/wudi/github/mykindle/51cce9cd0120c.jpg', 'rb').read(), 'base64', 'gb2312')
    att1["Content-Type"] = 'application/octet-stream'
    att1["Content-Disposition"] = 'attachment; filename="picture.jpg"'#这里的filename可以任意写，写什么名字，邮件中显示什么名字
    msg.attach(att1)
    


>执行:

    $python sendmail.py


    发送成功


![](/images/sendmail.png )


___

上图内容可真没有用客户端发送什么的，只需执行命令即可。

完成邮箱的工作，下一步就是解决如何feed rss/atom文件，

转化为mobi格式，发送到kindle中了。

不要问，这个难道不需要服务器么？

告诉你一个秘密。。。我在公司的工作机从来都不关机呵呵哒

