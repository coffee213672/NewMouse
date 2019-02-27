var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        ColliderDL: cc.Node,
        ColliderDR: cc.Node,
    },

    setSecondSchedule:function(){
        this.callback2 = function() {
            if(Global.SecondActFlag){
                switch (Global.FinallyActType){
                    case 1:
                    case 2:
                        this.controlwoodmaskS()
                    break
                    case 3:
                    case 4:
                        this.node.children[0].active = true
                        this.ColliderDL.active = true
                        this.ColliderDR.active = true
                        this.controlwoodmaskD()
                    break
                }
                this.unschedule(this.callback2)
            }
        }
        this.schedule(this.callback2,0.5)
    },

    controlmask:function(){
        var mh =  this.node.children[1].height
        var countsq = 0;
        for(var i=mh;i>=100;i--){
            this.controlmasktimeout(i,countsq)
            countsq += 1;
        }
    },

    controlmasktimeout:function(MaskHeight,delayT){
        var Jerry = this;
        setTimeout(function(){
            Jerry.node.children[1].height = MaskHeight
        },50+delayT*10)
    },

    controlwoodmaskD:function(){
        var wh =  this.node.children[0].height
        var countsq = 0;
        for(var i=wh;i>=0;i--){
            this.controlwoodtimeoutD(i,countsq)
            countsq += 1;
        }
    },

    controlwoodtimeoutD:function(WoodHeight,delayT){
        var Jerry = this;
        setTimeout(function(){
            Jerry.node.children[0].height = WoodHeight
        },50+delayT*30)
    },


    controlwoodmaskS:function(){
        var wh =  this.node.children[0].height
        var countsq = 0;
        for(var i=wh;i>=0;i--){
            this.controlwoodtimeoutS(i,countsq)
            countsq += 1;
        }
    },

    controlwoodtimeoutS:function(WoodHeight,delayT){
        var Jerry = this;
        setTimeout(function(){
            Jerry.node.children[1].height = WoodHeight
        },50+delayT*30)
    },

    onLoad () {
        this.ColliderDL.active = false
        this.ColliderDR.active = false
    },

    start () {
        this.callback = function(){
            if(Global.FirstActFlag){
                this.controlmask()
                this.setSecondSchedule();
                this.unschedule(this.callback)
            }
        }
        this.schedule(this.callback,1)
    },

    // update (dt) {},
});
