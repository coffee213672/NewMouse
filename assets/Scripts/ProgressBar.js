var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    progressbarMove:function(old_value,newBarV,progressbar,bar_string){
        var countT = old_value
        if(newBarV > old_value){
            function addP(){
                countT++
                if(countT > newBarV) return false
                progressbar.progress = (countT / 100)
                bar_string.string = countT+'%'
                setTimeout(addP,22)
            }
            addP();
        }else{
            function cutP(){
                countT--
                if(countT < newBarV) return false
                progressbar.progress = (countT / 100)
                bar_string.string = countT+'%'
                setTimeout(cutP,22)
            }
            cutP();
        }
    },

    onLoad () {
        this.old_pbl = 0
        this.old_pbr = 0
    },

    start () {
        this.callback = function(){
            if(Global.SecondActFlag)this.unschedule(this.callback)
            var GetPbl = parseInt(cc.sys.localStorage.getItem('pbl'))
            var GetPbr = parseInt(cc.sys.localStorage.getItem('pbr'))
            if((GetPbl != this.old_pbl) && (GetPbr != this.old_pbr)){
                this.progressbarMove(this.old_pbl,GetPbl,this.node.children[1].getComponent(cc.ProgressBar),this.node.children[4].getComponent(cc.Label))
                this.progressbarMove(this.old_pbr,GetPbr,this.node.children[2].getComponent(cc.ProgressBar),this.node.children[5].getComponent(cc.Label))
                this.old_pbl = GetPbl
                this.old_pbr = GetPbr
            }
        }
        this.schedule(this.callback,1)
    },

    // update (dt) {},
});
