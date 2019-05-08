const MF = {
    GetMouseSetValue (act,direction) {
        var SetValueAry = new Array();
        switch(act){
            case 'mouse_action1':
                if(direction == 'right') SetValueAry = [-0.425,0.425]
                else SetValueAry = [0.425,0.425]
            break;
            case 'mouse_action2':
                if(direction == 'right') SetValueAry = [-0.4,0.4]
                else SetValueAry = [0.4,0.4]
            break;
            case 'mouse_action3':
                SetValueAry = [0.5,0.5]
            break;
            case 'mouse_action8':
                SetValueAry = [0.3,-0.3]
            break;
            case 'mouse_action5':
                SetValueAry = [1,1]
            break;
            case 'mouse_action9':
                if(direction == 'right') SetValueAry = [-0.4,0.4]
                else SetValueAry = [0.4,0.4]
            break;
        }
            return SetValueAry
    },

    GetFinallyActType (LR,SD) {
        var FAT = 0;
        if(LR == 1 && SD == 3)  FAT = 1
        else if(LR == 2 && SD == 3) FAT = 2
        else if(LR == 1 && SD == 4) FAT = 3
        else if(LR == 2 && SD == 4) FAT = 4
        return FAT
    },

    MouseCollisionValue (other,rX,rY) {
        var noX = Math.round(other.node.x)
        var noY = Math.round(other.node.y)
        var dX = rX - noX
        var dY = rY - noY
        var absX = Math.abs(dX);
        var absY = Math.abs(dY);
        if(absX != 0){
            if(absX >= 20 && absX < 70){ 
                if(dX > 0) return [noX,noY,'mouse_action1']
                else return [noX,noY,'mouse_action1','right']
            }else if(absX > 300){
                return [noX,noY,'mouse_action8']
            }
        }else{
            if(absY < 170){
                if(other.node.x > 0) return [noX,noY,'mouse_action9']
                else return [noX,noY,'mouse_action9','right']
            }else{
                return [noX,noY,'mouse_action3','right']
            }
        }
    },

    GetGoActionMove (Mode) {
        switch (Mode){
            case 1:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.8,0,-268))
                return move
            case 2:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.8,0,-268))
                return move
            case 3:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.5,0,-185))
                return move
            case 4:
                var move = cc.sequence(cc.moveBy(0.25,0,-79),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,-344,0),cc.moveBy(0.25,0,-84),cc.moveBy(1,344,0),cc.moveBy(0.5,0,-185))
                return move
        }
    }
}
export default MF