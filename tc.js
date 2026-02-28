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
        // 【核心修改1】移除 localStorage 状态记录，确保每次刷新都随机显示
        // 删掉原有的 hasClosedPopup 检查逻辑
        
        if (popupConfig.length > 0) {
            // 【核心修改2】强化随机数生成，避免边界值问题
            // 生成 0 到 2（包含）的随机整数，确保覆盖所有3个配置
            const randomIndex = Math.floor(Math.random() * popupConfig.length);
            const randomPopup = popupConfig[randomIndex];
            
            // 【新增】调试日志，确认随机索引和选中的配置（上线可删除）
            console.log('当前随机索引：', randomIndex);
            console.log('选中的弹窗配置：', randomPopup);
            
            // 设置图片源和文字
            popupImg.src = randomPopup.img;
            popupImg.alt = "猫咪弹窗";
            // 【新增】图片加载失败容错
            popupImg.onerror = () => {
                console.error(`图片加载失败：${randomPopup.img}，请检查路径/文件名`);
                // 加载失败时自动切换下一张
                const fallbackIndex = (randomIndex + 1) % popupConfig.length;
                popupImg.src = popupConfig[fallbackIndex].img;
                popupText.textContent = popupConfig[fallbackIndex].text;
            };
            popupText.textContent = randomPopup.text;

            // 延迟 500ms 显示，确保动画流畅
            setTimeout(() => {
                popupOverlay.classList.add('active');
            }, 500);
        }

        // 关闭弹窗函数（仅隐藏，不记录状态）
        function closePopup() {
            popupOverlay.classList.remove('active');
            // 【核心修改3】删除 localStorage 记录，避免关闭后不再显示
            // localStorage.setItem('catPopupClosed', 'true');
        }

        // 绑定关闭按钮点击事件
        popupCloseBtn.addEventListener('click', closePopup);

        // 绑定点击遮罩层关闭事件
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    } else {
        console.error('错误：未找到弹窗相关的 HTML 元素，请检查 index.html 结构。');
    }

    // ================= 轮播图逻辑 =================
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
