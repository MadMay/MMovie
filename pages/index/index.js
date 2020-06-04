import{request} from '../../utils/request';
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    rencentList:[],
    isHis:false,
    isCurrentPage:true
  },
  onLoad: function () {
    this.setData({
      isCurrentPage:true
    })
    this.getData()
  },
  onPullDownRefresh(){
    //console.log("刷新！");
    this.getData();
    wx.stopPullDownRefresh()
  },
  onTabItemTap: function(){
    if (this.data.isCurrentPage){
      this.getData()
      return;
    }
    else{
      return
    }
  },
 async getData(){
  let randomNum = parseInt(Math.random()*200)+1
  const res =  await request({query:"?p="+randomNum})
      this.setData({
        rencentList:res.data
      })
    
  },
  goSearchPage(){
    wx.navigateTo({
      url:'/pages/search/index',
      success:function(){
        // do someting...
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
})