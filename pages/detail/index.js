import {
  request
} from "../../utils/request";
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    isShow: false,
    isCollection: false,
    wd: "",
    index: -1,
    playUrl:[],
    error: '',//未登录收藏不允许
    type: ''//提示类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      wd
    } = options;
    let index = -1;
    let collect = wx.getStorageSync("collect") || [];

    wd = wd.split(/[:/：\-\·\~]/)
    wd = wd[wd.length-1]

    if (collect.length >= 0) {
      index = collect.findIndex((i) => i.name == wd);
    }
    let isCollection = index != -1 ? true : false;

    this.setData({
      wd,
      index,
      isCollection,
    });
    this.getData(wd);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {},
  async getData(params) {
    const res = await request({
      query: "?wd=" + params
    });
    console.log(res.data)
    wx.setStorageSync('fimeInfo', res.data)
    if (res.data.length === 0) {
      return wx.navigateBack({
        complete: (res) => {
          wx.showToast({
            title: '无法显示该内容',
            icon: 'none',
            duration: 1000,
          })
        }
      })
    }

    let {
      vod_name,
      list_name,
      vod_language,
      vod_year,
      vod_pic,
      vod_url,
      vod_continu,
      vod_content,
    } = res.data[0];
    let all = `${list_name}/${vod_language}/${vod_year}`;
 
    let playUrl = []
    //分集
     vod_url.split('\n').forEach(element => {
         let name = element.split('$')[0]
         let url = element.split('$')[1]
         playUrl.push({name,url})
    });   
    this.setData({
      listData: {
        vod_name,
        vod_pic,
        all,
        vod_continu,
        vod_content,        
      },
      playUrl
    });
  },
  showContent() {
    this.setData({
      isShow: !this.data.isShow,
    });
  },
  //收藏相关操作
  collect() {
    let collect = wx.getStorageSync("collect") || [];//获取已收藏数
    let userName = wx.getStorageSync('userInfo')||"未登录"//获取是否微信授权
    //console.log(userName)
    if(userName=="未登录"){
      Toast.fail('请先登录')
    return
    }
    if (!this.data.isCollection) {
      //收藏
      collect.push({
        userName:userName.nickName,
        name: this.data.wd,
        vod_pic:this.data.listData.vod_pic
      });
      Toast.success('收藏成功')
    } else {
      collect.splice(this.data.index, 1)
      Toast.success('已取消')
    }
    wx.setStorage({
      key: "collect",
      data: collect,
    });
    this.setData({
      isCollection: !this.data.isCollection,
    });
  },
  //播放
  handleBtn(e){
    let {index, name} = e.currentTarget.dataset
    console.log(index,name)
    wx.navigateTo({
      url: '/pages/play/index?url='+index+'&wd='+this.data.wd+'&name='+name+'&isHis=false'
    }) 
  }
});