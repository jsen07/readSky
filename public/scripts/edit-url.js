function b () {
    const location = window.location.href;
    const f = document.getElementById('user-profile-link').getAttribute('href');
    const b = document.getElementById('user-profile-link').getAttribute('value');

    document.getElementById('user-profile-link').setAttribute('href', '/api/profile/'+b);
}

b();