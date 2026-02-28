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
    const popupImg = document.getElementById('popupImg');
    const popupText = document.getElementById('popupText');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    // 检查元素是否存在，防止报错
    if (popupOverlay && popupImg && popupText && popupCloseBtn) {
        // 当前显示的弹窗索引（初始为0，即第一张）
        let currentPopupIndex = 0;

        // 初始化显示第一张弹窗
        const initPopup = () => {
            const currentPopup = popupConfig[currentPopupIndex];
            popupImg.src = currentPopup.img;
            popupImg.alt = "猫咪弹窗";
            // 图片加载失败容错
            popupImg.onerror = () => {
                console.error(`图片加载失败：${currentPopup.img}，请检查路径/文件名`);
            };
            popupText.textContent = currentPopup.text;
            // 显示弹窗
            setTimeout(() => {
                popupOverlay.classList.add('active');
            }, 500);
        };

        // 关闭/切换弹窗函数
        function closeOrSwitchPopup() {
            // 隐藏当前弹窗（过渡动画）
            popupOverlay.classList.remove('active');
            
            // 延迟切换内容（等动画结束）
            setTimeout(() => {
                // 索引+1，切换到下一张
                currentPopupIndex++;
                // 判断是否还有下一张弹窗
                if (currentPopupIndex < popupConfig.length) {
                    // 还有下一张：更新内容并重新显示
                    const nextPopup = popupConfig[currentPopupIndex];
                    popupImg.src = nextPopup.img;
                    popupText.textContent = nextPopup.text;
                    popupOverlay.classList.add('active');
                } else {
                    // 三张都显示完：真正关闭，刷新后重置
                    currentPopupIndex = 0; // 重置索引，刷新后重新开始
                }
            }, 300); // 对应CSS中弹窗的过渡动画时长（0.3s）
        }

        // 初始化显示第一张弹窗（刷新后也会执行）
        initPopup();

        // 绑定关闭按钮点击事件（切换/关闭弹窗）
        popupCloseBtn.addEventListener('click', closeOrSwitchPopup);

        // 绑定点击遮罩层事件（和按钮逻辑一致）
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closeOrSwitchPopup();
            }
        });
    } else {
        console.error('错误：未找到弹窗相关的 HTML 元素，请检查 index.html 结构。');
    }

    // ================= 轮播图逻辑（保持不变） =================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const items = Array.from(track.children);
        const totalItems = items.length;

        // 根据屏幕宽度判断显示几张
        const getVisibleItems = () => {
            return window.innerWidth <= 768 ? 1 : 3;
        };

        const updateCarousel = () => {
            const visibleItems = getVisibleItems();
            if (items.length === 0) return;
            
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = 16; // 对应 CSS 中的 gap
            
            // 计算最大索引，防止滑出空白
            const maxIndex = totalItems - visibleItems;
            
            // 边界检查
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            // 计算位移距离
            const moveDistance = currentIndex * (itemWidth + gap); 
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // 下一张
        nextBtn.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            if (currentIndex < totalItems - visibleItems) {
                currentIndex++;
                updateCarousel();
            }
        });

        // 上一张
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // 窗口大小改变时重置（防止错位）
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentIndex = 0;
                updateCarousel();
            }, 200);
        });

        // 初始化
        requestAnimationFrame(updateCarousel);
    }
});
