const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const address = document.getElementById('address');
const pincode = document.getElementById('pincode');
const email = document.getElementById('email');
const gender = document.getElementsByName('gender');
const choiceOfFoods = document.getElementsByName('choiceOfFoods');
const foodsError = document.getElementById('foodsError');
const state = document.getElementById('state');
const country = document.getElementById('country');

const tbody = document.getElementById('tbody');


let foods = [];

//handleSubmit
function handleSubmit() {
    let isValid = false;

    if (firstName.value !== "" && lastName.value !== "" && address.value !== "" && pincode.value !== "" && email.value !== "" && state.value !== "" && country.value !== "" && foods.length >= 2) {
        isValid = true
    }

    else {
        isValid = false;
        if (firstName.value === "") {
            firstName.classList.add('is-invalid');
        }
        if (lastName.value === "") {
            lastName.classList.add('is-invalid');
        }
        if (address.value === "") {
            address.classList.add('is-invalid');
        }
        if (pincode.value === "") {
            pincode.classList.add('is-invalid');
        }
        if (email.value === "") {
            email.classList.add('is-invalid');
        }
        if (state.value === "") {
            state.classList.add('is-invalid');
        }
        if (country.value === "") {
            country.classList.add('is-invalid');
        }

        if (foods.length <= 2) {
            foodsError.classList.add('is-invalid');
        }


    }

    if (isValid) {
        const noRecordsRow = document.getElementById('norecords');
        if (noRecordsRow) {
            noRecordsRow.parentNode.removeChild(noRecordsRow);
        }
        let g;
        for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                g = gender[i].value;
                break;
            }
        }
        var formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            pincode: pincode.value,
            email: email.value,
            gender: g,
            state: state.value,
            country: country.value,
            choiceOfFoods: foods
        };

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formData.firstName}</td>
            <td>${formData.lastName}</td>
            <td>${formData.address}</td>
            <td>${formData.pincode}</td>
            <td>${formData.gender}</td>
            <td>${formData.choiceOfFoods.join(', ')}</td>
            <td>${formData.state}</td>
            <td>${formData.country}</td>
        `;

        tbody.appendChild(tr);
        
        handleReset();
    }
}


//handleReset
function handleReset() {
    firstName.value = "";
    firstName.classList.remove('is-invalid');
    lastName.value = "";
    lastName.classList.remove('is-invalid');
    email.value = "";
    email.classList.remove('is-invalid');
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = true;
    state.value = '';
    state.classList.remove('is-invalid');
    country.value = '';
    country.classList.remove('is-invalid');
    address.value = "";
    address.classList.remove('is-invalid');
    pincode.value = "";
    pincode.classList.remove('is-invalid');
    choiceOfFoods.forEach(checkbox => {
        checkbox.checked = false;
    });
    foods = [];
    foodsError.classList.remove('is-invalid');
}


// Clear errors onchange of input field
[firstName, lastName, address, pincode, email, state, country].forEach(element => {
    element.addEventListener('input', function () {
        if (firstName.value !== "" || lastName.value !== "" || email.value !== "" || state.value !== "" || country.value !== "" || address.value !== "" || pincode.value !== "") {
            element.classList.remove('is-invalid')
        }
        else {
            element.classList.add('is-invalid')
        }
    })
})

//Clear error onchange of checkbox field
choiceOfFoods.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        foods = [];
        for (let i = 0; i < choiceOfFoods.length; i++) {
            if (choiceOfFoods[i].checked) {
                foods.push(choiceOfFoods[i].value);
            }
        }
        console.log(foods);
        if (foods.length >= 2) {
            foodsError.classList.remove('is-invalid');
        } else {
            foodsError.classList.add('is-invalid');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    tr.setAttribute('id', 'norecords')
    td.setAttribute('colspan', '8');
    td.textContent = 'No Records exists';
    td.classList.add('text-center');
    tr.appendChild(td);
    tbody.appendChild(tr);
})