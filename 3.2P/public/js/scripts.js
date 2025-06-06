$(document).ready(function () {
  $('.modal').modal();

  $('#userForm').submit(function (e) {
    e.preventDefault();

    const name = $('#name').val();
    const interest = $('#interest').val();
    const experience = $('#experience').val();
    const email = $('#email').val(); // new

    // Log to browser console
    console.log("Form Submission:");
    console.log("Name:", name);
    console.log("Interest:", interest);
    console.log("Experience:", experience);
    if (email) console.log("Email:", email);

    // Create and append a dynamic card
    const dynamicCard = `
      <div class="card teal lighten-4">
        <div class="card-content">
          <span class="card-title">${name}</span>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        </div>
      </div>
    `;

    $('#dynamic-cards').append(dynamicCard);
    $('#userForm')[0].reset();
    $('#infoModal').modal('close');
  });
});
