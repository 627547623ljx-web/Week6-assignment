// 等待页面所有元素加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // ================= 弹窗逻辑（逐张切换） =================
    const popupConfig = [
        { img: "弹窗图1.jpg", text: "Hi！看看我性感的大PP😺 " },
        { img: "弹窗图2.jpg", text: "是我～🧡我的睡姿优美吗" },
        { img: "弹窗图3.jpg", text: "还是我～💙 你把我吵醒了！" }
    ];

    const popupOverlay = document.getElementById('popupOverlay');
    const popupImg = document.getElementById('popupImg');
    const popupText = document.getElementById('popupText');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    let currentPopupIndex = 0;

    // 初始化弹窗
    const initPopup = () => {
        const currentPopup = popupConfig[currentPopupIndex];
        popupImg.src = currentPopup.img;
        popupImg.alt = "猫咪弹窗";
        
        // 图片加载失败容错
        popupImg.onerror = () => {
            console.error(`图片加载失败：${currentPopup.img}`);
            const fallbackIndex = (currentPopupIndex + 1) % popupConfig.length;
            popupImg.src = popupConfig[fallbackIndex].img;
            popupText.textContent = popupConfig[fallbackIndex].text;
        };

        popupText.textContent = currentPopup.text;
        setTimeout(() => {
            popupOverlay.classList.add('active');
        }, 500);
    };

    // 关闭/切换弹窗
    const closeOrSwitchPopup = () => {
        popupOverlay.classList.remove('active');
        
        setTimeout(() => {
            currentPopupIndex++;
            if (currentPopupIndex < popupConfig.length) {
                initPopup(); // 切换下一张
            } else {
                currentPopupIndex = 0; // 重置索引，刷新后重新开始
            }
        }, 300);
    };

    // 绑定弹窗事件
    if (popupOverlay && popupImg && popupText && popupCloseBtn) {
        initPopup();
        popupCloseBtn.addEventListener('click', closeOrSwitchPopup);
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) closeOrSwitchPopup();
        });
    } else {
        console.error('弹窗元素未找到，请检查ID');
    }

    // ================= 轮播图逻辑（自动+手动） =================
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoPlayTimer;
    const slideTime = 3000; // 自动轮播间隔

    if (track && prevBtn && nextBtn) {
        const items = Array.from(track.children);
        const totalItems = items.length;

        // 获取可视数量
        const getVisibleItems = () => {
            return window.innerWidth <= 768 ? 1 : 3;
        };

        // 更新轮播位置
        const updateCarousel = () => {
            const visibleItems = getVisibleItems();
            if (items.length === 0) return;
            
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = window.innerWidth <= 768 ? 8 : 16;
            
            const maxIndex = totalItems - visibleItems;
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
            
            const moveDistance = currentIndex * (itemWidth + gap);
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // 下一张
        const nextSlide = () => {
            currentIndex++;
            updateCarousel();
        };

        // 上一张
        const prevSlide = () => {
            currentIndex--;
            updateCarousel();
        };

        // 自动轮播
        const startAutoPlay = () => {
            autoPlayTimer = setInterval(nextSlide, slideTime);
        };

        // 暂停自动轮播
        const stopAutoPlay = () => {
            clearInterval(autoPlayTimer);
        };

        // 绑定事件
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        track.parentElement.addEventListener('mouseenter', stopAutoPlay);
        track.parentElement.addEventListener('mouseleave', startAutoPlay);

        // 窗口大小变化重置
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });

        // 初始化
        updateCarousel();
        startAutoPlay();
    }
});
