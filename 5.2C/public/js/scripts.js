$(document).ready(function () {
  $('.modal').modal();

  // Submit form data to backend
  $('#userForm').submit(function (e) {
    e.preventDefault();

    const formData = {
      name: $('#name').val(),
      interest: $('#interest').val(),
      experience: $('#experience').val(),
      email: $('#email').val()
    };

    $.post('/submit', formData, function (response) {
      if (response.success) {
        loadSubmissions(); // Reload after submission
        $('#userForm')[0].reset();
        $('#infoModal').modal('close');
      } else {
        alert("Submission failed.");
      }
    });
  });

  // Load submissions on page load
  function loadSubmissions() {
    $.get('/submissions', function (data) {
      $('#dynamic-cards').empty();
      data.forEach(item => {
        const dynamicCard = `
          <div class="card teal lighten-4">
            <div class="card-content">
              <span class="card-title">${item.name}</span>
              <p><strong>Interest:</strong> ${item.interest}</p>
              <p><strong>Experience:</strong> ${item.experience}</p>
              ${item.email ? `<p><strong>Email:</strong> ${item.email}</p>` : ''}
            </div>
          </div>
        `;
        $('#dynamic-cards').append(dynamicCard);
      });
    });
  }

  // Initial load
  loadSubmissions();
});
