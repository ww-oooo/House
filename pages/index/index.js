var x=require("../../utils/math.js");
Page({
  data:{
    state1:"active",                  //还款类型
    state2:"",
    type:"商业贷款",                    //贷款类型
    time:5,                            //贷款期限
    rate:4.75,                         //商贷利率
    rate1:2.75,                        //公积金贷款
    refer:"0.00",                      //月供参考
    profit:"0.00",                     //支付利息
    payment:"0.00",                    //还款今晚
    reduce:"0.00",                     //月供减少
    money:"0",                           //商贷金额
    money1:"0"                           //公积金金额
  },
  status:function(e){               //切换状态
    var  that=this; 
    if(e.currentTarget.dataset.value==="1"){
      this.setData({
          state1:"active",
          state2:"",

      })
    }else{
        this.setData({
          state1:"",
          state2:"active"
      })
    }
    this.get(this);
  },

 get:function(obj){
      var self=obj
      console.log(1)
      console.log(self.data.time)
      var dollar=(self.data.money==0?self.data.money1:self.data.money) 
      if(self.data.type==="商业贷款"){
          var m=self.data.rate/100/12         //月利率 
          var n=self.data.time*12;            //还款时间
          var p=dollar*10000;                 //贷款金额
          if(self.data.state1==="active"){
            var b=(p*m*x.fang((1+m),n))/([x.fang((1+m),n)-1])    //月供                //月供    
            var c=b*n-p                         // 贷款利息
          }
          if(self.data.state2==="active"){
            console.log(1)
            var b=p/n+p*m                        //月供    
            var c=((p/n+p*m)+p/n*(1+m))/2*n-p;    // 贷款利息
            var f=(p/n*m)                        //月递减

          }    
          self.setData({
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money:dollar,
                money1:dollar
        })
      }else if(self.data.type==="公积金贷款"){
           var m=self.data.rate1/100/12         //月利率
            var n=self.data.time*12;            //还款时间
            var p=dollar*10000;                 //贷款金额
          if(self.data.state1==="active"){
            var b=(p*m*x.fang((1+m),n))/([x.fang((1+m),n)-1])    //月供                //月供    
            var c=b*n-p                         // 贷款利息
          }
          if(self.data.state2==="active"){
            console.log(1)
            var b=p/n+p*m                        //月供    
            var c=((p/n+p*m)+p/n*(1+m))/2*n-p;    // 贷款利息
            var f=(p/n*m)                        //月递减
          } 
          self.setData({
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money:dollar,
                money1:dollar
        })
      }else if(self.data.type==="组合贷款"){
          var dollar=self.data.money;
          var dollar1=self.data.money1;
          var m=self.data.rate/100/12         //月利率
          var m1=self.data.rate1/100/12
          var n=self.data.time*12;            //还款时间
          var p=dollar*10000;                 //贷款金额
           if(self.data.state1==="active"){
            var b=(p*m*x.fang((1+m),n))/([x.fang((1+m),n)-1])    //月供                //月供    
            var c=b*n-p                         // 贷款利息
            var b1=(p*m*x.fang((1+m1),n))/([x.fang((1+m1),n)-1])    //月供                //月供    
            var c1=b1*n-p                         // 贷款利息
             self.setData({
                refer:x.math(b+b1),
                profit:x.math(c+c1),
                reduce:x.math(f),
                payment:x.math(p+c+c1),
               
        })
          }
          if(self.data.state2==="active"){
            console.log(1)
            var b=p/n+p*m
            var b1=p/n+p*m1                       //月供    
            var c=((p/n+p*m)+p/n*(1+m))/2*n-p;    // 贷款利息
            var c1=((p/n+p*m1)+p/n*(1+m1))/2*n-p;    // 贷款利息
            var f=(p/n*m)                        //月递减
            var f1=(p/n*m1)
            self.setData({
                refer:x.math(b+b1),
                profit:x.math(c+c1),
                reduce:x.math(f+f1),
                payment:x.math(p+c+c1),
        })
          } 

      }
    
    
      
 },
  type:function(){                  //贷款类型
      var that=this; 
      wx.showActionSheet({
        itemList: ['商业贷款', '公积金贷款', '组合贷款'],
        success:function(e){
            if(e.tapIndex==0){
                that.setData({
                   type:"商业贷款"
                 })
                  that.get(that);
            }
            if(e.tapIndex==1){
                that.setData({
                   type:"公积金贷款"
                 })
                  that.get(that);
            }
            if(e.tapIndex==2){
                console.log(1)
                that.setData({
                   type:"组合贷款",
                   refer:"0.00",                      //月供参考
                    profit:"0.00",                     //支付利息
                    payment:"0.00",                    //还款今晚
                    reduce:"0.00", 
                    money:"0",                           //商贷金额
                    money1:"0"                           //公积金金额
                 })
            }
           
        }
      })
  },
  

  term:function(){                 //贷款年限
              
       var that=this; 
      wx.showActionSheet({
        itemList: ["5", "10", "15","20","25","30"],
        success:function(e){
            if(e.tapIndex==0){
                that.setData({
                   time:5
                 })
            }
            if(e.tapIndex==1){
                that.setData({
                   time:10
                 })
            }
            if(e.tapIndex==2){
                that.setData({
                  time:15
                 })
            }
             if(e.tapIndex==3){
                that.setData({
                   time:20
                 })
            }
             if(e.tapIndex==4){
                that.setData({
                   time:25
                 })
            }
             if(e.tapIndex==5){
                that.setData({
                   time:30
                 })
            }
            that.get(that);
        }
      })
  },

  profit:function(){                    //商业贷款利率
      var that=this; 
      wx.showActionSheet({
        itemList: ["基准利率", "7折利率", "8折利率","8.3折利率",
"8.5折利率","8.8折利率"],
        success:function(e){
            if(e.tapIndex==0){
                that.setData({
                   rate:x.math(4.75)
                 })
            }
            if(e.tapIndex==1){
                that.setData({
                   rate:x.math(4.75*0.75)
                 })
            }
            if(e.tapIndex==2){
                that.setData({
                  rate:x.math(4.75*0.8)
                 })
            }
             if(e.tapIndex==3){
                that.setData({
                    rate:x.math(4.75*0.83)
                 })
            }
             if(e.tapIndex==4){
                that.setData({
                   rate:x.math(4.75*0.85)
                 })
            }
             if(e.tapIndex==5){
                that.setData({
                   rate:x.math(4.75*0.88)
                 })
            }
            that.get(that);
        }
      })
  },

  profit1:function(){             //商业利率2

     var that=this; 
      wx.showActionSheet({
     itemList: ["9折利率","9.5折利率","1.05利率",
"1.1利率","1.2利率","1.3利率"],
      success:function(e){
           if(e.tapIndex==0){
                that.setData({
                   rate:x.math(4.75*0.9)
                 })
            }
            if(e.tapIndex==1){
                that.setData({
                   rate:x.math(4.75*0.95)
                 })
            }
            if(e.tapIndex==2){
                that.setData({
                  rate:x.math(4.75*1.05)
                 })
            }
             if(e.tapIndex==3){
                that.setData({
                    rate:x.math(4.75*1.1)
                 })
            }
             if(e.tapIndex==4){
                that.setData({
                   rate:x.math(4.75*1.2)
                 })
            }
             if(e.tapIndex==5){
                that.setData({
                   rate:x.math(4.75*1.3)
                 })
            }
            that.get(that);    
      }
      })
  },

  profit2:function(e){                //公积金利率
    var that=this;
     wx.showActionSheet({
     itemList: ["基准利率","1.1倍利率"],
      success:function(e){
           if(e.tapIndex==0){
                that.setData({
                   rate1:x.math(2.75)
                 })
            }
            if(e.tapIndex==1){
                that.setData({
                   rate1:x.math(2.75*1.1)
                 })
            }
            that.get(that);
      }
      })
  },

  getmoney:function(e){
    if(e.detail.value){
        var dollar=parseInt(e.detail.value)
    }else{
      var dollar=0.00
    }
      var m=this.data.rate/100/12         //月利率
      var n=this.data.time*12;            //还款时间
      var p=dollar*10000;                 //贷款金额
    if(this.data.state1==="active"){
      var b=(p*m*x.fang((1+m),n))/([x.fang((1+m),n)-1])    //月供                //月供    
      var c=b*n-p                         // 贷款利息
          if(this.data.type==="组合贷款"){
            
             this.setData({
                refer:x.math(parseFloat(x.math(b))+parseFloat(this.data.refer)),
                profit:x.math(parseFloat(x.math(c))+parseFloat(this.data.profit)),
                reduce:x.math(parseFloat(x.math(f))+parseFloat(this.data.reduce)),
                payment:x.math(parseFloat(x.math(p+c))+parseFloat(this.data.payment)),
                money:dollar,
  
             })
          }else{
             this.setData({
                money:parseInt(e.detail.value),
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money:dollar,
              
        })
          }
    }
    if(this.data.state2==="active"){
      console.log(1)
      var b=p/n+p*m                        //月供    
      var c=((p/n+p*m)+p/n*(1+m))/2*n-p;    // 贷款利息
      var f=(p/n*m)                        //月递减
      if(this.data.type==="组合贷款"){ 
             this.setData({
                refer:x.math(parseFloat(x.math(b))+parseFloat(this.data.refer)),
                profit:x.math(parseFloat(x.math(c))+parseFloat(this.data.profit)),
                reduce:x.math(parseFloat(x.math(f))+parseFloat(this.data.reduce)),
                payment:x.math(parseFloat(x.math(p+c))+parseFloat(this.data.payment)),
                money:dollar
             })
             console.log(this.data.payment)
          }else{
             this.setData({
                money:parseInt(e.detail.value),
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money:dollar,
              
        })
          }
    } 
  },


  getmoney1:function(e){
    if(e.detail.value){
        var dollar=parseInt(e.detail.value)
    }else{
      var dollar=0.00
    }
    var m=this.data.rate1/100/12         //月利率
    var n=this.data.time*12;            //还款时间
    var p=dollar*10000;                 //贷款金额
     if(this.data.state1==="active"){
      var b=(p*m*x.fang((1+m),n))/([x.fang((1+m),n)-1])    //月供                //月供    
      var c=b*n-p                         // 贷款利息
      if(this.data.type==="组合贷款"){ 
             this.setData({
                refer:x.math(parseFloat(x.math(b))+parseFloat(this.data.refer)),
                profit:x.math(parseFloat(x.math(c))+parseFloat(this.data.profit)),
                reduce:x.math(parseFloat(x.math(f))+parseFloat(this.data.reduce)),
                payment:x.math(parseFloat(x.math(p+c))+parseFloat(this.data.payment)),
                money:dollar
             })
             console.log(this.data.payment)
          }else{
             this.setData({
                money:parseInt(e.detail.value),
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money1:dollar,
              
        })
          }
    }

    if(this.data.state2==="active"){
      console.log(1)
     
      var b=p/n+p*m                        //月供    
      var c=((p/n+p*m)+p/n*(1+m))/2*n-p;    // 贷款利息
      var f=(p/n*m)                        //月递减
      if(this.data.type==="组合贷款"){ 
             this.setData({
                refer:x.math(parseFloat(x.math(b))+parseFloat(this.data.refer)),
                profit:x.math(parseFloat(x.math(c))+parseFloat(this.data.profit)),
                reduce:x.math(parseFloat(x.math(f))+parseFloat(this.data.reduce)),
                payment:x.math(parseFloat(x.math(p+c))+parseFloat(this.data.payment)),
                money1:dollar
             })
             console.log(this.data.payment)
          }else{
             this.setData({
                money:parseInt(e.detail.value),
                refer:x.math(b),
                profit:x.math(c),
                reduce:x.math(f),
                payment:x.math(p+c),
                money1:dollar,
              
        })
          }
    } 
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})