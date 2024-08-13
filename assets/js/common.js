document.addEventListener('DOMContentLoaded', function () {    
    let accountNumber = localStorage.getItem('accountNumber')
    if (accountNumber == null){
        accountNumber = 1
        localStorage.setItem('accountNumber', accountNumber)
        localStorage.setItem('courseNumber', 3)
    }

    let isLogin = localStorage.getItem('IsLogin')
    if (isLogin == 'true') {
        document.querySelector('#signin').style.display = 'none'
        if (document.querySelector('#available-courses') != null) {

            document.querySelector('#available-courses').style.display = 'block'
        }

    }
    else {
        document.querySelector('#signout').style.display = 'none'
        if (document.querySelector('#available-courses') != null) {

            document.querySelector('#available-courses').style.display = 'none'
        }
    }


    // Code for explore course
    const JSSCourse = document.querySelectorAll('.explore-JSS-course')
    const HTMLCourse = document.querySelectorAll('.explore-HTML-course')
    const CSSCourse = document.querySelectorAll('.explore-CSS-course')
    const createAcc = document.querySelector('#create-account')


    JSSCourse.forEach(e => {
        e.addEventListener('click', function () {
            window.location.href = 'JSDetail.html'
        })
    })

    HTMLCourse.forEach(e => {

        e.addEventListener('click', function () {
            window.location.href = 'HTMLDetail.html'
        })
    })


    CSSCourse.forEach(e => {

        e.addEventListener('click', function () {
            window.location.href = 'CSSDetail.html'
        })
    })

    if (createAcc) {
        createAcc.addEventListener('click', function () {
            if (isLogin == 'true') {
                alert('You\'ve already login! Please sign out and create a new one')
                window.location.href = "courses.html";
            }
            else {
                window.location.href = "login.html";
            }
        })
    }


    // Code for display added courses
    if(localStorage.getItem('courses')){

        let courses = JSON.parse(localStorage.getItem('courses'));
        var htmlString = ''
        courses.forEach(e => {
            htmlString +=
                `   <div div class="course-card-holder">
                        <img class="course-card-img" src="assets/img/default.jpg" alt="default">
                        <div class="course-detail">
                            <h2 class="course-card-title">${e.title}</h2>
                            <p class="course-card-description">${e.description}</p>
                            <button class="admin-del-course" type="button" value="${e.title}">Delete</button>
                            <button class="add-course" type="button" value="${e.title}">Enroll</button>
                        </div>
                    </div>
                `
        })
    
        if (document.querySelector('#courses-db')) {
            document.querySelector('#courses-db').insertAdjacentHTML('beforeend', htmlString)
        }
    }

    // Code for display delete & add btn course for admin
    const delBtn = document.querySelectorAll('.admin-del-course')
    const addBtn = document.querySelectorAll('.admin-add-course')
    const reportBtn = document.querySelector('#report')
    let checkIsAdminLogin = localStorage.getItem('IsAdmin')
    let checkIsLogin = localStorage.getItem('IsLogin')

    // Check
    if (checkIsAdminLogin == 'false' || checkIsLogin == 'false') {
        delBtn.forEach(e => {
            e.style.display = 'none';
        })
        addBtn.forEach(e => {
            e.style.display = 'none';
        })
        reportBtn.style.display = 'none'
    }
    else {
        delBtn.forEach(e => {
            e.style.display = 'inline';
        })
        addBtn.forEach(e => {
            e.style.display = 'inline';
        })
        reportBtn.style.display = 'inline'
    }


    // Add course to user
    const enrollBtn = document.querySelectorAll('.add-course')
    enrollBtn.forEach(e =>{
        e.addEventListener('click', function(){

            if (isLogin == 'false'){
                alert('Please login to enroll this course!')
                window.location.href = 'login.html'
                return
            }
            let currentUser = localStorage.getItem('currentUser')
            let courseTitle = e.value

            let userCourse = {
                username : currentUser,
                courseid : courseTitle
            }

            // Mapping user with courses
            if (localStorage.getItem('userCourses') != null) {
                let vals = JSON.parse(localStorage.getItem('userCourses'));
                if (vals.find(e => e.courseid === courseTitle && e.username === currentUser)) {
                    alert('You\'ve already enroll this course!')
                    return;
                }

                vals.push(userCourse)
                localStorage.setItem('userCourses', JSON.stringify(vals))
                alert('Enroll successfully!')
            }
            else {
                let userCourses = []
                userCourses.push(userCourse)
                localStorage.setItem('userCourses', JSON.stringify(userCourses))
                alert('Enroll successfully!')
            }
            window.location.href = 'courses.html'
        })
    })
})

function dangxuat() {
    window.location.href = "index.html";
    localStorage.setItem('IsLogin', 'false')
    localStorage.removeItem('currentUser')
}

function dangnhap() {
    window.location.href = "login.html";
}