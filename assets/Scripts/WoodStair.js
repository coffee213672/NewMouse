var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    setSecondSchedule:function(){
        this.callback = function() {
            if(Global.SecondActFlag){
                cc.log('in second control wood')
                switch (Global.FinallyActType){
                    case 1:
                    case 2:
                        this.controlwoodmaskS()
                    break
                    case 3:
                    case 4:
                        this.controlwoodmaskD()
                    break
                }
            }
        }
        this.schedule(this.callback,0.5)
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
        var wh =  this.stair_d._parent.height
        var countsq = 0;
        for(var i=wh;i>=0;i--){
            this.controlwoodtimeoutD(i,countsq)
            countsq += 1;
        }
    },

    controlwoodtimeoutD:function(WoodHeight,delayT){
        var xdx = this;
        setTimeout(function(){
            xdx.stair_d._parent.height = WoodHeight
        },50+delayT*30)
    },


    controlwoodmaskS:function(){
        var wh =  this.stair_d._parent.height
        var countsq = 0;
        for(var i=wh;i>=0;i--){
            this.controlwoodtimeoutS(i,countsq)
            countsq += 1;
        }
    },

    controlwoodtimeoutS:function(WoodHeight,delayT){
        var xdx = this;
        setTimeout(function(){
            xdx.stair_s._parent.height = WoodHeight
        },50+delayT*30)
    },

    // onLoad () {},

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
