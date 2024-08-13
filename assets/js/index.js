document.addEventListener('DOMContentLoaded', function(){
    let isLogin = localStorage.getItem('IsLogin')
    document.querySelector('#join').addEventListener('click', function () {
        if (isLogin == 'true') {
            window.location.href = "courses.html";
        }
        else {
            window.location.href = "login.html";
        }
    })
})