// pages/classifyDetail/index.js
import{request} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:0,//数据类型
    type:"",//数据类型中文名
    result:[],//数据
    pageCount:0,//数据总页数
    canload:true,//能否加载更多
    tips:'上滑加载更多...'
  },
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(){
    //console.log(this.data.canload)
    if(this.data.canload){
      this.getData()
    }
    else{
      //console.log("哎哎哎")
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {cid,type} = options;//查询类别,查询类别中文名
    wx.setNavigationBarTitle({
      title: type,
    })
    this.setData({
      cid,
      type
    })
    this.getData()
  },
  page:0,//页码
  newDataArr:[],//查询数据，多次查询都存在这里。
  async getData(){
    ++this.page;
    if(this.page==this.data.pageCount){
      this.setData({
        tips:'没有更多内容了。',
        canload:false
      })
      return
    }
    const {data,page} =  await request({query:"?cid="+this.data.cid+"&p="+this.page})
    //console.log(data)
    this.newDataArr.push(...data)
    this.setData({
      result:this.newDataArr,
      pageCount:page.pagecount,
      canload:true,
      tips:'上滑加载更多...'
    })
    if(this.data.pageCount==1){
      this.setData({
        canload:false,
        tips:'没有更多内容了'
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})