class Slider {
    constructor() {
        this.wrapper = document.getElementById('Eventer');
        this.leftBtn = document.getElementById('leftButton');
        this.rightBtn = document.getElementById('rightButton');
        this.items = [];
        this.itemWidth = 0;
        this.containerWidth = 0;
        this.maxScroll = 0;
        this.position = 0;
        this.isDragging = false;

        if (this.wrapper && this.leftBtn && this.rightBtn) {
            this.init();
        }
    }

    init() {
        this.updateItems();
        this.setupEvents();
        this.setupObserver();
        this.updateButtons();
        if (this.items.length > 0) {
            this.animate();
        }
    }

    updateItems() {
        this.items = this.wrapper.querySelectorAll('.evn');
        this.itemWidth = this.items.length > 0 ? this.items[0].offsetWidth + 10 : 0;
        this.containerWidth = this.wrapper.parentElement.offsetWidth;
        this.maxScroll = this.items.length > 0 ? (this.itemWidth * this.items.length - this.containerWidth) : 0;
        // Reset position if it exceeds new maxScroll
        this.position = Math.min(this.position, this.maxScroll);
        this.updatePosition();
        this.updateButtons();
    }

    setupObserver() {
        const observer = new MutationObserver(() => {
            this.updateItems();
        });
        
        observer.observe(this.wrapper, {
            childList: true,
            subtree: true
        });
    }

    setupEvents() {
        let startX, scrollStart;

        this.wrapper.addEventListener('mousedown', (e) => {
            if (this.items.length === 0) return;
            this.isDragging = true;
            startX = e.pageX;
            scrollStart = this.position;
            this.wrapper.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || this.items.length === 0) return;
            e.preventDefault();
            const delta = (startX - e.pageX) * 1.0;
            this.position = Math.min(Math.max(0, scrollStart + delta), this.maxScroll);
            this.updatePosition();
        });

        document.addEventListener('mouseup', () => {
            if (!this.isDragging || this.items.length === 0) return;
            this.isDragging = false;
            this.wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            this.updateButtons();
        });

        document.addEventListener('mouseleave', () => {
            if (!this.isDragging || this.items.length === 0) return;
            this.isDragging = false;
            this.wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            this.updateButtons();
        });

        this.leftBtn.addEventListener('click', () => {
            if (this.items.length > 0) this.slide(-310);
        });
        this.rightBtn.addEventListener('click', () => {
            if (this.items.length > 0) this.slide(310);
        });
    }

    slide(amount) {
        this.position = Math.min(Math.max(0, this.position + amount), this.maxScroll);
        this.updatePosition();
        this.updateButtons();
    }

    updatePosition() {
        if (this.items.length > 0) {
            this.wrapper.style.transform = `translateX(-${this.position}px)`;
        } else {
            this.wrapper.style.transform = 'translateX(0px)';
        }
    }

    animate() {
        if (!this.isDragging && this.items.length > 0) {
            this.updatePosition();
        }
        requestAnimationFrame(() => this.animate());
    }

    updateButtons() {
        this.rightBtn.disabled = this.items.length === 0 || this.position >= this.maxScroll;
        this.leftBtn.disabled = this.items.length === 0 || this.position <= 0;
    }
}

// reactionScript.js
window.addEventListener('customSignal', function (e) {
    console.log('Received Signal:', e.detail);
    // React to the signal (e.g., do something with e.detail)
     new Slider();
  });