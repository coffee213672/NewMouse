module.exports = {
    sn: 0, // 期數
    OldSn: 0, // 上期遊戲期數
    LeftRight: 0, // 左右
    SingleDouble: 0, // 單雙
    FirstActFlag:false, // 開左右
    SecondActFlag:false, // 全開
    FinallyActType:0, // 移動模式
    OverFlag:false,
    AudioStatus: 0,
    ResultLRSD:['DoubleThree','SingleThree','SingleFour','DoubleFour'],
    ResultMouseDB:[
        ['ResultSingle/action3_ske','ResultSingle/action3_tex','mouse_action6'],
        ['ResultDouble/action2_ske','ResultDouble/action2_tex','mouse_action7']
    ],
    ResultPeriodData:[
        [-1,-130,1.2,1.2,77,72],
        [3,-130,1.2,1.2,77,72]
    ],
    ResultSDValue:[
        [0,1,1,1,2,2],
        [0,0,1,1,2,2],
        [0,0,1,1,3,3],
        [0,1,1,1,3,3]
    ], // 結果單雙龍骨設定值陣列key
}