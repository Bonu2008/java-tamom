const elEmail = document.querySelector('.input__email')
const elPassword = document.querySelector('.input__password')
const elForm = document.querySelector('.form')

elForm.addEventListener('submit', (evt)=> {

    evt.preventDefault()

    const InputEmail = elEmail.value.trim();
    const InputPassword = elPassword.value.trim();


    fetch('https://reqres.in/api/login', {
        method: 'POST' ,
        headers: {
            'Content-type' : 'application/json'
        },

        body: JSON.stringify({
            email: InputEmail,
            password: InputPassword,
        }),
    }).then((res) => res.json()).then((data) => {
            if(data?.token) {
                window.localStorage.setItem('token', data.token)
                window.location.replace('index.html')
            }
        })
})