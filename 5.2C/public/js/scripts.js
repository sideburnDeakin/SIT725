$(document).ready(function () {
  $('.modal').modal();

  let allVisible = false; // Toggle state

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
        showLatestSubmission(response.data); // Show latest immediately
        $('#userForm')[0].reset();
        $('#infoModal').modal('close');
      } else {
        alert("Submission failed.");
      }
    });
  });

  // Load and display all submissions
  function loadAllSubmissions() {
    $.get('/submissions', function (data) {
      $('#all-content').empty();
      data.forEach(item => {
        const card = generateCard(item);
        $('#all-content').append(card);
      });
    });
  }

  // Show latest submission separately
  function showLatestSubmission(data) {
    const card = generateCard(data);
    $('#latest-content').html(card);
    $('#latest-submission').removeClass('hidden');
  }

  // Card HTML generator
  function generateCard(item) {
    return `
      <div class="card teal lighten-4">
        <div class="card-content">
          <span class="card-title">${item.name}</span>
          <p><strong>Interest:</strong> ${item.interest}</p>
          <p><strong>Experience:</strong> ${item.experience}</p>
          ${item.email ? `<p><strong>Email:</strong> ${item.email}</p>` : ''}
        </div>
      </div>
    `;
  }

  // Toggle button logic
  $('#toggle-users-btn').click(function () {
    allVisible = !allVisible;
    if (allVisible) {
      loadAllSubmissions();
      $('#all-submissions').removeClass('hidden');
      $(this).text('Hide All Users Info');
    } else {
      $('#all-submissions').addClass('hidden');
      $(this).text('Show All Users Info');
    }
  });
});
