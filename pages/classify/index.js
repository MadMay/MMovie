// pages/classify/index.js
import{request} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    film:false,
    TV:false,
    Anime:false,
    Zongyi:false,
    Qita:false,
    fight: "动作电影",
    comedy:"喜剧电影",
    love:'爱情电影',
    scienc:'科幻电影',
    terror:'恐怖电影',
    strange:'奇幻电影',
    feature:'剧情电影',
    fightFilm:[],//动作
    comedyFilm:[],//喜剧
    loveFilm:[],//爱情
    sciencFilm:[],//科幻
    terrorFilm:[],//恐怖
    strangeFilm:[],//奇幻
    featureFilm:[],//剧情
  },
  onTabItemTap: function(){
    if (!this.data.film){
      //this.indexArr = this.indexArr.filter(res=>res!="电影")
      this.getFilmData();
      this.getFilmData1()
      this.getFilmData2()
      this.getFilmData3()
      this.getFilmData4()
      this.getFilmData5()
      this.getFilmData6()
    }
    else if(!this.data.TV){
      this.indexArr = this.indexArr.filter(res=>res!="电视剧")
    }
    else if(!this.data.Anime){
      this.indexArr = this.indexArr.filter(res=>res!="动漫")
    }
    else if(!this.data.Zongyi){
      this.indexArr = this.indexArr.filter(res=>res!="综艺")
    }
    else if(!this.data.Qita){
      this.indexArr = this.indexArr.filter(res=>res!="其他")
    }
    else{
      return
    }
  },
  //加载其他tab页数据
  indexArr:["电影"],//tab页面是否加载
  loadOtherData(e){
    //console.log(this.indexArr)
    var flag = this.indexArr.includes(e.detail.title);
    //console.log(flag)
    if(!flag&&e.detail.title=="电视剧"){
      this.indexArr.push(e.detail.title)
      this.getFilmData7()
      this.getFilmData8()
      this.getFilmData9()
      this.getFilmData10()
      this.getFilmData11()
      this.getFilmData12()
    }
    else if(!flag&&e.detail.title=="动漫"){
      this.indexArr.push(e.detail.title);
      this.getFilmData13()
      this.getFilmData14()
      this.getFilmData15()
      this.getFilmDataOther()
    }
    else if(!flag&&e.detail.title=="综艺"){
      this.indexArr.push(e.detail.title)
      this.getFilmData16()
      this.getFilmData17()
      this.getFilmData18()
    }
    else if(!flag&&e.detail.title=="其他"){
      this.indexArr.push(e.detail.title)
      this.getFilmData19()
      this.getFilmData20()
      this.getFilmData21()
    }
    else if(!flag&&e.detail.title=="电影"){
      this.getFilmData();
      this.getFilmData1()
      this.getFilmData2()
      this.getFilmData3()
      this.getFilmData4()
      this.getFilmData5()
      this.getFilmData6()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取动作电影数据
  async getFilmData(){
    const {data} =  await request({query:"?cid=5"});
    this.setData({
      fightFilm:data,
      fight: "动作电影",
      cid5:5,
      film:true,
    })
  },
  async getFilmData1(){
    const {data} =  await request({query:"?cid=6"});
    this.setData({
      comedyFilm:data,
      comedy:"喜剧电影",
      cid6:6,
    })
  },
  async getFilmData2(){
    const {data} =  await request({query:"?cid=7"});
    this.setData({
      loveFilm:data,
      love:"爱情电影",
      cid7:7,
    })
  },
  async getFilmData3(){
    const {data} =  await request({query:"?cid=8"});
    this.setData({
      sciencFilm:data,
      scienc:"科幻电影",
      cid8:8,
    })
  },
  async getFilmData4(){
    const {data} =  await request({query:"?cid=9"});
    this.setData({
      terrorFilm:data,
      terror:"恐怖电影",
      cid9:9,
    })
  },
  async getFilmData5(){
    const {data} =  await request({query:"?cid=10"});
    this.setData({
      strangeFilm:data,
      strange:"奇幻电影",
      cid10:10,
    })
  },
  async getFilmData6(){
    const {data} =  await request({query:"?cid=11"});
    this.setData({
      featureFilm:data,
      feature:"喜剧电影",
      cid11:11,
    })
  },
  //电视剧
  async getFilmData7(){
    const {data} =  await request({query:"?cid=12"});
    this.setData({
      contryTV:data,
      contry:"内地剧",
      cid12:12,
      TV:true,
    })
  },
  async getFilmData8(){
    const {data} =  await request({query:"?cid=13"});
    this.setData({
      xianggangTV:data,
      xianggang:"香港剧",
      cid13:13,
    })
  },
  async getFilmData9(){
    const {data} =  await request({query:"?cid=14"});
    this.setData({
      taiwanTV:data,
      taiwan:"台湾剧",
      cid14:14,
    })
  },
  async getFilmData10(){
    const {data} =  await request({query:"?cid=15"});
    this.setData({
      koreaTV:data,
      korea:"韩剧",
      cid15:15,
    })
  },
  async getFilmData11(){
    const {data} =  await request({query:"?cid=16"});
    this.setData({
      japanTV:data,
      japan:"日剧",
      cid16:16,
    })
  },
  async getFilmData12(){
    const {data} =  await request({query:"?cid=17"});
    this.setData({
      oumeiTV:data,
      oumei:"美剧",
      cid17:17,
    })
  },
  //动漫
  async getFilmData13(){
    const {data} =  await request({query:"?cid=91"});
    this.setData({
      guochanAnime:data,
      guochanA:"国产动漫",
      cid91:91,
      Anime:true,
    })
  },
  async getFilmData14(){
    const {data} =  await request({query:"?cid=92"});
    this.setData({
      japanAnime:data,
      japanA:"日本动漫",
      cid92:92
    })
  },
  async getFilmData15(){
    const {data} =  await request({query:"?cid=93"});
    this.setData({
      oumeiAnime:data,
      oumeiA:"欧美动漫",
      cid93:93
    })
  },
  async getFilmDataOther(){
    const {data} =  await request({query:"?cid=94"});
    this.setData({
      qitaAnime:data,
      qitaA:"其他动漫",
      cid94:94
    })
  },
  //综艺
  async getFilmData16(){
    const {data} =  await request({query:"?cid=96"});
    this.setData({
      daluZY:data,
      daluZ:"大陆综艺",
      cid96:96,
      Zongyi:true,
    })
  },
  async getFilmData17(){
    const {data} =  await request({query:"?cid=97"});
    this.setData({
      guowaiZY:data,
      guowaiZ:"国外综艺",
      cid97:97
    })
  },
  async getFilmData18(){
    const {data} =  await request({query:"?cid=98"});
    this.setData({
      gangtaiZY:data,
      gangtaiZ:"港台综艺",
      cid98:98
    })
  },
  //其他
  async getFilmData19(){
    const {data} =  await request({query:"?cid=99"});
    this.setData({
      recordOther:data,
      record:"纪录片",
      cid99:99,
      Qita:true
    })
  },
  async getFilmData20(){
    const {data} =  await request({query:"?cid=100"});
    this.setData({
      animeOther:data,
      anime:"动画片",
      cid100:100
    })
  },
  async getFilmData21(){
    const {data} =  await request({query:"?cid=101"});
    this.setData({
      warOther:data,
      war:"战争片",
      cid101:101
    })
  },
  onLoad: function (options) {
    this.getFilmData();
    this.getFilmData1()
    this.getFilmData2()
    this.getFilmData3()
    this.getFilmData4()
    this.getFilmData5()
    this.getFilmData6()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  doSomeThing(e){
    //console.log("滑动...",e)
  }
})