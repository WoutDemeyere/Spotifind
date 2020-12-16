let email = {}, singInButton;

function handleFloatingLabel() {
    email.input.addEventListener('input', function () {
        if (!isEmpty(email.input.value)) {
            email.label.classList.add('is-filled')
        } 
    })

    email.input.addEventListener('click', function () {
        if (isEmpty(email.input.value)) {
            email.label.classList.add('is-filled')
        } 
    });

    email.input.addEventListener('blur', function () {
        if (!isEmpty(email.input.value)) {
            email.label.classList.add('is-filled')
        } else {
            email.label.classList.remove('is-filled')
        }
    })
}

function handleFormValidation() {

    singInButton.addEventListener('click', function () {
        let email_adr = email.input.value;

        console.log(email_adr);

        if (!isEmpty(email_adr)) {
            // email.error.innerHTML = ""
            email.field.classList.remove('has-error')

            if (!validateEmail(email_adr)) {
                email.field.classList.add('has-error')
                // email.error.innerHTML = "Email is invalid"
            } else {
                email_adr = "";
                // email.error.innerHTML = ""
                email.field.classList.remove('has-error')
            }
        } else if (isEmpty(email_adr)) {
            email.field.classList.add('has-error')
            // email.error.innerHTML = "Email is empty"
        }
    })

}



const validateEmail = function (email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isEmpty = function (fieldValue) {
    return !fieldValue || !fieldValue.length;
};

function getDOMElements() {
    email.field = document.querySelector('.js-email-field');
    email.input = document.querySelector('.js-email-input');
    email.label = document.querySelector('.js-email-label');
    // email.error = document.querySelector('.js-email-error');

    singInButton = document.querySelector('.js-sign-in-button');
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');

    getDOMElements();
    handleFormValidation();
    handleFloatingLabel();
});