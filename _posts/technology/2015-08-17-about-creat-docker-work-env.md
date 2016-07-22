---
layout: post
category : 技术
title: "搭建docker工作环境的相关文档"
description: "有关docker工作环境的搭建"
tagline: "技术就是生产力"
tags : [技术,OSX,Blog,docker,Ruby on Rails ]

---
##项目环境搭建 For OSX


 
- ruby [1.9.3/2.2.2]
- rails install
- mysql mysql2
- mongodb install for OSX
- Docker Configure
- rails server start error ruby-1.9.3-p551/gems/railties-4.1.4/lib/rails/application/configuration.rb:105:in `database_configuration': Cannot load `Rails.application.database_configuration`: (RuntimeError)



##Ruby Install For OSX
[Ruby 安装相关地址 https://ruby-china.org/wiki/install_ruby_guide](https://ruby-china.org/wiki/install_ruby_guide)

1. 安装RVM

`$ curl -L https://get.rvm.io | bash -s stable`

然后，载入 RVM 环境（新开 terminal 就不用这么做了，会自动重新载入的）

`$ source ~/.rvm/scripts/rvm`

检查一下是否安装正确

`$ rvm -v
rvm 1.22.17 (stable) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]`

2. 使用RVM安装Ruby多版本环境

`$ rvm install 2.2.2`

同样继续等待漫长的下载，编译过程，完成以后，Ruby, Ruby Gems 就安装好了。

安装 Ruby 1.9.3

`$ rvm install 1.9.3`

3. 设置Ruby版本

`$ rvm 1.9.3 --default`

4. 安装rails环境

`$ gem install rails`

###可能遇到error

1. bundle install 时出现  libv8/therubyracer 安装错误

####How to resolve libv8/therubyracer issue

$ gem install libv8 -v '3.16.14.3' -- --with-system-v8

$ bundle install

#####zerror installing therubyracer

$ gem uninstall libv8

$ brew install v8

$ gem install therubyracer

$ bundle install

####error installing libv8

$ gem install libv8 -v '3.16.14.3' -- --with-system-v8


Make sure that `gem install mysql2 -v '0.3.18'` succeeds before bundling.

####error install mysql2

实际上问题为缺少mysql相关文件

brew install mysql 

安装后即可生成 my.cfg文件


###mysql mysql2 Install For Mac OSX

只写如何安装过程:

`$brew install mysql`

安装完成后会出现如下错误：

`ERROR 2002 (HY000): Can not connect to local MySQL server through socket '/tmp/mysql.sock' (2)`

网上搜索了半天，找到解决方案，依次执行

`$unset TMPDIR`

`$ mysql_install_db --verbose --user=root --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
`

OSX中启动mysql服务命令：

`$ mysql.server start`

启动后即可登录到，登录命令为:

`$ mysql -uroot -p`

初始密码为空，个人项目中使用的话可以不用设置密码。


如果想设置开机启动，执行下面的命令

`mkdir -p ~/Library/LaunchAgents` #系统其实已经自带此目录

`cp /usr/local/Cellar/mysql/5.6.16/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/`#5.6.16是数据库版本号，根据你当时所安装的版本号自己修改

`launchctl load -w ~/Library/LaunchAgents/ homebrew.mxcl.mysql.plist`


##mongodb install for OSX

命令行解析：

`$brew install mongodb`

安装后运行

$mongod
出现如下报错
	
	2015-07-26T16:15:38.473-0700 I STORAGE  [initandlisten] exception in initAndListen: 29 Data directory /data/db not found., terminating
	2015-07-26T16:15:38.473-0700 I CONTROL  [initandlisten] dbexit:  rc: 100

原因为系统没有 /data/db 目录

执行以下命令：

`$ sudo mkdir /data/db`

`$ sudo chown -R $USER /data/db`

运行
$ mongod 即可成功启动


相关文档地址：

http://wesleytsai.io/2015/07/26/mongodb-server-directory-permission-denied/

##Docker Configure


1.配置docker 环境需要以下工具依赖

- virtualbox for OSX
- boot2docker

2.配置环境：

####下载 virtualbox 并安装

- 自行下载dmg文件安装

####安装boot2dockeer

使用brew安装boot2docker

$ brew install boot2docker

等待安装完成后运行以下命令创建docker环境：

- $ boot2docker init
- $ boot2docker up
- $ boot2docker ssh #进入docker环境

进入docker后进行docker容器导入与安装

仓库的导入

$ docker import [容器名称] #docker import dayuspider

$ cat spider.tar | docker import - dyspider	#将spider.tar容器导入

$ docker images #显示已有容器

$ docker run -t -i dyspider /bin/bash #启动名为 dyspider的容器

$ docker ps -all

$ docker inspect -f '{{.Id}}' 6bd42a04f130

######主机向docker拷贝方法
进入docker后

 $ cd /User/wudi   此目录为当前系统目录

 $ docker inspect -f '{{.Id}}' 6bd42a04f130  查找ID全值
 
 $ sudo cp read_json.py /mnt/sda1/var/lib/docker/aufs/mnt/6b
d42a04f1302f24f7046803efb9acf5cff6ddcf4b298eff44274e555310efbf/   将文件拷贝到这个目录下

 此时在docker当中的 / 目录就有一个read_json.py 文件了
 
#####容器向主机拷贝方法

$ docker ps -all  获取id

$ docker-enter id or docker start [id] -> docker attach [id] 登陆到容器中

找到 需要拷贝的文件

$ docker cp [id]:[docker中文件路径] [主机文件路径]

####容器挂载主机目录方法

`docker run -it -v /User/$USER/docker-share:/mnt dayuspider /bin/bash`

通过-v参数，冒号前为宿主机目录，必须为绝对路径，冒号后为镜像内挂载的路径。

在容器中/mnt 目录下可以访问主机目录中docker-share中文件。

---

#####```相关常用命令```



$ docker ps -all #显示所有 docker进程

$ docker start 6bd42a04f130 #打开进程id为 6bd42的容器

$ docker attach 6bd42a04f130 #启动id为6bd42的容器

$ xvfb-run casperjs --engine=slimerjs casper.js "http://hotel.qunar.com/city/osaka/dt-2203/?tag=osaka#fromDate=2015-09-12&toDate=2015-09-13" #xvfb-run webkit启动方式

---



##rails server start error

安装rails后执行 rails s 启动服务可能会出现以下错误信息：
	```
	/Users/wudi/.rvm/gems/ruby-1.9.3-p551/gems/	railties-4.1.4/lib/rails/application/configuration.rb:105:in `database_configuration': Cannot 	load `Rails.application.database_configuration`: 	(RuntimeError)
	``
	
进入/Users/$USER/dayu-spider/config

$ cd /Users/$USER/dayu-spider/config

$ cp database.yml.sample database.yml

之后即可正常运行
	
###spider环境内容

spider基于ubuntu构建 12.04 LTS


项目测试路径在 /root/ 路径：

$ cd ~/root

