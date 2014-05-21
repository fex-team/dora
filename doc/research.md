# markdown 编辑器调研

标签： markdown

---

## 相关项目

### markdown 在线工具列表

1. https://stackedit.io
1. http://mahua.jser.me
1. http://dillimger.io
1. [bootstrap-markdown](http://toopay.github.io/bootstrap-markdown/)

### https://stackedit.io

优点

1. 编辑体验好
1. 可依赖多种网盘保存文档
1. 有完整的导入导出和展示功能
1. 有目录导航

缺点

1. 不支持百度网盘
1. 不支持直接上传图片
1. 没有工具栏

### http://mahua.jser.me

优点

1. 支持多套编辑器主题
1. 支持四种预览主题

缺点

1. 功能比较简单
1. 没有工具栏
1. 不支持云端保存

### http://dillinger.io

优点:

1. markdown 编辑区域有多套主题
1. 支持多个云端保存点

缺点:

1. 没有工具栏


### [bootstrap-markdown](http://toopay.github.io/bootstrap-markdown/)

优点

1. 主要关注以bootstrap的样式风格展示内容

缺点:

1. 编辑区域只是一个基本的存文本编辑区域

经过对比 `stackedit.io` 总体体验是做好的，`MdEditor` 可以对比着 `stackedit.io` 做一个好用的 markdown 编辑器

## 前端解析markdown的js库

不同解析库解析出来的内容有点差别，选择哪一个库解析很重要，项目后期假如还想要修改就需要很大工作量。

1. Strapdown.js [官网地址](http://strapdownjs.com/)
    * 支持多套主题
2. showdown.js [项目地址](https://github.com/coreyti/showdown)
3. markdown.js [项目地址](https://github.com/evilstreak/markdown-js)
    * 不支持表格
4. marked [项目地址](https://github.com/chjj/marked)
5. js-markdown-extra [demo 地址](http://tanakahisateru.github.io/js-markdown-extra/demo.html)
    * 支持功能齐全

### markdown 语法说明

http://wowubuntu.com/markdown
http://sebug.net/node/t-24

### MdEditor功能设计

#### 基本功能

对比了多个md编辑器，考虑要做的 `MdEditor` 功能设计如下

* 标题支持
* 文本操作
    * `*强调(斜体)*`
    * `**粗体**`
    * `>引用块`
* 分割线 `------`
* 插入内容
    * 插入列表(有序、无序、多级列表)
    * 插入链接
    * 插入图片
    * 插入代码
* 支持 undo、redo
* 特殊符号支持: `\*` `\#` `\_`
* 兼容原生 html 代码


#### 操作优化

* 列表优化
    * 列表上行末按回车自动新增列表行
    * 有序列表换行自动把数字变成有序
    * 列表行上按 tab 按钮，变成子列表
* 插入图片支持上传插入，类似 github 的上传图片功能
    * 粘贴上传
    * 拖放上传
    * 点击上传按钮,选择图片后上传
* 多主题预览内容
* 插入链接，`http://` 开始的地址自动改成链接
* 插入表格支持，表格例子:
```text
| 序号 | 部门 | 博客 |
|-----:|:-----:|:------|
| 1 | FEX | http://fex.baidu.com |
| 2 | AlloyTeam | http://www.alloyteam.com |
| 3 | TaoBao UED | http://ued.taobao.org |
```

### 高级功能

* 实时预览，左右滚动关联，这里需要设计一个算法支持
* 导出 html / markdown / pdf / txt

### 亮点功能(有待调研)

* 实现可视化的编辑
* 实现 markdown 和可视化区域同步，选区关联等功能

### 产品化功能

mdeditor 后续考虑做一个在线编辑工具，模式参考 kityminder，提供在线文档编辑服务，加入文档管理、分享等功能，具体可以支持如下：

* 文档管理
* 使用 localstorage 离线保存内容
* 文档管理、删除
* 支持文档分类、文档标签
* 实时同步到云，首先支持百度云，后续考虑支持其他线上空间(github、dropbox、google drive、sky drive，需要定义好支持的接口)
* 支持分享文档，打开分享是一个阅读页面，可以优化阅读体验
* 目录大纲的支持
