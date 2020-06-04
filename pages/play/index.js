// pages/play/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",//当前播放文件地址
    wd:'',//电影名字
    level:"",//集数，（电影没有）
    hisTime:0,//历史记录,
    filmInfo:[],//电影其他信息
    showRate:true,//倍速菜单
    rate:"x1",//倍速文本,
    isHis:false,
    continue:false,//是否显示历史播放提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady(){
    this.animation = wx.createAnimation()//倍速选择动画（x1,x1.5）
    this.animationMenu = wx.createAnimation()//倍速菜单显示
  },
  //倍速播放动画收起弹出选择倍速
  translateX(){
    this.animationMenu.translateX(50).step();
    this.animation.translateX(-50).step();
    this.setData({
      showRate:false,
      animationMenu:this.animationMenu.export(),
      animation:this.animation.export()
    })
  },
  //点击视频屏幕出现倍速选择菜单
  showMenu(){
    var that = this
    this.animationMenu.translateX(-50).step();
    this.setData({
      showRate:true,
      animationMenu:this.animationMenu.export()
    });
    //点击Video 4秒不做倍速选择自动消失菜单
    setTimeout(function(){
      if(that.data.showRate){
        that.animationMenu.translateX(50).step();
        that.setData({
          showRate:false,
          animationMenu:that.animationMenu.export()
        })
      }
    },4000)
  },
  //历史续播提示
  showHisTip(){
    if(this.data.isHis==true){
    var that = this;
    this.setData({
      continue:true,
    })
    setTimeout(function(){
      that.setData({
        continue:false,
      })
    },5000)
    }
  },
  onLoad: function (options) {
    //console.log(options)
    let filmInfo = wx.getStorageSync('fimeInfo')
    //电影播放地址，电影名字，电影集数,历史播放时间，是否播放过
    let {url, wd, name, hisTime, isHis} = options
    isHis = isHis=="true"?true:false;
    wx.setNavigationBarTitle({
      title: wd+name
    })
    this.setData({
      url,
      level:name,
      wd,
      hisTime,
      filmInfo,
      isHis
    })
  },
    timeupdate(e){
      let hisTime =  e.detail.currentTime.toFixed(2);
      this.setData({
        hisTime,
      })
    },
  onUnload(){
   var timestamp = (new Date()).valueOf();//获得一个最新时间，用于对观看历史记录进行排序。
   //console.log(this.data.hisTime)
   let hisUrl = wx.getStorageSync('hisUrl')||[]
   let userName = wx.getStorageSync('userInfo')||'未登录'
   let index = hisUrl.findIndex(item=>item.name == this.data.wd&&item.level==this.data.level)
   if(!this.data.url&&!this.data.wd)//没有片名和播放地址和登录直接不缓存。
   {
     return
   }
   else if(userName=='未登录'){//没有登录不缓存
     return
   }
   if(index == -1){
   hisUrl.push({userName:userName.nickName,url:this.data.url,name:this.data.wd,level:this.data.level,hisTime:this.data.hisTime,timeStamp:timestamp})
   wx.setStorageSync('hisUrl', hisUrl)
  }
  else{
    hisUrl.splice(index,1)
    hisUrl.push({userName:userName.nickName,url:this.data.url,name:this.data.wd,level:this.data.level,hisTime:this.data.hisTime,timeStamp:timestamp})
    wx.setStorageSync('hisUrl', hisUrl)
  }
  },
  //倍速选择
  choseRate(e){
    const Video = wx.createVideoContext("video")
    let rate = Number(e.target.dataset.rate);
    Video.playbackRate(rate);
    this.animation.translateX(50).step();
    this.setData({
      rate:"x"+rate,
      animation:this.animation.export(),
    })
  }


})