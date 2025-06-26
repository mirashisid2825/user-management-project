
function editUser(user) {
    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("dob").value = user.dob;
  }

  function deleteUser(id) {
    fetch("../api/user/delete.php", {
      method: "POST",
      body: JSON.stringify({ id })
    });
    window.location.reload();
  }
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userList = document.getElementById("userList");

  function fetchUsers() {
    fetch("../api/user/read.php")
      .then(res => res.json())
      .then(data => {
        userList.innerHTML = "";
        data.forEach(user => {
          userList.innerHTML += `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.dob}</td>
            <td>
              <button onclick='editUser(${JSON.stringify(user)})' class='btn btn-sm btn-info'>Edit</button>
              <button onclick='deleteUser(${user.id})' class='btn btn-sm btn-danger'>Delete</button>
            </td>
          </tr>`;
        });
      });
  }

  userForm.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("userId").value;
    const data = {
      id: id || undefined,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      dob: document.getElementById("dob").value
    };
    const endpoint = id ? "update.php" : "create.php";
    fetch(`../api/user/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => res.json()).then(() => {
      userForm.reset();
      fetchUsers();
    });
  });

  fetchUsers();
});
