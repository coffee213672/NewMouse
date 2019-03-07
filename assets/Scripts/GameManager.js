var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Period:cc.Node
    },

    setNewSchedule:function(){
        this.callback1 = function(){
            var MSD = cc.sys.localStorage.getItem('sd')
            cc.log('this is two')
            if(MSD != 0 && MSD != ''){
                Global.SingleDouble = parseInt(MSD)
                this.unschedule(this.callback1)
            }
        }
        this.schedule(this.callback1,0.5)
    },

    gameover:function(){
        this.timer = 0
        cc.director.loadScene('GameSLB');
    },

    onLoad () {
        Global.OverFlag = false
        this.timer = 0
        Global.LeftRight = 0
        Global.SingleDouble = 0
        cc.sys.localStorage.setItem('pbl',0)
        cc.sys.localStorage.setItem('pbr',0)
        cc.sys.localStorage.setItem('lr' ,0)
        cc.sys.localStorage.setItem('sd',0)
    },

    start () {
        // setTimeout(function(){
        //     Global.LeftRight = Math.floor(Math.random()*2)+1
        // },5000)

        // setTimeout(function(){
        //     Global.SingleDouble = Math.floor(Math.random()*2)+3
        // },10000)

        this.callback = function(){
            var MLR = cc.sys.localStorage.getItem('lr')
            cc.log('this is one')
            if(MLR != 0 && MLR != '') {
                Global.LeftRight = parseInt(MLR)
                this.setNewSchedule();
                this.unschedule(this.callback)
            }
        }

        this.schedule(this.callback,1)

        this.schedule(function(){
            var rand = Math.floor(Math.random()*100)
            cc.sys.localStorage.setItem('pbl',rand)
            cc.sys.localStorage.setItem('pbr',100-rand)
        },5)

        //檢查期數計時器
        this.schedule(function(){
            var GetSn = cc.sys.localStorage.getItem('sn')
            cc.log('期數檢查計時器')
            if(GetSn != Global.sn){
                this.Period.getComponent(cc.Label).string = GetSn
                this.Period.children[0].getComponent(cc.Label).string = GetSn
                Global.sn = GetSn
            }
        },0.5)
    },

    update (dt) {
        if(Global.OverFlag) this.timer += dt
        if(this.timer > 4) this.gameover();
    },

    //正式上web須測試
    lateUpdate() {
        if (cc.sys.isBrowser) {
            let context = cc.sys.__audioSupport.context;
            if(context != undefined){
                if (context.state === 'suspended') {
                    context.resume()
                }
            }
        }
    }
});
