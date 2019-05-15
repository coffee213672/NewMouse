var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Period:cc.Node
    },

    setNewSchedule:function(){
        this.callback1 = function(){
            var MSD = cc.sys.localStorage.getItem('sd')
            if(MSD != 0 && MSD != ''){
                Global.SingleDouble = parseInt(MSD)
                this.unschedule(this.callback1)
            }
        }
        this.schedule(this.callback1,0.5)
    },

    setSn:function(GetSn = '0000000'){
        this.Period.getComponent(cc.Label).string = '第 '+GetSn+' 期'
        this.Period.children[0].getComponent(cc.Label).string = '第 '+GetSn+' 期'
        Global.sn = GetSn
        Global.OldSn = GetSn
    },

    gameover:function(){
        this.timer = 0
        cc.director.loadScene('GameSLB')
    },

    onLoad () {
        Global.OverFlag = false
        this.timer = 0
        Global.LeftRight = 0
        Global.SingleDouble = 0
        Global.sn = 0
        cc.sys.localStorage.setItem('pbl',0)
        cc.sys.localStorage.setItem('pbr',0)
        cc.sys.localStorage.setItem('lr' ,0)
        cc.sys.localStorage.setItem('sd',0)

        if(!cc.sys.localStorage.getItem('chgflag')) cc.sys.localStorage.setItem('sn','0000000')

        let canvas = cc.Canvas.instance.node.getComponent(cc.Canvas)
        let ScreenSize = cc.winSize
        let ScreenProportion = (ScreenSize.height) / ScreenSize.width
        canvas.node.scaleY = 0.5 * ScreenProportion
        cc.view.setDesignResolutionSize(ScreenSize.width,(ScreenSize.height),cc.ResolutionPolicy.NO_BORDER)
     },

    start () {
        /*
            測試老鼠動作 LeftRight:左或右老鼠, SingleDouble:單或雙梯子
            setTimeout(function(){
                Global.LeftRight = Math.floor(Math.random()*2)+1
            },5000)

            setTimeout(function(){
                Global.SingleDouble = Math.floor(Math.random()*2)+3
            },10000)
        */

        this.callback = function(){
            var MLR = cc.sys.localStorage.getItem('lr')
            if(MLR != 0 && MLR != '') {
                Global.LeftRight = parseInt(MLR)
                this.setNewSchedule();
                this.unschedule(this.callback)
            }
        }

        this.schedule(this.callback,1)
        /*
            熱度條亂數生成計時器(5秒一次)
            this.schedule(function(){
                var rand = Math.floor(Math.random()*100)
                cc.sys.localStorage.setItem('pbl',rand)
                cc.sys.localStorage.setItem('pbr',100-rand)
            },5)
        */

        //檢查期數計時器
        this.schedule(function(){
            var GetSn = cc.sys.localStorage.getItem('sn')
            if(Global.OldSn == 0){
                if(Global.OldSn != GetSn) this.setSn(GetSn)
            }else{
                if(Global.sn != 0 && GetSn != Global.sn) this.gameover()
                if(Global.sn == 0)  this.setSn(GetSn)
                if(GetSn == null){
                    cc.sys.localStorage.setItem('sn','0000000')
                    this.setSn()
                }
            }
        },0.5)
    },

    update (dt) {
        if(Global.OverFlag) this.timer += dt
        if(this.timer > 4) this.gameover();
    },

    // 若音訊能正常播放無須以下(Chrome瀏覽器機制，不會主動播放音訊，需要有對頁面進行任何動作才會。以下是直接改變狀態)
    // lateUpdate() {
    //     if (cc.sys.isBrowser) {
    //         let context = cc.sys.__audioSupport.context;
    //         if(context != undefined){
    //             if (context.state === 'suspended') {
    //                 context.resume()
    //             }
    //         }
    //     }
    // }
});
