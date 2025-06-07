$(document).ready(function () {
  $('.modal').modal();
  const socket = io();

  let allVisible = false;

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
        console.log("response.data", response.data);
        showLatestSubmission(response.data);
        $('#userForm')[0].reset();
        $('#infoModal').modal('close');
      } else {
        alert("Submission failed.");
      }
    });
  });

  function loadAllSubmissions() {
    $.get('/submissions', function (data) {
      $('#all-content').empty();
      data.forEach(item => {
        const card = generateCardFromTemplate(item);
        $('#all-content').append(card);
      });
    });
  }

  function showLatestSubmission(data) {
    const card = generateCardFromTemplate(data);
    $('#latest-content').html(card);
    $('#latest-submission').removeClass('hidden');
  }

  function generateCardFromTemplate(item) {
    const template = $('#user-card-template').contents().clone();

    template.find('.name').text(item.name);
    template.find('.interest').text(item.interest);
    template.find('.experience').text(item.experience);
    if (item.email) {
      template.find('.email').text(item.email);
    } else {
      template.find('.email-line').remove();
    }

    return template;
  }

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

  socket.on("new-user", function (data) {
    const toastHTML = `🟢 New user joined: <strong>${data.name}</strong> - ${data.interest}`;
  
    M.toast({
      html: toastHTML,
      displayLength: 4000,
      classes: "rounded green lighten-1 white-text",
    });
  });
});
