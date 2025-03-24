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