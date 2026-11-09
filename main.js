
let users = [];

const userForm = document.getElementById("product");
const editstatus = document.getElementById("editstatus");
const proid = document.getElementById("proid");
const proname = document.getElementById("proname");
const price = document.getElementById("price");
const qntity = document.getElementById("qntity");
const tableBody = document.getElementById("tablebody");

if (sessionStorage.getItem("users")) {
    users = JSON.parse(sessionStorage.getItem("users"));
    displayUserList();
}
userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const prdIdInput = proid.value;
    const prdnameInput = proname.value;
    const priceInput = price.value;
    const quantityInput = qntity.value;

    if (prdIdInput && prdnameInput && priceInput && quantityInput) {
        const editindex = editstatus.value;

        if (editindex === "") {
            users.push({
                proid: prdIdInput,
                proname: prdnameInput,
                price: priceInput,
                qntity: quantityInput
            });
        } else {
            users[editindex] = {
                proid: prdIdInput,
                proname: prdnameInput,
                price: priceInput,
                qntity: quantityInput
            };
        }

        sessionStorage.setItem("users", JSON.stringify(users));

        userForm.reset();
        editstatus.value = "";

        displayUserList();

    } else {
        alert("Fill it completely");
    }
});

function displayUserList() {
 tableBody.innerHTML = "";
    users.forEach((item, index) => {

 tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.proid}</td>
                <td>${item.proname}</td>
                <td>${item.price}</td>
                <td>${item.qntity}</td>
                <td>
                    <button onclick="editUser(${index})"
                    class="btn btn-warning">Edit</button>

                    <button onclick="deleteUser(${index})"
                    class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
    });
}
function editUser(index) {
    proid.value = users[index].proid;
    proname.value = users[index].proname;
    price.value = users[index].price;
    qntity.value = users[index].qntity;
    editstatus.value = index;
}
function deleteUser(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        users.splice(index, 1);
        sessionStorage.setItem("users", JSON.stringify(users));
        displayUserList();
    }
}
