// pages/classify/index.js
import{request} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  //获取动作电影数据
  async getFilmData(){
    const {data} =  await request({query:"?cid=5"});
    this.setData({
      fightFilm:data,
      fight: "动作电影",
    })
  },
  async getFilmData1(){
    const {data} =  await request({query:"?cid=6"});
    this.setData({
      comedyFilm:data,
      comedy:"喜剧电影",
    })
  },
  async getFilmData2(){
    const {data} =  await request({query:"?cid=7"});
    this.setData({
      loveFilm:data,
      love:"爱情电影",
    })
  },
  async getFilmData3(){
    const {data} =  await request({query:"?cid=8"});
    this.setData({
      sciencFilm:data,
      scienc:"科幻电影",
    })
  },
  async getFilmData4(){
    const {data} =  await request({query:"?cid=9"});
    this.setData({
      terrorFilm:data,
      terror:"恐怖电影",
    })
  },
  async getFilmData5(){
    const {data} =  await request({query:"?cid=10"});
    this.setData({
      strangeFilm:data,
      strange:"奇幻电影",
    })
  },
  async getFilmData6(){
    const {data} =  await request({query:"?cid=11"});
    this.setData({
      featureFilm:data,
      feature:"喜剧电影",
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
    console.log("滑动...",e)
  }
})