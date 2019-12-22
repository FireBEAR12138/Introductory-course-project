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
    content: '请点击按钮',//内容
    src: '', //语音插件相关
    read: '',//朗读出的内容

    matchnum:0,//重要数据
  },

  translate: function (e) {

    switch (this.data.matchnum) {
      //声母表二进制数对应
      case 3:this.setData({ content: 'b' }); break;
      case 15: this.setData({ content: 'p' }); break;
      case 13: this.setData({ content: 'm' }); break;
      case 11: this.setData({ content: 'f' }); break;
      case 25: this.setData({ content: 'd' }); break;
      case 30: this.setData({ content: 't' }); break;
      case 29: this.setData({ content: 'n' }); break;
      case 7: this.setData({ content: 'l' }); break;
      case 27: this.setData({ content: 'g' }); break;
      case 5: this.setData({ content: 'k(q)' }); break;
      case 19: this.setData({ content: 'h(x)' }); break;
      case 12: this.setData({ content: 'zh' }); break;
      case 31: this.setData({ content: 'ch' }); break;
      case 49: this.setData({ content: 'sh' }); break;
      case 26: this.setData({ content: 'r' }); break;
      case 53: this.setData({ content: 'z' }); break;
      case 9: this.setData({ content: 'c' }); break;
      case 14: this.setData({ content: 's' }); break;
      
      //韵母表二进制数对应
      case 20: this.setData({ content: 'a' }); break;
      case 34: this.setData({ content: 'e' }); break;
      case 10: this.setData({ content: 'i' }); break;
      case 44: this.setData({ content: 'ü' }); break;
      case 37: this.setData({ content: 'u' }); break;
      case 23: this.setData({ content: 'er' }); break;
      case 42: this.setData({ content: 'ai' }); break;
      case 22: this.setData({ content: 'ao' }); break;
      case 46: this.setData({ content: 'ei' }); break;
      case 55: this.setData({ content: 'ou' }); break;
      case 43: this.setData({ content: 'ia' }); break;
      case 28: this.setData({ content: 'iao' }); break;
      case 17: this.setData({ content: 'ie' }); break;
      case 51: this.setData({ content: 'iou' }); break;
      case 63: this.setData({ content: 'ua' }); break;
      case 61: this.setData({ content: 'uai' }); break;
      case 58: this.setData({ content: 'ui' }); break;
      case 21: this.setData({ content: 'uo' }); break;
      case 62: this.setData({ content: 'üe' }); break;
      case 39: this.setData({ content: 'an' }); break;
      case 38: this.setData({ content: 'ang' }); break;
      case 52: this.setData({ content: 'en' }); break;
      case 60: this.setData({ content: 'eng' }); break;
      case 41: this.setData({ content: 'ian' }); break;
      case 45: this.setData({ content: 'iang' }); break;
      case 35: this.setData({ content: 'in' }); break;
      case 33: this.setData({ content: 'ing' }); break;
      case 59: this.setData({ content: 'uan' }); break;
      case 54: this.setData({ content: 'uang' }); break;
      case 18: this.setData({ content: 'uen' }); break;
      case 50: this.setData({ content: 'ong' }); break;
      case 47: this.setData({ content: 'üan' }); break;
      case 52: this.setData({ content: 'ün' }); break;
      case 57: this.setData({ content: 'iong' }); break;

      case 1: this.setData({ content: '1声' }); break;
      case 2: this.setData({ content: '2声' }); break;
      case 4: this.setData({ content: '3声' }); break;
      case 6: this.setData({ content: '4声' }); break;

     
      default: this.setData({ content: ' ' }); break;
    }

    //连续输入的代码 
    history[i] = this.data.content;
    this.setData({ matchnum: 0 })
    // console.log(history[i - 1])   //有需要可开启
    i++
    // console.log(i) //有需要可开启
    this.setData({ content: history })  
  },

  //清除所用按钮功能，text中的{{content}}为空
  deleteData: function(){
    this.setData({ content: "" });//text中的{ { content } } 为空 
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
      content: e.detail.value,
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
      content: c,
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

})
