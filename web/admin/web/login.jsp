<%@page import="java.sql.ResultSet"%>
<!DOCTYPE html>
<html>
    <head>
        <title>food court login form  Flat Responsive Widget Template :: w3layouts</title>
        <!-- metatags-->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="food court login form a Flat Responsive Widget,Login form widgets, Sign up Web 	forms , Login signup Responsive web form,Flat Pricing table,Flat Drop downs,Registration Forms,News letter Forms,Elements" />
        <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
            function hideURLbar(){ window.scrollTo(0,1); } </script>
        <!-- Meta tag Keywords -->
        <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
        <!--online fonts-->
        <link href="//fonts.googleapis.com/css?family=Lobster&amp;subset=cyrillic,latin-ext,vietnamese" rel="stylesheet">
        <link href="//fonts.googleapis.com/css?family=Righteous&amp;subset=latin-ext" rel="stylesheet">
        <!--//online fonts-->
    </head>
    <body>
        <%
           if (request.getParameter("Gmail") != null) {
              
    String gmail = request.getParameter("Gmail");  
    String pass = request.getParameter("Password"); 
    String id=request.getParameter("id");
    String sqlreg = "SELECT * FROM retailer WHERE gmail='" + gmail + "' AND pass ='" + pass + "'";
   
    ResultSet rl = food.DataUtility.executeDQL(sqlreg);
   
    if (rl.next()) {
    session.setAttribute("login", gmail);
    session.setAttribute("userId", rl.getInt("id")); 
    response.sendRedirect("../ProductAdd.jsp"); 
} else {
     out.println("<script>alert('Invalid user name or password')</script>");
}

}

        %>
        <h1>f<span>oo</span>d c<span>o</span>urt l<span>o</span>g<span>in</span> f<span>o</span>rm</h1>
        <div class="wthree-form">
            <h2>Fill out the form below to login</h2>
            <div class="w3l-login form">
                <form action="login.jsp" method="post">
                    <div class="form-sub-w3">
                        <input type="text" name="Gmail" placeholder="Gmail" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="password" name="Password" placeholder="Password" required=""/>
                        <input type="hidden" name="id" >

                    </div>
                    <label class="anim">
                        <a href="register.jsp">New Here ?</a>
                    </label>
                    <div class="submit-agileits">
                        <input type="submit" value="Login">
                    </div>
                    <a href="resetpass.jsp">Forgot Password ?</a>
                </form>
            </div>
        </div>

    </body>
</html>