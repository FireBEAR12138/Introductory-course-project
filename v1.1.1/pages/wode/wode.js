Page({
  data:
  {
    string: '',
    fan: '',
    a: '',
    b: '',
    c: ''
  },
  fanyi: function (e) {
    this.setData({
      b: '',
      fan: e.detail.value
    })
  },
  diaoyong: function () {
    wx.request
      (
      {
        url: 'https://helloacm.com/api/pinyin/?cached&s=' + this.data.fan + '&t=1 ',
        success: (res) => {
          console.log(res.data.result[0]),
            this.setData({
              string: res.data.result[0]
            });

          if ((this.data.string.charAt(0) == 'b') || (this.data.string.charAt(0) == 'c') || (this.data.string.charAt(0) == 'd') || (this.data.string.charAt(0) == 'f') || (this.data.string.charAt(0) == 'g') || (this.data.string.charAt(0) == 'h') || (this.data.string.charAt(0) == 'j') || (this.data.string.charAt(0) == 'k') || (this.data.string.charAt(0) == 'l') || (this.data.string.charAt(0) == 'm') || (this.data.string.charAt(0) == 'n') || (this.data.string.charAt(0) == 'p') || (this.data.string.charAt(0) == 'q') || (this.data.string.charAt(0) == 'r') || (this.data.string.charAt(0) == 't') || (this.data.string.charAt(0) == 's') || (this.data.string.charAt(0) == 'w') || (this.data.string.charAt(0) == 'x') || (this.data.string.charAt(0) == 'y') || (this.data.string.charAt(0) == 'z')) {
            if ((this.data.string.charAt(0) == 'c') && (this.data.string.charAt(1) == 'h')) {
              this.setData({
                a: 'ch'
              })
            }
            else if ((this.data.string.charAt(0) == 's') && (this.data.string.charAt(1) == 'h')) {
              this.setData({
                a: 'sh'
              })
            }
            else if ((this.data.string.charAt(0) == 'z') && (this.data.string.charAt(1) == 'h')) {
              this.setData({
                a: 'zh'
              })
            }
            else
              this.setData({
                a: this.data.string.charAt(0)
              });
          }
          else {
            this.setData({
              a: ''
            });
          };
          if ((this.data.string.charAt(0) == 'b') || ((this.data.string.charAt(0) == 'c') && (this.data.string.charAt(1) != 'h')) || (this.data.string.charAt(0) == 'd') || (this.data.string.charAt(0) == 'f') || (this.data.string.charAt(0) == 'g') || (this.data.string.charAt(0) == 'h') || (this.data.string.charAt(0) == 'j') || (this.data.string.charAt(0) == 'k') || (this.data.string.charAt(0) == 'l') || (this.data.string.charAt(0) == 'm') || (this.data.string.charAt(0) == 'n') || (this.data.string.charAt(0) == 'p') || (this.data.string.charAt(0) == 'q') || (this.data.string.charAt(0) == 'r') || (this.data.string.charAt(0) == 't') || ((this.data.string.charAt(0) == 's') && (this.data.string.charAt(1) != 'h')) || (this.data.string.charAt(0) == 'w') || (this.data.string.charAt(0) == 'x') || (this.data.string.charAt(0) == 'y') || ((this.data.string.charAt(0) == 'c') && (this.data.string.charAt(1) != 'h'))) {
            for (var i = 1; i < (this.data.string.length - 1); i++) {
              var x = this.data.b + this.data.string.charAt(i)
              this.setData({
                b: x
              })

            }
          }
          else if (this.data.string.charAt(1) == 'h') {
            for (var i = 2; i < (this.data.string.length - 1); i++) {
              var x = this.data.b + this.data.string.charAt(i)
              this.setData({
                b: x
              })
            }
          }
          else {
            for (var i = 0; i < (this.data.string.length - 1); i++) {
              var x = this.data.b + this.data.string.charAt(i)
              this.setData({
                b: x
              })

            }
          }
          this.setData({
            c: this.data.string.charAt(this.data.string.length - 1)
          });

        }
      }
      )
  }

})
