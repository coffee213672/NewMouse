var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

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
    },

    start () {
        setTimeout(function(){
            Global.LeftRight = 1//Math.floor(Math.random()*2)+1
        },5000)

        setTimeout(function(){
            Global.SingleDouble = 4//Math.floor(Math.random()*2)+3
        },10000)

        this.schedule(function(){
            var rand = Math.floor(Math.random()*100)
            cc.sys.localStorage.setItem('pbl',rand)
            cc.sys.localStorage.setItem('pbr',100-rand)
        },5)
    },

    update (dt) {
        if(Global.OverFlag) this.timer += dt
        if(this.timer > 4) this.gameover();
    },
});
