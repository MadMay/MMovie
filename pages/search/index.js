import { request } from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    searchData: [],//搜索结果内容
    getMore:false,//是否显示底部文本
    tips:'没有更多内容了~',//底部文本
    load:true,//是否加载
    keyword:'',//搜索关键词
    pageCount:1,//搜索结果总页数
  },
  timer: -1,
  index:1,
  newDataArr:[],//存放查询数据
  onload(){
    this.index=1;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //到底加载更多
  onReachBottom(){
    if(this.data.load)
    this.loadingMore()
  },
  onLoad: function (options) {},
  //加载更多
  async loadingMore(){
    ++this.index;
    if(this.index>this.data.pageCount){
      this.setData({
        tips:'没有更多内容了',
        load:false
      })
      return
    }
    let res1 = await request({ query: "?wd=" + this.data.keyword+"&p="+this.index});
    console.log(res1)
      if(res1.data.length===0){
        wx.showToast({
          title: '没有更多内容了',
          icon:'none'
        });
        this.setData({
          tips:'没有更多内容了',
          load:false
        })
      }
      res1.data.forEach(item=>{
        item.vod_continu=item.vod_continu.replace('HD','电影')
        this.newDataArr.push(item);
        }
        )
      this.setData({
        searchData: this.newDataArr,
        showBtn:true
      });
  },
  //搜索
  changeInput(e) {  
    //console.log(e)
    if(!e.detail.trim()||!e.detail) { return  clearTimeout(this.timer);}
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
     let res = await request({ query: "?wd=" + e.detail});
      if(res.data.length===0){
        wx.showToast({
          title: '啥也没有~',
          icon:'none'
        })
      }
      res.data.forEach(item=>item.vod_continu=item.vod_continu.replace('HD','电影'))
      this.newDataArr = res.data;
      if(res.page.pagecount>1){
        this.setData({
          tips:'上滑加载更多'
        })
      }
      this.setData({
        searchData: res.data,
        pageCount:res.page.pagecount,
        keyword:e.detail.trim(),
        getMore:true,
        load:true,
      });
    }, 500);
  },
  //取消
  handleCancel(e){
    this.setData({
      inputVal:"",
      searchData: [],
      getMore:false,
      load:true,
    })
    //console.log(e)
  }
});
