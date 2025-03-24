 // Example JSON URL (replace this URL with the actual JSON link)
 const jsonUrl = 'https://sabehakhan.github.io/cuny-events/events.json'; // Replace with your actual JSON URL

 // Fetch the data from the JSON link
 fetch(jsonUrl)
     .then(response => response.json())
     .then(data => {
         const eventContainer = document.getElementById('Eventer');

         // Get the college name from the Eventer div
         const collegeName = eventContainer.textContent.trim();

         // Clear the initial text inside the Eventer div
         eventContainer.innerHTML = '';

         

         // Filter events based on the college name

         const filteredEvents = data.filter((event, index, self) =>
             event.college.toLowerCase().includes(collegeName.toLowerCase()) &&
             index === self.findIndex((t) => t.title === event.title)
             );

         // If there are events matching the college, display them
         if (filteredEvents.length > 0) {
             filteredEvents.forEach(event => {
                 const eventDiv = document.createElement('div');
                 eventDiv.classList.add('evn');

                 // Create and append the event details
                 const eventTitle = document.createElement('h5');
                 eventTitle.textContent = event.title;
                 eventDiv.appendChild(eventTitle);

                 const eventCollege = document.createElement('p');
                 eventCollege.textContent = `College: ${event.college}`;
                 eventDiv.appendChild(eventCollege);

                 const eventDate = document.createElement('p');
                 eventDate.textContent = `Date: ${event.date}`;
                 eventDiv.appendChild(eventDate);

                 const eventTime = document.createElement('p');
                 eventTime.textContent = `Time: ${event.time}`;
                 eventDiv.appendChild(eventTime);

                 const eventLink = document.createElement('a');
                 eventLink.href = event.link;
                 eventLink.target = "_blank";
                 eventLink.textContent = 'More Details';
                 eventDiv.appendChild(eventLink);

                 // Append the new event div to the Eventer container
                 eventContainer.appendChild(eventDiv);
             });
         } else {
             // If no events match, display a message
             const noEventsMessage = document.createElement('p');
             noEventsMessage.textContent = `No events found for ${collegeName}.`;
             eventContainer.appendChild(noEventsMessage);
         }
     })
     .catch(error => {
         console.error('Error fetching the events data:', error);
     });

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

    document.addEventListener('DOMContentLoaded', () => new Slider());