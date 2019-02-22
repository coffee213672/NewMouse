var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
      
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
            cc.log('第二個計時器')
            if(Global.LeftRight > 0){
                if(Global.SingleDouble>2){

                    this.unschedule(this.callback)
                }
            }
        }
        this.schedule(this.callback,0.5)
    },
    
    goActionZero:function(){
        cc.sys.localStorage.setItem('chgflag',false)
        var MouseL = this.MouseLeft.getComponent(dragonBones.ArmatureDisplay);
        var MouseR = this.MouseRight.getComponent(dragonBones.ArmatureDisplay);
        Global.FirstActFlag = true
        if(Global.LeftRight == 1){
            this.chgAnimation(MouseL,'mouse_action2','right');
            MouseL.node.runAction(cc.sequence(cc.moveBy(0.8,80,-5),cc.callFunc(function(){this.chgAnimation(MouseL,'mouse_action1','right');},this)));

            var move =  cc.sequence(cc.moveBy(0.8,200,0),cc.callFunc(function(){MouseR.node.active = false},this))
            MouseR.node.runAction(move);
            this.chgAnimation(MouseR,'mouse_action2','right');

            // if(this.whichmouse == 'mouse_left'){
            //     this.controlmask()
            //     this.chgAnimation('mouse_action2','right');
            //     this.getComponent(dragonBones.ArmatureDisplay).node.runAction(cc.sequence(cc.moveBy(0.8,80,-5),cc.callFunc(function(){this.chgAnimation('mouse_action1','right');},this)));
            // }else{
            //     var move =  cc.sequence(cc.moveBy(0.8,200,0),cc.callFunc(function(){this.getComponent(dragonBones.ArmatureDisplay).node.active = false},this))
            //     this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
            //     this.chgAnimation('mouse_action2','right');
            // }
        }else{
            this.chgAnimation(MouseR,'mouse_action2');
            MouseR.node.runAction(cc.sequence(cc.moveBy(0.8,-80,-5),cc.callFunc(function(){this.chgAnimation(MouseR,'mouse_action1');},this)));

            var move =  cc.sequence(cc.moveBy(0.8,-200,0),cc.callFunc(function(){MouseL.node.active = false},this))
            MouseL.node.runAction(move);
            this.chgAnimation(MouseL,'mouse_action2');
            // if(this.whichmouse == 'mouse_right_all'){
            //     this.controlmask()
            //     this.chgAnimation('mouse_action2');
            //     this.getComponent(dragonBones.ArmatureDisplay).node.runAction(cc.sequence(cc.moveBy(0.8,-80,-5),cc.callFunc(function(){this.chgAnimation('mouse_action1');},this)));
            // }else{
            //     var move =  cc.sequence(cc.moveBy(0.8,-200,0),cc.callFunc(function(){this.getComponent(dragonBones.ArmatureDisplay).node.active = false},this))
            //     this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
            //     this.chgAnimation('mouse_action2');
            // }
        }
    },

    goAction:function(Mode){
        switch (Mode){
            case 1:
                if(this.whichmouse == 'mouse_left'){
                    this.controlwoodmaskS()
                    var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.8,0,-268),cc.callFunc(function(){
                        this.moneyRight.active = false;
                        var superInfo = cc.find('superInfo');
                        if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                        this.showresult(this.getComponent(dragonBones.ArmatureDisplay))
                    },this));
                    this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
                    this.chgAnimation('mouse_action8');
                }
                break;
            case 2:
                if(this.whichmouse == 'mouse_right_all'){
                    this.controlwoodmaskS()
                    var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.8,0,-268),cc.callFunc(function(){
                        var superInfo = cc.find('superInfo');
                        if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                        this.moneyLeft.active = false;
                        this.showresult(this.getComponent(dragonBones.ArmatureDisplay))
                    },this));
                    this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
                    this.chgAnimation('mouse_action8');
                }
                break;
            case 3:
                if(this.whichmouse == 'mouse_left'){
                    this.controlwoodmaskD()
                    var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.5,0,-185),cc.callFunc(function(){
                        this.moneyLeft.active = false;
                        var superInfo = cc.find('superInfo');
                        if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                        this.showresult(this.getComponent(dragonBones.ArmatureDisplay))
                        },this));
                    this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
                    this.chgAnimation('mouse_action8');
                }
                break;
            case 4:
                if(this.whichmouse == 'mouse_right_all'){
                    this.controlwoodmaskD()
                    var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.5,0,-185),cc.callFunc(function(){
                        this.moneyRight.active = false;
                        var superInfo = cc.find('superInfo');
                        if(superInfo.audioIO == 0) cc.audioEngine.playMusic(this.getmusic, false, 0.5);
                        this.showresult(this.getComponent(dragonBones.ArmatureDisplay))
                        },this));
                    this.getComponent(dragonBones.ArmatureDisplay).node.runAction(move);
                    this.chgAnimation('mouse_action8');
                }
            break;
        }
    },

    onLoad () {
        this.MouseLeft = this.node.children[0]
        this.MouseRight = this.node.children[1]

        cc.director.getCollisionManager().enabled = true
        cc.director.getCollisionManager().enabledDebugDraw = false  
    },

    onCollisionEnter: function (other, self) {
        var dX = this.recordX - other.node.x;
        var dY = this.recordY - other.node.y;
        var absX = Math.abs(dX);
        var absY = Math.abs(dY);
        if(absX != 0){
            if(absX > 30 && absX < 70){
                if(dX > 0) this.chgAnimation('mouse_action1');
                else this.chgAnimation('mouse_action1','right');
            }else if(absX > 300){
                this.chgAnimation('mouse_action8');
            }
        }else{
            if(absY < 170){
                if(other.node.x > 0) this.chgAnimation('mouse_action9');
                else this.chgAnimation('mouse_action9','right');
            }else{
                this.chgAnimation('mouse_action3','right');
            }
        }
        
        this.recordX = other.node.x;
        this.recordY = other.node.y;
    },

    start () {
        this.recordX = this.node.x;
        this.recordY = this.node.y;

        //左右計時器
        this.callback1 = function(){
            if(Global.LeftRight > 0){
                this.goActionZero();
                this.setNewSchedule(); //啟動單雙計時器
                this.unschedule(this.callback1)
            }
        }
        this.schedule(this.callback1,0.5)
    },

    // update (dt) {},
});
