cc.Class({
    extends: cc.Component,

    // properties: {},

    onLoad () {
        this.top = cc.find('Canvas/TipContent');
        this.inarea = false
        this.node.on('mouseenter',function(event){
            this.inarea = true   
            this.top.active = true
        },this);

        this.node.on('mouseleave',function(event){
            this.top.active = false
        },this)

        this.node.on('mousemove',function(event){
            if(this.inarea == true){
                this.top.x = event._x - 411;
                this.top.y = event._y - 375
            }
        },this)
    },

    // start () {
        
    // },

    // update (dt) {},
});
