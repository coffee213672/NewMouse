var Global = require('variable')
var MF = require('MouseFunc')
cc.Class({
    extends: cc.Component,

    properties: {
        MoneyLeft: cc.Node,
        MoneyRight: cc.Node,
        ResultPeriod: cc.Label,
        ResultLRSDImg: cc.Node,
        ResuleDBA: cc.Node,
        MouseItem: cc.Node,
        EndBlack: cc.Node
    },

    setMouseValue:function(act,tn,direction){
        var ValueAry = MF.GetMouseSetValue(act,direction)
        tn.node.scaleX = ValueAry[0]
        tn.node.scaleY = ValueAry[1]
        if(act == 'mouse_action3') tn.node.y = tn.node.y - 40
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
                    Global.FinallyActType = MF.GetFinallyActType(Global.LeftRight,Global.SingleDouble)
                    this.goAction(Global.FinallyActType)
                    this.unschedule(this.callback)
                }
            }
        }
        this.schedule(this.callback,0.5)
    },
    
    goActionZero:function(){
        cc.sys.localStorage.setItem('chgflag',false)
        var MouseL = this.getComponent(dragonBones.ArmatureDisplay)
        var Jerry = this
        Global.FirstActFlag = true
        if(Global.LeftRight == 1){
            cc.loader.loadRes("CircleOrange", cc.SpriteFrame, function (err, res) {
                Jerry.MouseItem.children[0].getComponent(cc.Sprite).spriteFrame = res
            })
            this.chgAnimation(MouseL,'mouse_action2','right');
            MouseL.node.runAction(cc.sequence(cc.moveBy(0.8,80,-5),cc.callFunc(function(){this.chgAnimation(MouseL,'mouse_action1','right');},this)));
        }else{
            var move =  cc.sequence(cc.moveBy(0.8,-200,0),cc.callFunc(function(){MouseL.node.active = false},this))
            this.MouseItem.children[0].active = false
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
                    this.MoneyRight.active = false;
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
        if(Mouse.node.x < 0){
            Jerry.getDBData(0)
        }else{
            Jerry.getDBData(1)         
        }
        setTimeout(function(){
            Mouse.node.active = false;
            Jerry.EndBlack.active = true
            Jerry.ResuleDBA.active = true
            Jerry.ResultLRSDImg.active = true
            Jerry.ResultPeriod.node.active = true
            if(Mouse.node.x > 0) Jerry.ResultPeriod.node.y = -53;
            //ResultLRSD
            Jerry.ResultLRSDImg.active = true
            Jerry.ResultLRSDImg.setSiblingIndex(50)
        },2000)
    },

    getDBData:function(AryLoc){
        this.ResuleDBA.addComponent(dragonBones.ArmatureDisplay)
        var DBA = this.ResuleDBA.getComponent(dragonBones.ArmatureDisplay);
        var LRSDloc = Global.FinallyActType-1
        var Jerry = this
        cc.loader.loadRes(Global.ResultMouseDB[AryLoc][0], dragonBones.DragonBonesAsset, (err, res) => {
            cc.loader.loadRes(Global.ResultMouseDB[AryLoc][1], dragonBones.DragonBonesAtlasAsset, (err, res2) => {
                DBA.dragonAsset = res
                DBA.dragonAtlasAsset = res2
                DBA.armatureName = Global.ResultMouseDB[AryLoc][2]
                DBA.playAnimation(DBA.armatureName,1)
                DBA.node.x = -7
                cc.loader.loadRes("Number_SD/"+Global.ResultLRSD[LRSDloc], cc.SpriteFrame, function (err, res) {
                    Jerry.ResultLRSDImg.getComponent(cc.Sprite).spriteFrame = res
                    Jerry.ResultPeriod.string = '期數 '+Global.sn
                    Jerry.ResultLRSDImg.x = Global.ResultPeriodData[0][0]
                    Jerry.ResultLRSDImg.y = Global.ResultPeriodData[0][1]
                    Jerry.ResultLRSDImg.scaleX = Global.ResultPeriodData[0][2]
                    Jerry.ResultLRSDImg.scaleY = Global.ResultPeriodData[0][3]
                    Jerry.ResultLRSDImg.width = Global.ResultPeriodData[0][4]
                    Jerry.ResultLRSDImg.height = Global.ResultPeriodData[0][5]
                })
            })
        })
        Global.OverFlag = true
    },

    MouseCollision:function(other){
        var CollionData = MF.MouseCollisionValue(other,this.recordX,this.recordY)
        var Mouse = this.getComponent(dragonBones.ArmatureDisplay)
        if(CollionData == undefined) return
        if(CollionData.length > 3)this.chgAnimation(Mouse,CollionData[2],CollionData[3])
        else this.chgAnimation(Mouse,CollionData[2])
        return [CollionData[0],CollionData[1]]
    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = false
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
            var NewRXY = this.MouseCollision(other)
            if(NewRXY==undefined) return
            this.recordX = NewRXY[0]
            this.recordY = NewRXY[1]
        }
    },

    // update (dt) {},
});