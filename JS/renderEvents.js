function renderEvents(containerId, count = eventsData.length, filterNextDays = 0, filterMonth = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let eventsToRender = eventsData;

  // Filter events by next N days if specified
  if (filterNextDays > 0) {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + filterNextDays);

    eventsToRender = eventsData.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= maxDate;
    });
  }

  // Filter events by specific month if specified (0-11)
  if (filterMonth !== null) {
    eventsToRender = eventsToRender.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === filterMonth;
    });
  }

  const maxCount = Math.min(count, eventsToRender.length);

  let html = "";

  if (maxCount === 0) {
    // Show fallback message if no events found
    html = `<div class="col-12 text-center text-white py-5">
              <h4>No events scheduled for this month.</h4>
            </div>`;
  } else {
    eventsToRender.slice(0, maxCount).forEach(event => {
      const [year, month, day] = event.date.split("-");
      const monthStr = new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase();

      html += `
        <div class="col-md-6 col-sm-12 mb-4">
          <div class="event-card d-flex flex-column bg-dark rounded shadow">
            <div class="d-flex">
              <div class="date-box text-center text-white px-3 py-4 bg-black d-flex flex-column justify-content-center">
                <div class="fw-bold">${event.day}</div>
                <div class="fw-bold">${monthStr}</div>
                <div class="fs-2 fw-bold">${day}</div>
                <div class="small mt-1">${event.time}</div>
              </div>
              <div class="event-image-wrapper position-relative w-100">
                <img src="${event.image}" class="img-fluid w-100 h-100 object-fit-cover" alt="${event.artist}">
                <div class="event-overlay d-flex flex-column justify-content-center align-items-center text-white">
                  <!-- Overlay can be used for buttons or info -->
                </div>
              </div>
            </div>
            <div class="text-center py-3">
              <a href="${event.tickets}" class="btn btn-main fw-bold px-4 py-2" target="_blank">GET TICKETS</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}
