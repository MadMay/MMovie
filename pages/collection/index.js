import { request } from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [],
    isLoading:true,
    tips:'数据查询中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      isLoading:false,
      tips:'数据查询中...'
    })
    let collect = wx.getStorageSync("collect") || [];
    let result = [];
    let collectionList=[];
    let userName = wx.getStorageSync("userInfo")||{};
    collect.forEach(async (element) => {
      //console.log(element)
      if(element.userName==userName.nickName){
      result.push(request({ query: "?wd=" + element.name }));
      }
    });
    //console.log(result)
    Promise.all(result).then((res) => {
     res.forEach((i,index)=>{
       //console.log(i,userName)
      collectionList.push(i.data[0])
     })
     
     this.setData({
      collectionList,
      isLoading:true,
      tips:'还没有收藏哦，赶紧去收藏几部电影吧。'
     })
   
    });
  },
  onMyEvent: function(){
    this.setData({
      isLoading:false,
      tips:'还没有收藏哦，赶紧去收藏几部电影吧。'
    })
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

  }
})