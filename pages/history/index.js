import {
  request
} from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [],//历史记录数据
    tips: '数据加载中...',//提示内容
    isHis:false//是否在历史记录页
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collect = wx.getStorageSync("hisUrl") || [];
    let result = [];
    let collectionList = []
    collect.forEach(async (element) => {
      result.push(request({
        query: "?wd=" + element.name
      }));
    });
    Promise.all(result).then((res) => {
      //console.log(res)
      //console.log(collect)
      res.forEach((i,index) => {
        if(i.data[0]==undefined){
        }
        else{
          i.data[0].url = collect[index].url;
          i.data[0].level = collect[index].level;
          i.data[0].hisTime = collect[index].hisTime;
          i.data[0].timeStamp = collect[index].timeStamp
          collectionList.push(i.data[0])
        }
      })
      collectionList.sort((b,a)=>a.timeStamp-b.timeStamp)//按时间戳对历史记录进行排序
      //console.log(collectionList)
      this.setData({
        collectionList,
        isHis:true,
        tips:'还没有看过电影哦,赶快去看看吧...'
      })
    }).catch(err=>{
      console.log(err)
    });
  },
  //清空历史记录按钮事件
  handleBtn(){
    wx.setStorageSync('hisUrl', [])
    this.setData({
      collectionList:[],
      isHis:false,
      tips:'还没有看过电影哦,赶快去看看吧...'
    })
  },
  onMyEvent: function(){
    this.setData({
      isHis:false,
      tips:'还没有看过电影哦,赶快去看看吧....'
    })
  }
})