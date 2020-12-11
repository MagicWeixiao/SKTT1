// pages/password/password.js
var server = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    state: false
  },
  newPasswordBtn() {
    wx.setStorageSync('password', this.data.newPassword);
    wx.showToast({

      title: '修改密码成功！',
    })
  },
  closeLockBtn(){
    wx.sendSocketMessage({
      data: "0"
    })

    wx.showToast({

      title: '关锁成功！',
    })
  },
  passwordBtn() {
    console.info(this.data.password);


    if (wx.getStorageSync('password') == "") {
      this.setData({
        state: true
      })
      wx.showToast({

        title: '开锁成功！',
      })

      wx.sendSocketMessage({
        data: "1"
      })
    } else {
      if (this.data.password == wx.getStorageSync('password')) {
        this.setData({
          state: true
        })

        wx.showToast({

          title: '开锁成功!',
        })

        wx.sendSocketMessage({
          data: "1"
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '密码错误！',
        })
      }

    }

  },
  onNewPasswordChange(event) {
    this.data.newPassword = event.detail.value;
  },
  onPasswordChange(event) {
    this.data.password = event.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    server = wx.connectSocket({
      url: 'ws://39.108.65.86:8002/appws',
    });

    server.onOpen(res => {
      console.info("连接服务器成功！");
      // wx.showToast({
      //     title: '连接服务器成功！',
      // })
    });
    // server.onError(res => {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '网络异常！',
    //   })
    // });
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

  }
})