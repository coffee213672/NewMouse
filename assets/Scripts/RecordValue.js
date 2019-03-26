var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        bgm:{
            type:cc.AudioClip,
            default:null
        }
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.audioID = cc.audioEngine.play(this.bgm,true,0.5)
        if(cc.sys.localStorage.getItem('audioIO') == 1){
            Global.AudioStatus = 1
            cc.audioEngine.pause(this.audioID)
        }

        // let canvas = cc.Canvas.instance.node.getComponent(cc.Canvas)
        // let ScreenSize = cc.winSize
        // let ScreenProportion = (ScreenSize.height) / ScreenSize.width
        // canvas.node.scaleY = 0.5 * ScreenProportion
        // canvas._designResolution.width = ScreenSize.width
        // canvas._designResolution.height = ScreenSize.height
        // cc.view.setDesignResolutionSize(ScreenSize.width,(ScreenSize.height),cc.ResolutionPolicy.NO_BORDER)

        // let CanvasHeight = 320 * screen.height / screen.width
        // canvas.designResolution = new cc.Size(320,CanvasHeight)
        // cc.Canvas.instance.node.setContentSize(320,CanvasHeight)


//         // 适配解决方案
//         let _canvas = cc.Canvas.instance;
// // 设计分辨率比
//         let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
// // 显示分辨率比
//         let _rateV = cc.winSize.height/cc.winSize.width;
//         console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV); 
//         if (_rateV > _rateR)
//         {
//             _canvas.fitHeight = false;
//             _canvas.fitWidth = true;
//             console.log("winSize: fitWidth");
//         }
//         else
//         {
//             _canvas.fitHeight = true;
//             _canvas.fitWidth = false;
//             console.log("winSize: fitHeight");
//         }
//         // console.log(_canvas.node)


    },

    start () {
        this.schedule(function(){
            var audioIO = cc.sys.localStorage.getItem('audioIO')
            if(audioIO == 1 && Global.AudioStatus != audioIO){
                cc.audioEngine.pause(this.audioID);
                Global.AudioStatus = audioIO
            }else if(audioIO == 0 && Global.AudioStatus != audioIO){
                cc.audioEngine.resume(this.audioID);
                Global.AudioStatus = audioIO
            }
        },0.1)
    },
});
