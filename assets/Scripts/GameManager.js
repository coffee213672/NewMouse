var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {
        setTimeout(function(){
            Global.LeftRight = 2;
        },5000)

        setTimeout(function(){
            Global.SingleDouble = 3;
        },10000)
    },

    // update (dt) {},
});
