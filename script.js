function validateForm() {
    event.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var zip = document.getElementById('zip').value.trim();

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('ZIP:', zip);

    if (name === '' || email === '' || phone === '' || zip === '') {
        alert('Please fill out all fields.');
        return false;
    }
    if (/\d/.test(name)) {
        alert('Name cannot contain digits.');
        return false;
    }
    if (!isValidEmail(email)) {
        alert('Please provide a valid email address.');
        return false;
    }
    if (!isValidPhoneNumber(phone)) {
        alert('Please provide a valid phone number.');
        return false;
    }
    if (!isValidZip(zip)) {
        alert('Zip code should be exactly 6 digits long.');
        return false;
    }

    var hobbies = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        hobbies.push(checkbox.value); 
    });

    var table = document.getElementById("customers");
    var newRow = table.insertRow(-1); 

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = "<td>" + name + "</td>";

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "<td>" + email + "</td>";

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = "<td>" + phone + "</td>";

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = "<td>" + zip + "</td>";

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<td>" + hobbies.join(', ') + "</td>";

    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = "<td><button onclick='editRecord(this.parentNode.parentNode.rowIndex)'>Edit</button></td>";

    return true; 
}

function enableSubmitButton() {
    var submitButton = document.getElementById('submitButton');
    submitButton.disabled = false;
}

function clearForm() {
    document.getElementById('studentForm').reset();
}   

function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phone) {
    var phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

function isValidZip(zip) {
    var zipPattern = /^\d{6}$/;
    return zipPattern.test(zip);
}

function editRecord(rowIndex) {
var table = document.getElementById("customers");
var row = table.rows[rowIndex];
document.getElementById('name').value = row.cells[0].innerHTML;
document.getElementById('email').value = row.cells[1].innerHTML;
document.getElementById('phone').value = row.cells[2].innerHTML;
document.getElementById('zip').value = row.cells[3].innerHTML;

var hobbies = row.cells[4].innerHTML.split(',').map(function(item) {
    return item.trim(); 
});


var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.checked = hobbies.includes(checkbox.value);
});

enableSubmitButton();
}
