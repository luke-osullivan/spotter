$(document).ready(function () {

  $("#signup-form").on("submit", function (e) {
    e.preventDefault();

    const userInfo = {
      first_name: $("#first-name-input").val().trim(),
      last_name: $("#last-name-input").val().trim(),
      age: $("#age-input").val(),
      where_from: $("#where-from-input").val().trim(),
      bio: $("#bio-input").val().trim(),
      picture: $("#picture-input").val(),
      email: $("#email-input").val().trim(),
      password: $("#password-input").val().trim()
    };

    $.ajax({
      url: '/api/users',
      method: 'POST',
      data: userInfo
    })
      .then((userInfo) => {
        console.log(userInfo);
        location.replace(userInfo)
      })
      .catch(err => console.log(err));
  });

});