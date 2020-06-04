

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //console.log('已经授权',res)
                            that.setData({
                                isLogin:true,
                                userInfo:res.userInfo
                            })
                            wx.setStorageSync('userInfo',res.userInfo)
                        }
                    });
                }
            },
            fail: function(err){
                
            }
        })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        this.setData({
            isLogin:true,
            userInfo:e.detail.userInfo
        })
        wx.setStorageSync('userInfo',e.detail.userInfo)
    } else {
        //用户按了拒绝按钮
        wx.showModal({
            title:'警告',
            content:'您点击了拒绝授权，将无法体验全部功能，建议授权后再使用!!!',
            showCancel:false,
            confirmText:'返回授权',
            success:function(res){
                if (res.confirm) {
                    console.log('用户点击了“返回授权”')
                } 
            }
        })
    }
},
logOut(){
    wx.removeStorageSync('userInfo');
    this.setData({
        isLogin:false
    })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
});
