document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.admin-add-course')) {
        document.querySelector('.admin-add-course').addEventListener('click', function () {
            window.location.href = 'addcourse.html'
        })

    }

    if (document.querySelector('#form-course') != null) {

        document.querySelector('#form-course').addEventListener('submit', function (e) {
            e.preventDefault();

            let courseTitle = document.querySelector('#course-title').value
            let courseDescription = document.querySelector('#course-description').value

            let course = {
                title: courseTitle,
                description: courseDescription,
            }

            if (localStorage.getItem('courses') != null) {
                let vals = JSON.parse(localStorage.getItem('courses'));
                if (vals.find(e => e.title === courseTitle)) {
                    alert('Course already exists! PLease enter valid course')
                    return;
                }

                vals.push(course)
                localStorage.setItem('courses', JSON.stringify(vals))
            }
            else {
                let courses = []
                courses.push(course)
                localStorage.setItem('courses', JSON.stringify(courses))
            }

            // Update course created
            let courseCount = Number(localStorage.getItem('courseNumber'))
            courseCount += 1
            localStorage.setItem('courseNumber', courseCount)

            alert('New course has been added')
            window.location.href = "courses.html";
        })
    }


    // Delete course
    if (document.querySelectorAll('.admin-del-course')) {
        document.querySelectorAll('.admin-del-course').forEach(e => {
            e.addEventListener('click', function () {
                let vals = JSON.parse(localStorage.getItem('courses'));
                vals = vals.filter(i => i.title != e.value)

                let userCourses = JSON.parse(localStorage.getItem('userCourses'));
                userCourses = userCourses.filter(i => i.courseid != e.value)
                localStorage.setItem('userCourses', JSON.stringify(userCourses))

                localStorage.setItem('courses', JSON.stringify(vals))
                localStorage.setItem('userCourses', JSON.stringify(userCourses))

                // Update course created
                let courseCount = Number(localStorage.getItem('courseNumber'))
                courseCount -= 1
                localStorage.setItem('courseNumber', courseCount)

                alert('Delete course successfully!')
                location.reload();
            })
        })
    }

})