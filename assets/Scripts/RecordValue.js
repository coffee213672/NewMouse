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
        cc.game.addPersistRootNode(this.node)
        this.audioID = cc.audioEngine.play(this.bgm,true,0.5)
        if(cc.sys.localStorage.getItem('audioIO') == 1){
            Global.AudioStatus = 1
            cc.audioEngine.pause(this.audioID)
        }
    },

    start () {
        this.schedule(function(){
            var audioIO = cc.sys.localStorage.getItem('audioIO')
            if(audioIO == 1 && Global.AudioStatus != audioIO){
                cc.audioEngine.pause(this.audioID)
                Global.AudioStatus = audioIO
            }else if(audioIO == 0 && Global.AudioStatus != audioIO){
                cc.audioEngine.resume(this.audioID)
                Global.AudioStatus = audioIO
            }
        },0.1)
    },
});
