document.addEventListener('DOMContentLoaded', function () {
    var delBtn = document.querySelectorAll('.admin-del-course')
    var addBtn = document.querySelector('.admin-add-course')
    let checkIsAdminLogin = localStorage.getItem('IsAdmin')
    let checkIsLogin = localStorage.getItem('IsLogin')

    if (checkIsAdminLogin == 'false' || checkIsLogin == 'false') {
        delBtn.forEach(e => {
            e.style.display = 'none';
        })
        addBtn.style.display = 'none';
    }
    else {
        delBtn.forEach(e => {
            e.style.display = 'inline';
        })
        addBtn.style.display = 'inline';
        
    }

    // Mapping user and course
    let currentUser = localStorage.getItem('currentUser')
    let vals = JSON.parse(localStorage.getItem('userCourses'));
    let courses = JSON.parse(localStorage.getItem('courses'));
    vals = vals.filter(i => i.username == currentUser)

    let userCourse = []
    for (let i = 0; i < vals.length; i++) {
        for (let j = 0; j < courses.length; j++) {
            if (vals[i].courseid == courses[j].title) {
                userCourse.push(courses[j])
            }
        }
    }

    // Code for display enrolled courses
    var htmlString = ''
    userCourse.forEach(e => {
        htmlString +=
            `   <div div class="course-card-holder">
                    <img class="course-card-img" src="assets/img/default.jpg" alt="default">
                    <div class="course-detail">
                        <h2 class="course-card-title">${e.title}</h2>
                        <p class="course-card-description">${e.description}</p>
                        <button class="remove-course" type="button" value="${e.title}">Remove</button>
                    </div>
                </div>
            `
    })

    if (document.querySelector('#your-available-courses')) {
        document.querySelector('#your-available-courses').insertAdjacentHTML('beforeend', htmlString)
    }

    // Code for delete course
    document.querySelectorAll('.remove-course').forEach(e => {
        e.addEventListener('click', function(){
            let vals = JSON.parse(localStorage.getItem('userCourses'));
            vals = vals.filter(i => i.courseid != e.value)
            localStorage.setItem('userCourses', JSON.stringify(vals))
            alert('Remove course successfully!')
            location.reload()
        })
    })

})