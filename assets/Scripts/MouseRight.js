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
        var MouseR = this.getComponent(dragonBones.ArmatureDisplay);
        var Jerry = this
        Global.FirstActFlag = true
        if(Global.LeftRight == 1){
            this.MouseItem.children[1].active = false
            var move =  cc.sequence(cc.moveBy(0.8,200,0),cc.callFunc(function(){MouseR.node.active = false},this))
            MouseR.node.runAction(move);
            this.chgAnimation(MouseR,'mouse_action2','right');
        }else{
            cc.loader.loadRes("CircleOrange", cc.SpriteFrame, function (err, res) {
                Jerry.MouseItem.children[1].getComponent(cc.Sprite).spriteFrame = res
            })
            this.chgAnimation(MouseR,'mouse_action2');
            MouseR.node.runAction(cc.sequence(cc.moveBy(0.8,-80,-5),cc.callFunc(function(){this.chgAnimation(MouseR,'mouse_action1');},this)));
        }
    },

    goAction:function(Mode){
        var MouseR = this.getComponent(dragonBones.ArmatureDisplay);
        Global.SecondActFlag = true
        switch (Mode){
            case 2:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.8,0,-268),cc.callFunc(function(){
                    // var superInfo = cc.find('superInfo');
                    // if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                    this.MoneyLeft.active = false;
                    this.ShowResult(MouseR)
                },this));
                MouseR.node.runAction(move);
                this.chgAnimation(MouseR,'mouse_action8');
            break;
            case 4:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.5,0,-185),cc.callFunc(function(){
                    this.MoneyRight.active = false;
                    // var superInfo = cc.find('superInfo');
                    // if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                    this.ShowResult(MouseR)
                },this));
                MouseR.node.runAction(move);
                this.chgAnimation(MouseR,'mouse_action8');
            break;
        }
    },

    ShowResult:function(Mouse){
        var Jerry = this;
        setTimeout(function(){
            Mouse.node.active = false;
            Jerry.EndBlack.active = true
            if(Mouse.node.x < 0){
                Jerry.getDBData(0)
            }else{
                Jerry.getDBData(1)         
                Jerry.ResultPeriod.node.y = -53;
            }
            //ResultLRSD
            Jerry.ResultLRSDImg.active = true
            Jerry.ResultLRSDImg.setSiblingIndex(50)
            // Jerry.ResultPeriod.setSiblingIndex(51);
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
                DBA.playAnimation(DBA.armatureName)
                cc.loader.loadRes("Number_SD/"+Global.ResultLRSD[LRSDloc], cc.SpriteFrame, function (err, res) {
                    Jerry.ResultLRSDImg.getComponent(cc.Sprite).spriteFrame = res
                    Jerry.ResultPeriod.string = '期數 '+Global.sn
                    Jerry.ResultLRSDImg.x = Global.ResultPeriodData[1][0]
                    Jerry.ResultLRSDImg.y = Global.ResultPeriodData[1][1]
                    Jerry.ResultLRSDImg.scaleX = Global.ResultPeriodData[1][2]
                    Jerry.ResultLRSDImg.scaleY = Global.ResultPeriodData[1][3]
                    Jerry.ResultLRSDImg.width = Global.ResultPeriodData[1][4]
                    Jerry.ResultLRSDImg.height = Global.ResultPeriodData[1][5]
                    Jerry.ResultPeriod.node.active = true
                })
            })
        })
        Global.OverFlag = true
    },

    MouseCollision:function(other){
        var CollionData = MF.MouseCollisionValue(other.node.x,other.node.y,this.recordX,this.recordY)
        var Mouse = this.getComponent(dragonBones.ArmatureDisplay)
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
                if(Global.LeftRight == 2) this.setNewSchedule(); //啟動單雙計時器 
                this.unschedule(this.callback1)
            }
        }
        this.schedule(this.callback1,0.5)
    },

    onCollisionEnter: function (other, self) {
        if(Global.LeftRight == 2){
            var NewRXY = this.MouseCollision(other)
            this.recordX = NewRXY[0]
            this.recordY = NewRXY[1]
        }
    },

    // update (dt) {},
});
