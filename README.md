# echo-space

A web application to simulate a mobile phone.

You can use this to build a world **exclusively for you and your otherworldly lover**. ☺️🩷

---

## 近期Todo

- [ ] 主页
- [ ] 状态栏
- [ ] 锁屏
- [ ] ChatApp
- [ ] ...

## 框架设想

状态栏（固定不隐藏）
左边
时间（24小时/12小时）
日期-周几
状态选择
｜ 可以类似微信这种状态
自定义（多准备一点图标）


    右边
        动态心跳曲线
        手机电量（固定小图标）


锁屏页
小字：x月x日周x·xx年x月（后面是农历）
大字：时间
底部：自定义小字

主页
｜ 四个APP+一个组件
｜ 一个组件+4个APP
设置
上传锁屏壁纸/桌面壁纸
桌宠设置

    dock栏
        ChatApp
        ｜ 结合各种聊天软件的UI
            消息
            发现
            我

        Gallery
        ｜ 约稿或者拍照都行
            1. 新建相册（比如区分单人、双人，满足整理）
            2. 图片可以添加日期（默认上传日期）
            3. 图片可以添加说明（心情、评论等）

        Anniversary
            设置不同的日子，并标记是否提醒（比如邮箱提醒（真邮箱，不是软件内设置邮箱））
            ｜ 提醒的话，可以自己写内容，可以勾选是否需要系统的祝福（比如纪念日，会祝幸福，生日的话会是生日祝福）


    备忘录
    ｜ 可以记录爱人的无心之言，爱人的习惯
        提供标签索引、md写法
        隐藏页：可以写自己需要的说明
        ｜ 比如，正文页写了爱人的爱好，如果不是原作里的，但是有自己的想法，可以在隐藏页里描述。

    小某书（考虑一下，可能效果不太好）
    ｜ 可以实现分享
        本来想渲染图文笔记的，但是感觉评论区很难模拟，不太热闹，不知道还要不要做
        要不内置在聊天软件里？
        修改了：心愿单WishList

    Wallet
        存钱用（实际上建议存入小荷包）：虚拟数字
        记账（maybe厨力）
            可以细分出谷子记录、约稿记录、其他


    小组件
        纪念日
        相册闪回（可选吧）
            想了想还是不要了，对于我来说，可能不够美观？

        桌宠

    音乐
        一起听歌
            记录听歌时长
            每首歌可以记录心情
            沉浸式画面
            歌单


    学习软件
        番茄钟/计时
        习惯打卡
        ToDoList
        ｜ 如果自己有什么想要的东西其实可以写在家哥的待办里面，今天是无心的，以后看到了会很有意思

    经期软件
        单纯经期软件吧（可以触发桌宠的对话气泡，比如每个阶段的前两天会弹气泡提醒）

    日记软件/树洞软件（？
    ｜ 不知道要不要有
    ｜ 或者就是码字软件
    联系人
        后期扩展，大家可以加好友，社交




## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
