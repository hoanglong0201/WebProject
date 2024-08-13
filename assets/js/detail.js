document.addEventListener('DOMContentLoaded', function () {
    let checkIsLogin = localStorage.getItem('IsLogin')

    if(document.querySelector('.course-action-preview')){
        if (checkIsLogin == 'true'){
            document.querySelector('.course-action-preview').style.display = 'block'
            document.querySelector('.course-action-add').style.display = 'none'
        }
        else{
            document.querySelector('.course-action-preview').style.display = 'none'
        }
    
        document.querySelector('.course-action-preview').addEventListener('click', function(){
            window.location.href = 'JSView.html'
            return
        })
    }

    document.querySelector('.course-action-add').addEventListener('click', function(){
        if (checkIsLogin == 'false'){
            alert('Please login to enroll this course!')
            window.location.href = 'login.html'
            return
        }

        alert('This course is only for demo! Please access JS Course for more information!')
        window.location.href = 'courses.html'
        return
    })
})