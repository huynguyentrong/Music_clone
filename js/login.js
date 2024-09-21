const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống");
  } else {
    const storedUser = localStorage.getItem(inputUsername.value);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === inputPassword.value) {
        alert("Đăng Nhập Thành Công");
        window.location.href = "index.html";
      } else {
        alert("Mật khẩu không đúng");
      }
    } else {
      alert("Tài khoản không tồn tại");
    }
  }
});
