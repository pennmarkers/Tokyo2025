// 탭 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // 탭 클릭 이벤트 처리
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // 모든 탭에서 active 클래스 제거
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 클릭한 탭에 active 클래스 추가
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // 페이지 상단으로 부드럽게 스크롤
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 카드 호버 효과 개선
    const cards = document.querySelectorAll('.attraction-card, .restaurant-card, .highlight-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 예산 계산기 기능
    initBudgetCalculator();

    // 체크리스트 인터랙션
    initChecklist();

    // 이미지 레이지 로딩
    initLazyLoading();

    // 팁 섹션 애니메이션
    initTipAnimations();
});

// 예산 계산기 초기화
function initBudgetCalculator() {
    const budgetItems = document.querySelectorAll('.budget-item');
    
    budgetItems.forEach(item => {
        item.addEventListener('click', function() {
            // 클릭 시 하이라이트 효과
            this.style.backgroundColor = 'var(--color-bg-1)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });

    // 총합 계산 애니메이션
    const totalAmount = document.querySelector('.total-amount');
    if (totalAmount) {
        // 숫자 카운트업 애니메이션
        animateCounter(totalAmount, '200,000 - 400,000엔');
    }
}

// 체크리스트 인터랙션 초기화
function initChecklist() {
    const checklistItems = document.querySelectorAll('.checklist li');
    
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.opacity = this.style.opacity === '0.6' ? '1' : '0.6';
            this.style.textDecoration = this.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            
            // 체크 아이콘 변경
            const checkIcon = this.querySelector('::before');
            if (this.style.opacity === '0.6') {
                this.setAttribute('data-checked', 'true');
            } else {
                this.removeAttribute('data-checked');
            }
        });

        // 호버 효과
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--color-bg-1)';
            this.style.padding = '8px';
            this.style.borderRadius = 'var(--radius-sm)';
            this.style.cursor = 'pointer';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.padding = '6px 0';
            this.style.borderRadius = '';
        });
    });
}

// 레이지 로딩 초기화
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 팁 섹션 애니메이션 초기화
function initTipAnimations() {
    const tipItems = document.querySelectorAll('.tip-item');
    
    const tipObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    tipItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        tipObserver.observe(item);
    });
}

// 숫자 카운트업 애니메이션
function animateCounter(element, finalText) {
    let start = 0;
    const duration = 2000;
    const increment = duration / 60;

    function updateCounter() {
        start += increment;
        if (start < duration) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalText;
        }
    }

    updateCounter();
}

// 교통패스 카드 비교 기능
document.addEventListener('DOMContentLoaded', function() {
    const transportCards = document.querySelectorAll('.transport-card');
    
    transportCards.forEach(card => {
        card.addEventListener('click', function() {
            // 모든 카드에서 선택 상태 제거
            transportCards.forEach(c => {
                c.classList.remove('selected');
                c.style.transform = 'scale(1)';
            });
            
            // 클릭한 카드 선택
            this.classList.add('selected');
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease-out';
            
            // 선택된 카드 정보 표시
            showTransportInfo(this);
        });
    });
});

// 교통패스 정보 표시
function showTransportInfo(card) {
    const cardTitle = card.querySelector('h4').textContent;
    const cardPrice = card.querySelector('.price').textContent;
    
    // 임시 알림 (실제로는 더 세련된 UI 구현 가능)
    const notification = document.createElement('div');
    notification.className = 'transport-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: var(--color-surface);
            padding: 12px 16px;
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            font-size: var(--font-size-sm);
            max-width: 300px;
        ">
            <strong>${cardTitle}</strong> 선택됨<br>
            <small>${cardPrice}</small>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 알림 제거
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// 음식점 카드 특별 효과
document.addEventListener('DOMContentLoaded', function() {
    const specialRestaurant = document.querySelector('.special-restaurant');
    
    if (specialRestaurant) {
        // 포켓몬 카페에 특별 효과
        setInterval(() => {
            specialRestaurant.style.boxShadow = 'var(--shadow-lg)';
            setTimeout(() => {
                specialRestaurant.style.boxShadow = 'var(--shadow-sm)';
            }, 1000);
        }, 3000);
    }
});

// 일정표 하이라이트 데이 특별 효과
document.addEventListener('DOMContentLoaded', function() {
    const highlightDay = document.querySelector('.highlight-day');
    
    if (highlightDay) {
        // 디즈니랜드 데이에 특별 애니메이션
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'pulse 2s infinite';
                } else {
                    entry.target.style.animation = '';
                }
            });
        });
        
        observer.observe(highlightDay);
    }
});

// CSS 애니메이션 추가 (동적으로)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 33, 128, 141), 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(var(--color-primary-rgb, 33, 128, 141), 0); }
        100% { box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 33, 128, 141), 0); }
    }
    
    .transport-card.selected {
        border-color: var(--color-success) !important;
        background: var(--color-bg-3) !important;
    }
    
    .checklist li[data-checked="true"]::before {
        content: "✅";
    }
    
    .nav-tab {
        position: relative;
        overflow: hidden;
    }
    
    .nav-tab::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .nav-tab:hover::before {
        left: 100%;
    }
    
    .attraction-card, .restaurant-card {
        position: relative;
        overflow: hidden;
    }
    
    .attraction-card::after, .restaurant-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(var(--color-primary-rgb, 33, 128, 141), 0.1) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s;
    }
    
    .attraction-card:hover::after, .restaurant-card:hover::after {
        transform: translateX(100%);
    }
`;
document.head.appendChild(style);

// 스크롤 시 네비게이션 고정 효과
window.addEventListener('scroll', function() {
    const navTabs = document.querySelector('.nav-tabs');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navTabs.style.boxShadow = 'var(--shadow-md)';
        navTabs.style.backdropFilter = 'blur(10px)';
    } else {
        navTabs.style.boxShadow = '';
        navTabs.style.backdropFilter = '';
    }
});

// 페이지 로드 완료 시 환영 효과
window.addEventListener('load', function() {
    const header = document.querySelector('.header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
    
    // 환영 메시지
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-primary);
                color: var(--color-btn-primary-text);
                padding: 20px 30px;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 1001;
                text-align: center;
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-medium);
            ">
                🎉 도쿄 가족여행 가이드에 오신 것을 환영합니다!<br>
                <small style="font-size: var(--font-size-sm); opacity: 0.9;">
                    즐거운 여행 계획 세우세요 🗼
                </small>
            </div>
        `;
        
        document.body.appendChild(welcomeMsg);
        
        // 3초 후 환영 메시지 제거
        setTimeout(() => {
            welcomeMsg.style.opacity = '0';
            welcomeMsg.style.transform = 'translate(-50%, -50%) scale(0.8)';
            welcomeMsg.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            setTimeout(() => {
                if (welcomeMsg.parentNode) {
                    welcomeMsg.parentNode.removeChild(welcomeMsg);
                }
            }, 500);
        }, 3000);
    }, 1500);
});

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.nav-tab.active');
    const tabs = Array.from(document.querySelectorAll('.nav-tab'));
    const currentIndex = tabs.indexOf(activeTab);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        let newIndex;
        if (e.key === 'ArrowRight') {
            newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        }
        
        tabs[newIndex].click();
        tabs[newIndex].focus();
    }
});

// 접근성 개선
document.addEventListener('DOMContentLoaded', function() {
    // 탭에 키보드 네비게이션 속성 추가
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    // 탭 컨텐츠에 역할 속성 추가
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
    });
});