function showRegisterForm() {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
        }


        function showLoginForm() {
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        }


        function login() {
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;


            const storedUser = localStorage.getItem(username);


            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.password === password) {
                    alert(`Đăng nhập thành công với tài khoản: ${username}`);
                    // Chuyển hướng đến trang chính hoặc thực hiện hành động khác
                } else {
                    alert('Sai mật khẩu!');
                }
            } else {
                alert(`Tài khoản "${username}" không tồn tại!`);
            }
        }


        function register() {
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;


            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }


            if (localStorage.getItem(username)) {
                alert(`Tài khoản "${username}" đã tồn tại! Vui lòng chọn tên đăng nhập khác.`);
                return;
            }


            const userData = {
                password: password
            };


            localStorage.setItem(username, JSON.stringify(userData));
            alert(`Đăng ký thành công với tài khoản: ${username}!`);
            showLoginForm(); // Chuyển về form đăng nhập sau khi đăng ký thành công
        }

