const displayController = (function() {


  function initEventListeners() {
    const body = document.body;
    body.addEventListener('click', processClicks);

  }

  function processClicks(event) {
    console.log(event.target);
    
  }

  document.addEventListener('DOMContentLoaded', initEventListeners);
  
})();

const display = displayController;