const app = getApp();
//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');

var history = new Array(); //与连续输入有关 
var i = 0;//与连续输入有关 
var translation = [];

Page({
  data: {
    bt1: 'buttonNormal',
    bt2: 'buttonNormal',
    bt3: 'buttonNormal',
    bt4: 'buttonNormal',
    bt5: 'buttonNormal',
    bt6: 'buttonNormal',
    bt6: 'buttonNormal',
    content1: '请点击按钮',//内容
    src: '', //语音插件相关
    read: '',//朗读出的内容
    matchnum:0,//重要数据
    pah:''
  },

  translate: function (e) {
   
    switch (this.data.matchnum) {
      //声母表二进制数对应
      case 3:this.setData({ content1: 'b' }); break;
      case 15: this.setData({ content1: 'p' }); break;
      case 13: this.setData({ content1: 'm' }); break;
      case 11: this.setData({ content1: 'f' }); break;
      case 25: this.setData({ content1: 'd' }); break;
      case 30: this.setData({ content1: 't' }); break;
      case 29: this.setData({ content1: 'n' }); break;
      case 7: this.setData({ content1: 'l' }); break;
      case 27: this.setData({ content1: 'g' }); break;
      case 5: this.setData({ content1: 'k(q)' }); break;
      case 19: this.setData({ content1: 'h(x)' }); break;
      case 12: this.setData({ content1: 'zh' }); break;
      case 31: this.setData({ content1: 'ch' }); break;
      case 49: this.setData({ content1: 'sh' }); break;
      case 26: this.setData({ content1: 'r' }); break;
      case 53: this.setData({ content1: 'z' }); break;
      case 9: this.setData({ content1: 'c' }); break;
      case 14: this.setData({ content1: 's' }); break;
      
      //韵母表二进制数对应
      case 20: this.setData({ content1: 'a' }); break;
      case 34: this.setData({ content1: 'e' }); break;
      case 10: this.setData({ content1: 'i' }); break;
      case 44: this.setData({ content1: 'ü' }); break;
      case 37: this.setData({ content1: 'u' }); break;
      case 23: this.setData({ content1: 'er' }); break;
      case 42: this.setData({ content1: 'ai' }); break;
      case 22: this.setData({ content1: 'ao' }); break;
      case 46: this.setData({ content1: 'ei' }); break;
      case 55: this.setData({ content1: 'ou' }); break;
      case 43: this.setData({ content1: 'ia' }); break;
      case 28: this.setData({ content1: 'iao' }); break;
      case 17: this.setData({ content1: 'ie' }); break;
      case 51: this.setData({ content1: 'iou' }); break;
      case 63: this.setData({ content1: 'ua' }); break;
      case 61: this.setData({ content1: 'uai' }); break;
      case 58: this.setData({ content1: 'ui' }); break;
      case 21: this.setData({ content1: 'uo' }); break;
      case 62: this.setData({ content1: 'üe' }); break;
      case 39: this.setData({ content1: 'an' }); break;
      case 38: this.setData({ content1: 'ang' }); break;
      case 52: this.setData({ content1: 'en' }); break;
      case 60: this.setData({ content1: 'eng' }); break;
      case 41: this.setData({ content1: 'ian' }); break;
      case 45: this.setData({ content1: 'iang' }); break;
      case 35: this.setData({ content1: 'in' }); break;
      case 33: this.setData({ content1: 'ing' }); break;
      case 59: this.setData({ content1: 'uan' }); break;
      case 54: this.setData({ content1: 'uang' }); break;
      case 18: this.setData({ content1: 'uen' }); break;
      case 50: this.setData({ content1: 'ong' }); break;
      case 47: this.setData({ content1: 'üan' }); break;
      case 52: this.setData({ content1: 'ün' }); break;
      case 57: this.setData({ content1: 'iong' }); break;

      case 1: this.setData({ content1: '1声' }); break;
      case 2: this.setData({ content1: '2声' }); break;
      case 4: this.setData({ content1: '3声' }); break;
      case 6: this.setData({ content1: '4声' }); break;

     
      default: this.setData({ content1: ' ' }); break;
    }

    //连续输入的代码 
    history[i] = this.data.content1;
    this.setData({ matchnum: 0 })
    // console.log(history[i - 1])   //有需要可开启
    i++
    // console.log(i) //有需要可开启
    this.setData({ content1: history })  
  },

  //清除所用按钮功能，text中的{{content1}}为空
  deleteData: function () {
    //检查基础库版本
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }//保存this变量
    var that = this;
    //调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'uplode',
      // 传给云函数的参数
      data: {
        content:that.data.content1,
        tag: 1
      },
      //success函数为调用成功后的回调函数
      success: function (res) {
        console.log(res.result)
      },
      //fail函数为调用失败后的回调函数
      fail: console.error

    })
    this.setData({ content1: "" });//text中的{ { content1 } } 为空 
    console.log(history);//控制台监控 //history = [],清空为空数组; 
    history.length = 0;
    i = 0   
  },

  change: function (buttonid) {   //关于按钮的函数，按钮按下matchnum + 2^n
    // console.log(buttonid)
    switch(buttonid){
      case"bt1":
        var a=this.data.bt1;
        if (a=='buttonNormal'){
          this.setData({bt1:'buttonLocked'})
          this.setData({ matchnum: this.data.matchnum + 1 })//button1按下，加2^0
          console.log(this.data.matchnum)
        }
        else{
         this.setData({bt1: 'buttonNormal'})
        };
      break;

      case "bt2":
        var a = this.data.bt2;
        if (a == 'buttonNormal') {
           this.setData({bt2: 'buttonLocked'})
           this.setData({ matchnum: this.data.matchnum + 2 })//button2按下，加2^1
           console.log(this.data.matchnum)
        }
         else {
           this.setData({bt2: 'buttonNormal'})
        }; 
      break;

      case "bt3":
        var a = this.data.bt3;
        if (a == 'buttonNormal') {
           this.setData({bt3: 'buttonLocked'})
           this.setData({ matchnum: this.data.matchnum + 4 })//button3按下，加2^2
           console.log(this.data.matchnum)
        }
        else {
          this.setData({bt3: 'buttonNormal'})
        };
      break;

      case 'bt4':
        var a = this.data.bt4
        if (a == 'buttonNormal') {
          this.setData({bt4: 'buttonLocked' })
          this.setData({ matchnum: this.data.matchnum + 8 })//button4按下，加2^3
          console.log(this.data.matchnum)
        }
        else {
          this.setData({bt4: 'buttonNormal'})
        };
        break;

      case "bt5":
        var a = this.data.bt5;
        if (a == 'buttonNormal') {
          this.setData({ bt5: 'buttonLocked'})
          this.setData({ matchnum: this.data.matchnum + 16 })//button5按下，加2^4
          console.log(this.data.matchnum)
        }
        else {
          this.setData({bt5: 'buttonNormal'})
        };
      break;

      case "bt6":
        var a = this.data.bt6;
        if (a == 'buttonNormal') {
          this.setData({bt6: 'buttonLocked'})
          this.setData({ matchnum: this.data.matchnum + 32 })//button6按下，加2^5
          console.log(this.data.matchnum)
        }
        else {
          this.setData({bt6: 'buttonNormal'})
        };
      break;

    }
  },
  
  eachButton:function(e){
    console.log(e)
    wx.vibrateShort();
    var buttonid=e.currentTarget.id
    console.log(buttonid)
    this.change(buttonid)
  },


  onReady(e) {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
  },
  // 手动输入内容
  conInput: function (e) {
    this.setData({
      content1: e.detail.value,
    })
  },
  
  // 翻译按键：文字转语音
  readout: function (e) {
    //拼音匹配对应读音汉字过程
    for(var j=0;j<i;j++)
    {
    switch (history[j]) {
      case 'uo': if (history[j + 1] != '1声' & history[j + 1] != '2声' & history[j + 1] != '3声' & history[j + 1] != '4声') { translation[j] = "我" }; 
                 if (history[j + 1] == '1声') { translation[j] = "窝" };
                 if (history[j + 1] == '4声') { translation[j] = "沃" };
      break;
      case 'ai': if (history[j + 1] != '1声' & history[j + 1] != '2声' & history[j + 1] != '3声' & history[j + 1] != '4声') { translation[j] = "爱" }; 
                 if (history[j + 1] == '1声') { translation[j] = "挨" };
                 if (history[j + 1] == '2声') { translation[j] = "癌" };
                 if (history[j + 1] == '3声') { translation[j] = "矮" };
      break;
      case 'n': if (history[j + 1] == 'i') 
                 { 
                if (history[j + 2] != '1声' & history[j + 2] != '2声' & history[j + 2] != '3声' & history[j + 2] != '4声') { translation[j] = "你" }
                 }
      break;
      case 'sh': if (history[j + 1] == 'a') {
        if (history[j + 2] != '1声' & history[j + 2] != '2声' & history[j + 2] != '3声' & history[j + 2] != '4声') { translation[j] = "霎" }
        if (history[j + 2] == '1声') { translation[j] = "沙" };
        if (history[j + 2] == '2声') { translation[j] = "啥" };
        if (history[j + 2] == '3声') { translation[j] = "傻" };
        break;
     };
      case 'iou': 
        if (history[j + 1] != '1声' & history[j + 2] != '2声' & history[j + 2] != '3声' & history[j + 2] != '4声') { translation[j] = "有" }
        if (history[j + 1] == '1声') { translation[j] = "优" };
        if (history[j + 1] == '2声') { translation[j] = "邮" };
        if (history[j + 1] == '4声') { translation[j] = "又" };
        break;
    }
    //将数组转为可读的string
    console.log(translation);
    var c = translation.join(''); 
    console.log(c);

    //语音插件部分
    var that = this;
    var read = this.data.read;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content1: c,
      success: function (res) {
        console.log(res);
        console.log("succ tts", res.filename);
        that.setData({
          src: res.filename
        })
        that.yuyinPlay();
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  }
},


  //播放语音
  yuyinPlay: function (e) {
    if (this.data.src == '') {
      console.log("暂无语音");
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },

  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();//暂停音频
  },
  
  histor:function(){
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    } //保存this变量
    var _this = this;
    //调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'downlode',
      // 传给云函数的参数
      data: {
        tag: 1
      }, //success函数为调用成功后的回调函数
      success: function (res) {
        console.log(res.result)
        _this.setData({
          pah: res.result.data[0].content  //设置record值，显示在页面上。setData函数会触发页面的重新渲染
        })
  }

})
 } })