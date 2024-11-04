function saveAmount(value, event) {
  event.preventDefault(); // Prevent the default link behavior
  localStorage.setItem('selectedAmount', value);
  window.location.href = event.target.href; // Navigate to the cafes page
}