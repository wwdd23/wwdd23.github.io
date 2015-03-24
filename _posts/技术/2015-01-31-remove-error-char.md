---
layout: post
category : 技术
title: "删除OSX拷贝到播放器中的"._"文件"
description: "使用脚本管理文件"
tagline: "技术就是生产力"
tags : [技术,Linux,Blog ]

---

万万没想到,拷贝时居然为每个文件创建了临时文件。

从Mac中拷贝虾米下载的歌曲到X3时，发现
总会出现如下格式的零时文件

    ./Seasons' End/Moments In Life/._Camera_Lights.mp3
    ./Seasons' End/Moments In Life/._Comes_Around.mp3
    ./Seasons' End/Moments In Life/._Down_Memory_Lane.mp3
    ./Seasons' End/Moments In Life/._Evensong.mp3
    ./Seasons' End/Moments In Life/._Fade_in_Colour.mp3
    ./Seasons' End/Moments In Life/._Goodbye_Summer.mp3
    ./Seasons' End/Moments In Life/._Listen.mp3
    ./Seasons' End/Moments In Life/._Moments_in_Life.mp3
    ./Seasons' End/Moments In Life/._One_of_Those_Days.mp3
    ./Seasons' End/Moments In Life/._Running_on_Karma.mp3
    ./Seasons' End/Moments In Life/._The_Love_Spaceship.mp3
    ./Seasons' End/Moments In Life/._Walking_Lotus.mp3
    ./Surahn/Surahn/._Wonderful.mp3
    ./Swimming With Dolphins/Ambient Blue/._Everything´s_A_Miracle.mp3
    ./Swimming With Dolphins/Ambient Blue/._Pajama_Party.mp3
    ./Swimming With Dolphins/Ambient Blue/._Silhouettes.mp3
    ./Swimming With Dolphins/Ambient Blue/._Sunset,_1989.mp3
    ./Swimming With Dolphins/Ambient Blue/._Up_In_The_Stars.mp3

而播放器也会读取到这类文件的存在，
总是出现**格式错误，无法播放**的error信息出现。

虽然不影响听感，但是由于再次检索，和随机播放的几率会大大增加。

对这种内容当然不能熟视无睹，坚决删除之

由于拷贝以专辑目录拷贝，在所有文件中如何遍历删除，成为了本帖的重要内容


### 一· 查找新创建的零时文件

使用脚本如下

    $find ./|grep "\.\_"
\.\_ ： \将标点符号转义 查找包含 __.___的文件


结果如片头的显示内容


### 二· 遍历删除异常文件

对于有转义的文件名，我还是选择 while read 的解决版本

  将find 出的内容保存至零时文件 removelist中


    $cat removelist |while read line;do
    $rm $line
    $done

**ps**
**以上命令需要处于removelist中的目录最上层**



