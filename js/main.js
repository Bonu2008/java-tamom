const elButton = document.querySelector('.button')
const token = window.localStorage.getItem('token')

if(!token){
    window.location.replace('login.html')
}

elButton.addEventListener('click', () => {
    window.localStorage.removeItem('token')
    window.location.replace('login.html')
})

const userDock = document.querySelector('.dock1')
const userTemplate = document.getElementById('users').content

function User(array) {
    userDock.innerHTML = null

    array.forEach(element => {
        
        const template = userTemplate.cloneNode(true)

        template.querySelector('.dock1__name').textContent = element.name
        template.querySelector('.username').textContent = element.username
        template.querySelector('.email__link').textContent = element.email
        template.querySelector('.email__link').href = element.email
        template.querySelector('.user__btn').dataset.userId = element.id

        userDock.appendChild(template)
    });
}

async function getuser() {
    const user = await fetch('https://jsonplaceholder.typicode.com/users')
    const userdata = await user.json()

    User(userdata)
}

getuser()

const post = document.querySelector('.user__btn')
const postTemplate = document.getElementById('posts').content
const postdock = document.querySelector('.dock2')

userDock.addEventListener('click', (evt)=> {
     if(evt.target.matches('.user__btn')){
        const userId = evt.target.dataset.userId
         getposts(userId)
     }
})

async function getposts(userId) {
    const post = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    postdock.innerHTML = '';
    post.forEach(evt => {
        const postjon = postTemplate.cloneNode(true)

        postjon.querySelector('.dock2__name').textContent = evt.title
        postjon.querySelector('.text__body').textContent = evt.body
        postjon.querySelector('.post__btn').dataset.postId = evt.id

        postdock.appendChild(postjon)
    })
}

getposts()

const dock3 = document.querySelector('.dock3')
const commentTemplate = document.getElementById('comments').content

postdock.addEventListener('click', (evt) => {
    if(evt.target.matches('.post__btn')){
        const postId = evt.target.dataset.postId
        getcomments(postId)
    }
})

async function getcomments(postId) {
    const comment = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    dock3.innerHTML = '';

    comment.forEach(evt => {
       const template = commentTemplate.cloneNode(true)

       template.querySelector('.dock3__name').textContent = evt.name
       template.querySelector('.email__link').textContent = evt.email
       template.querySelector('.body__text').textContent = evt.body

       dock3.appendChild(template)
    })
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}