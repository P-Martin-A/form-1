const EXPRESSIONS = {
    names:    /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    surnames: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/,
    email:    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone:    /^\d{7,14}$/  
},
    fields = {
        names:    false,
        surnames: false,
        password: false,
        email:    false,
        phone:    false
    },
    $FORM   = document.getElementById('form'),
    $INPUTS = document.querySelectorAll('#form input')

// Function
const formValidation = e =>{
    switch(e.target.name){
        case 'names':
            fieldValidation(EXPRESSIONS.names, e.target, 'names')
        break
        case 'surnames':
            fieldValidation(EXPRESSIONS.surnames, e.target, 'surnames')            
        break
        case 'password':
            fieldValidation(EXPRESSIONS.password, e.target, 'password')            
            passwordValidation()
        break
        case 'repeat-password':
            passwordValidation()
        break
        case 'email':
            fieldValidation(EXPRESSIONS.email, e.target, 'email')
        break
        case 'phone':
            fieldValidation(EXPRESSIONS.phone, e.target, 'phone')
        break
    }
}

const fieldValidation = (expression, input, field)=>{
    if(expression.test(input.value)){
        document.getElementById(`group-${field}`).classList.remove('form-group-incorrect')
        document.getElementById(`group-${field}`).classList.add('form-group-correct')
        document.querySelector(`#group-${field} i`).classList.remove('bxs-x-circle')
        document.querySelector(`#group-${field} i`).classList.add('bxs-check-circle')
        document.querySelector(`#group-${field} .form-input-error`).classList.remove('active')
        fields[field] = true
    }else{
        document.getElementById(`group-${field}`).classList.add('form-group-incorrect')
        document.getElementById(`group-${field}`).classList.remove('form-group-correct')
        document.querySelector(`#group-${field} i`).classList.add('bxs-x-circle')
        document.querySelector(`#group-${field} i`).classList.remove('bxs-check-circle')
        document.querySelector(`#group-${field} .form-input-error`).classList.add('active')
    }
}

const passwordValidation = ()=>{
    const $PASSWORD        = document.getElementById('password'),
          $REPEAT_PASSWORD = document.getElementById('repeat-password')

    if($PASSWORD.value !== $REPEAT_PASSWORD.value){
        document.getElementById(`group-repeat-password`).classList.add('form-group-incorrect')
        document.getElementById(`group-repeat-password`).classList.remove('form-group-correct')
        document.querySelector(`#group-repeat-password i`).classList.add('bxs-x-circle')
        document.querySelector(`#group-repeat-password i`).classList.remove('bxs-check-circle')
        document.querySelector(`#group-repeat-password .form-input-error`).classList.add('active')
        fields['password'] = false
    }else{
        document.getElementById(`group-repeat-password`).classList.remove('form-group-incorrect')
        document.getElementById(`group-repeat-password`).classList.add('form-group-correct')
        document.querySelector(`#group-repeat-password i`).classList.remove('bxs-x-circle')
        document.querySelector(`#group-repeat-password i`).classList.add('bxs-check-circle')
        document.querySelector(`#group-repeat-password .form-input-error`).classList.remove('active')
        fields['password'] = true
    }
}

$INPUTS.forEach(input =>{
    input.addEventListener('keyup', formValidation)
    input.addEventListener('blur', formValidation)
})

$FORM.addEventListener('submit', e =>{
    // para que no envie los datos
    e.preventDefault()

    const $TERMS = document.getElementById('terms')

    if(fields.names && fields.surnames && fields.password && fields.email && fields.phone && $TERMS.checked){
        $FORM.reset()

        document.getElementById('form-message-ok').classList.add('active')
        setTimeout(()=>{
            document.getElementById('form-message-ok').classList.remove('active')
        }, 4000)

        document.querySelectorAll('.form-group-correct').forEach((icon)=>{
            icon.classList.remove('form-group-correct')
        })
    }else{
        document.getElementById('form-error').classList.add('active')
        setTimeout(()=>{
            document.getElementById('form-error').classList.remove('active')
        }, 3000)

    }
})