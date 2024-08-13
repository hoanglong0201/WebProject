document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#accCount').innerHTML = localStorage.getItem('accountNumber')
    document.querySelector('#courseCount').innerHTML = localStorage.getItem('courseNumber')
})