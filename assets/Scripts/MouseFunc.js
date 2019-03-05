module.exports.GetMouseSetValue = function(act,direction){
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
}

module.exports.GetFinallyActType = function(LR,SD){
    var FAT = 0;
    if(LR == 1 && SD == 3)  FAT = 1
    else if(LR == 2 && SD == 3) FAT = 2
    else if(LR == 1 && SD == 4) FAT = 3
    else if(LR == 2 && SD == 4) FAT = 4
    return FAT
}