var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

    },

    gameover:function(){
        cc.log('come in')
        this.timer = 0
        cc.director.loadScene('GameSLB');
    },

    onLoad () {
        Global.OverFlag = false
        this.timer = 0
        Global.LeftRight = 0
        Global.SingleDouble = 0
    },

    start () {
        setTimeout(function(){
            Global.LeftRight = Math.floor(Math.random()*2)+1
        },5000)

        setTimeout(function(){
            Global.SingleDouble = Math.floor(Math.random()*2)+3
        },10000)
    },

    update (dt) {
        if(Global.OverFlag) this.timer += dt
        if(this.timer > 4) this.gameover();
    },
});
