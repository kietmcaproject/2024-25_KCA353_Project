
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register as User or Vendor</title>
  <style>
      * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

p {
  margin-bottom: 20px;
  color: #666;
}

.button-container {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

  </style>
</head>
<body>
  <div class="container">
    <h1>Register</h1>
    <p>Please select your role:</p>
    <div class="button-container">
      <a href="userregisterform.jsp" class="button">Register as User</a>
      <a href="admin/web/login.jsp" class="button">Register as Vendor</a>
    </div>
  </div>
</body>
</html>
