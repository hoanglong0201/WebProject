document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.course-lecture').forEach(e => {
        e.addEventListener('click', function (event) {
            event.preventDefault()

            document.querySelector('#course-display').src = e.href
            document.querySelector('#course-title').innerHTML = e.title
            document.querySelector('#course-display').title = e.id

            document.querySelector('#course-view-main').style.display = 'inline-block'
            document.querySelector('#course-view-quiz').style.display = 'none'
        })

    })

    document.querySelector('.course-view-action-next').addEventListener('click', function(){
        let index = Number(document.querySelector('#course-display').title)
        if(index < 9){
            index += 1
            document.querySelector('#course-display').src = document.querySelector(`.course-lecture[id="${index}"]`).href
            document.querySelector('#course-title').innerHTML = document.querySelector(`.course-lecture[id="${index}"]`).title
            document.querySelector('#course-display').title = index

            document.querySelector('#course-view-main').style.display = 'inline-block'
            document.querySelector('#course-view-quiz').style.display = 'none'
        }
    })

    document.querySelector('.course-view-action-previous').addEventListener('click', function(){
        let index = Number(document.querySelector('#course-display').title)
        if(index > 0){
            index -= 1
            document.querySelector('#course-display').src = document.querySelector(`.course-lecture[id="${index}"]`).href
            document.querySelector('#course-title').innerHTML = document.querySelector(`.course-lecture[id="${index}"]`).title
            document.querySelector('#course-display').title = index

            document.querySelector('#course-view-main').style.display = 'inline-block'
            document.querySelector('#course-view-quiz').style.display = 'none'
        }
    })

    document.querySelector('#quiz-start').addEventListener('click', function(e){
        e.preventDefault()
        document.querySelector('#course-title').innerHTML = 'Review Quiz'
        document.querySelector('#course-view-main').style.display = 'none'
        document.querySelector('#course-view-quiz').style.display = 'inline-block'

    })
})
