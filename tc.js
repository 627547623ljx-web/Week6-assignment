// 等待页面所有元素加载完成后再执行
document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 弹窗配置与逻辑 =================
    const popupConfig = [
        {
            img: "弹窗图1.jpg", 
            text: "Hi！看看我性感的大PP😺 "
        },
        {
            img: "弹窗图2.jpg",
            text: "是我～🧡我的睡姿优美吗"
        },
        {
            img: "弹窗图3.jpg",
            text: "还是我～💙 你把我吵醒了！"
        }
    ];

    // 获取 DOM 元素
    const popupOverlay = document.getElementById('popupOverlay');
    const popupImg = docu
