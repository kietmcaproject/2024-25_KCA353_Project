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
           if (request.getParameter("CPassword") != null) {
            String CPassword = request.getParameter("CPassword");  
            String password = request.getParameter("password"); 
             String id=request.getParameter("id");
            if(CPassword==password){
           
            String sqlp = "UPDATE table_name SET pass = '"+CPassword+"' WHERE id='"+id+"'";
            ResultSet rl = food.DataUtility.executeDQL(sqlp);
}}
           else{
                out.println("<script>alert('password mistmatch')</script>");

           }
        %>
        <h1>f<span>oo</span>d c<span>o</span>urt l<span>o</span>g<span>in</span> f<span>o</span>rm</h1>
        <div class="wthree-form">
            <h2>Fill out the form below to login</h2>
            <div class="w3l-login form">
                <form action="resetpass.jsp" method="post">
                    <div class="form-sub-w3">
                        <input type="password" name="password" placeholder="Password" required=""/>
                        <input type="hidden" name="id" >

                    </div>
                    <div class="form-sub-w3">
                        <input type="password" name="CPassword" placeholder="Confirm Password" required=""/>
                    </div>
                    
                    <div class="submit-agileits">
                        <input type="submit" value="Login">
                    </div>
                   <label class="anim">
                        <a href="login.jsp">Back to Login Page?</a>
                    </label>
                </form>
            </div>
        </div>

    </body>
</html>