var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        MoneyLeft: cc.Node,
        MoneyRight: cc.Node,
        ResultPeriod: cc.Label,
        ResultLRSDImg: cc.Node,
        ResuleDBA: cc.Node,
    },

    setMouseValue:function(act,tn,direction){
        switch(act){
            case 'mouse_action1':
                if(direction == 'right'){
                    tn.node.scaleX = -0.425;
                    tn.node.scaleY = 0.425;
                }else{
                    tn.node.scaleX = 0.425;
                    tn.node.scaleY = 0.425;
                }
            break;
            case 'mouse_action2':
                if(direction == 'right'){
                    tn.node.scaleX = -0.4;
                    tn.node.scaleY = 0.4;
                }else{
                    tn.node.scaleX = 0.4;
                    tn.node.scaleY = 0.4;
                }
            break;
            case 'mouse_action3':
                tn.node.scaleX = 0.5;
                tn.node.scaleY = 0.5;
                tn.node.y = tn.node.y - 40
            break;
            case 'mouse_action8':
                tn.node.scaleX = 0.3;
                tn.node.scaleY = -0.3;
            break;
            case 'mouse_action5':
                tn.node.scaleX = 1;
                tn.node.scaleY = 1;
            break;
            case 'mouse_action9':
                if(direction == 'right'){
                    tn.node.scaleX = -0.4;
                    tn.node.scaleY = 0.4;
                }else{
                    tn.node.scaleX = 0.4;
                    tn.node.scaleY = 0.4;
                }
            break;
        }
    },

    chgAnimation:function(mouse,anim,gowhere){
        if(typeof gowhere == undefined) this.setMouseValue(anim,mouse);
        else this.setMouseValue(anim,mouse,gowhere);
        mouse.armatureName = anim;
        mouse.playAnimation(anim);
    },

    setNewSchedule:function(){
        this.callback = function(){
            if(Global.LeftRight > 0){
                if(Global.SingleDouble>2){
                    if(Global.LeftRight == 1 && Global.SingleDouble == 3)  Global.FinallyActType = 1
                    else if(Global.LeftRight == 2 && Global.SingleDouble == 3) Global.FinallyActType = 2
                    else if(Global.LeftRight == 1 && Global.SingleDouble == 4) Global.FinallyActType = 3
                    else if(Global.LeftRight == 2 && Global.SingleDouble == 4) Global.FinallyActType = 4
                    this.goAction(Global.FinallyActType)
                    this.unschedule(this.callback)
                }
            }
        }
        this.schedule(this.callback,0.5)
    },
    
    goActionZero:function(){
        cc.sys.localStorage.setItem('chgflag',false)
        var MouseL = this.getComponent(dragonBones.ArmatureDisplay);
        Global.FirstActFlag = true
        if(Global.LeftRight == 1){
            this.chgAnimation(MouseL,'mouse_action2','right');
            MouseL.node.runAction(cc.sequence(cc.moveBy(0.8,80,-5),cc.callFunc(function(){this.chgAnimation(MouseL,'mouse_action1','right');},this)));

        }else{
            var move =  cc.sequence(cc.moveBy(0.8,-200,0),cc.callFunc(function(){MouseL.node.active = false},this))
            MouseL.node.runAction(move);
            this.chgAnimation(MouseL,'mouse_action2');
        }
    },

    goAction:function(Mode){
        var MouseL = this.getComponent(dragonBones.ArmatureDisplay);
        Global.SecondActFlag = true
        switch (Mode){
            case 1:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.8,0,-268),cc.callFunc(function(){
                    this.MoneyLeft.active = false;
                    // var superInfo = cc.find('superInfo');
                    // if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                    this.ShowResult(MouseL)
                },this));
                MouseL.node.runAction(move);
                this.chgAnimation(MouseL,'mouse_action8');
                break;
            case 3:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.5,0,-185),cc.callFunc(function(){
                    this.MoneyLeft.active = false;
                    // var superInfo = cc.find('superInfo');
                    // if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                    this.ShowResult(MouseL)
                },this));
                MouseL.node.runAction(move);
                this.chgAnimation(MouseL,'mouse_action8');
                break;
        }
    },

    ShowResult:function(Mouse){
        var Jerry = this;
        setTimeout(function(){
            Mouse.node.x = 0;
            Mouse.node.y = 0;
            Mouse.node.active = false;
            if(Mouse.node.x < 0){
                Jerry.LoadDBA('mouse_action6')
                Jerry.ResultPeriod.string = '期數 '+Global.sn
            }else{
                Jerry.LoadDBA('mouse_action7')
                Jerry.ResultPeriod.string = '期數 '+Global.sn
                Jerry.ResultPeriod.node.y = -53;
            }
            //ResultLRSD
            Jerry.ResultLRSDImg.active = true
            Jerry.ResultLRSDImg.setSiblingIndex(50)
            cc.loader.loadRes("Number_SD/"+Global.ResultLRSD[Global.FinallyActType-1], function (err, res) {
                Jerry.ResultLRSDImg.getComponent(cc.Sprite).spriteFrame = res
            })
            Jerry.ResultPeriod.node.active = true
            // Jerry.ResultPeriod.setSiblingIndex(51);
        },2000)
    },

    LoadDBA:function(AnimName){
        var DBA = this.ResuleDBA.getComponent(dragonBones.ArmatureDisplay);
        cc.loader.loadRes('Mouse/action_ske', dragonBones.DragonBonesAsset, (err, res) => {
            cc.loader.loadRes('Mouse/action_tex', dragonBones.DragonBonesAtlasAsset, (err, res2) => {
                DBA.dragonAsset = res
                DBA.dragonAtlasAsset = res2
                DBA.armatureName = AnimName
                DBA.playAnimation(DBA.armatureName)
            })
        })
    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = true
    },

    start () {
        this.recordX = this.node.x;
        this.recordY = this.node.y;

        //左右計時器
        this.callback1 = function(){
            if(Global.LeftRight > 0){
                this.goActionZero();
                if(Global.LeftRight == 1) this.setNewSchedule(); //啟動單雙計時器
                this.unschedule(this.callback1)
            }
        }
        this.schedule(this.callback1,0.5)
    },

    onCollisionEnter: function (other, self) {
        if(Global.LeftRight == 1){
            var dX = this.recordX - other.node.x;
            var dY = this.recordY - other.node.y;
            var absX = Math.abs(dX);
            var absY = Math.abs(dY);
            var Mouse = this.getComponent(dragonBones.ArmatureDisplay)
            if(absX != 0){
                if(absX > 30 && absX < 70){
                    if(dX > 0) this.chgAnimation(Mouse,'mouse_action1');
                    else this.chgAnimation(Mouse,'mouse_action1','right');
                }else if(absX > 300){
                    this.chgAnimation(Mouse,'mouse_action8');
                }
            }else{
                if(absY < 170){
                    if(other.node.x > 0) this.chgAnimation(Mouse,'mouse_action9');
                    else this.chgAnimation(Mouse,'mouse_action9','right');
                }else{
                    this.chgAnimation(Mouse,'mouse_action3','right');
                }
            }
        
            this.recordX = other.node.x;
            this.recordY = other.node.y;
        }
    },

    // update (dt) {},
});
