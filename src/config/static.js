global.Static = {
    // 订单状态
    orderStatus: {
        // 未支付
        orderStatus_un: 0, 
        // 已支付(待发货)
        orderStatus_pay: 1,   
        // 已取消 
        orderStatus_cancel: 2,     
        // 已关闭
        orderStatus_close: 3,  
        // 已发货(待签收)    
        orderStatus_send: 4,   
        // 已收货    
        orderStatus_receive: 5,    
        // 已完成
        orderStatus_complete: 6    
    },
    // 订单审批状态
    orderExamineStatus: {
        // 发起申请（一级待审批）
        apply: 1,
        //  一级审批 驳回 
        firstRejected: 2,
        // 一级审批通过（二级待审批）
        firstExamined: 3,
        // 二级审批驳回
        secondRejected: 4,
        // 二级审批通过(等待确认)
        secondExamined: 5,
        // 财务已确认
        confirm: 6
    }
};
