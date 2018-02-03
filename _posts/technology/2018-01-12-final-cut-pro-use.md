---
layout: post
category : 技术
title: "Final Cut Pro 快捷键汇总整理"
description: ""
tagline: "技术就是生产力"
tags : [剪辑, OSX, FCX]

---

> Final Cut Pro 作为常用的视频制作工具
> 精通快捷键会极大的提高效率

Shift+上下方向键 [在标记点中移动]
Cmd+Option+V [去掉属性]
Ctrl+X [创建样本文字]
Ctrl+D [显示选定片段时长] (Cmd+J能达到同样效果,但没Ctrl+D来的顺手~)
Ctrl+G [合拢空隙]合拢两个剪辑点之间的空隙
Ctrl+Z [亮度溢出范围检查开关]
Shift+\ [从入点到出点播放]
Option+\ [从人点到出点播放]



Option+W [片段叠层开关]
Cmd+Opton+W [切换波形开关]

Option+P [逐帧播放](优点是无须渲染即可看到结果 缺点是不实时 音频可在措擦中调整开关)

Cmd+Shift+Z [重做]
Ctrl+B [启用/停用选定片段]
Ctrl+V [添加剪辑点](相当于在播放头的位置使用刀片工具)

Shift+i [移至入点]
Option+i [删除入点]
Shift+O [移至出点]
Option+O [删除出点] X是为播放头所在的片段设置入出点
Option+X [直接删除入出点]
Option+X [取消入出点]


Cmd+8 采集素材 [在采集界面下 Shift+C是硬采]
Shift+Z [适配序列] (使序列完全显示 )
Shift+L [链接选择开关]
Cmd+L [用于音频和视频的链接开关]
Option+L [开关立体声对]

# 音量调节
Ctrl +(加号) [将音量调高1db]
Ctrl -(减号) [将音量调低1db]
Ctrl [(左中括号) [将音量调高3db]
Ctrl ](右中括号) [将音量降低3db]

Cmd+左中括号 [后退]
Cmd+右中括号 [前进]
Cmd+Option+L [更改选中素材的不透明度（视频）或音频增益（音频）]

Ctrl+Z [切换亮度溢出范围检查开或关]
> J K L,向后播放，停止播放，向前播放 
> 空格键，向前播放i,设置入点，o设置出点

shift+o    [移至出点]
option+o [删除出点]
option+Q [选择用户偏好设置窗口]
Ctrl+Q [简易设置]
shift+Q [系统设置]

option+W [显示片段叠层的开关]
option+Cmd+W [在时间线上切换声音波形开关]

Cmd+7 [在修剪编辑窗口打开选定的编辑点]

option+p [预览](无生成渲染情况下使用)
ctrl+b [隐藏时间线的某层/开关启用片段]
cmd+shift+z [后退恢复]
ctrl+k [增加关键帧]
option+（+-）[缩放控制]
Com+8 [采集素材]
com+r [渲染选定文件]
Option+r [全局渲染]
Option+H [自定义键盘布局]
              
                        
                    
                        
            
> 更了theme后由于使用 kramdown 

> 因为语法要求

> 使得 `######ws 读取 json方式` 这样的title格式不能被识别

### 批量正则替换：

```
/#\w 
匹配 ##`#w`s

使用：
:%s/#\w/# \w/g

替换全文所有 #后有字符的数据为  #[空格]字母

```
