var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        //原始高度
        heightY : 0,
        //上下動作時間
        updowntime : 0,
    },

    setAction:function(){
        var up = cc.moveBy(this.updowntime, cc.v2(0,this.heightY));
        var down = cc.moveBy(this.updowntime, cc.v2(0,-this.heightY));
        return cc.repeatForever(cc.sequence(up, down));
    },

    onLoad () {
        this.updownAction = this.setAction();
        this.node.runAction(this.updownAction);
    },

    start () {
        this.callback1 = function(){
            if(Global.LeftRight > 0){
                this.node.destroy()
            }
        }
        this.schedule(this.callback1,0.5)
    },

    // update (dt) {},

    
});
