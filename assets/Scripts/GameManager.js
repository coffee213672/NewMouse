var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {
        setTimeout(function(){
            Global.LeftRight = 2;
            cc.log(Global.LeftRight)
        },5000)
    },

    // update (dt) {},
});
