
<!DOCTYPE html>
<html>
    <head>
        <title>Food Point | Register</title>
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
         if(request.getParameter("shopname")!=null)
         {
             String shopname=request.getParameter("shopname");
             String owner=request.getParameter("owner");
             String Address=request.getParameter("Address");
             String gst=request.getParameter("gst");
             String gmail=request.getParameter("gmail");
             String Password=request.getParameter("Password");
             String img=request.getParameter("img");
            String sql="INSERT INTO retailer(shop_name,shop_address,gst_no,owner_name,gmail,pass,img)VALUES('"+shopname+"','"+Address+"','"+gst+"','"+owner+"','"+gmail+"','"+Password+"','"+img+"')";
          
            int rr=food.DataUtility.executeDML(sql);            
         }
        %>
        <h1>f<span>oo</span>d P<span>o</span>int Re<span>gis</span>t<span>er</span> f<span>o</span>rm</h1>
        <div class="wthree-form">
            <h2>Fill out the form below to login</h2>
            <div class="w3l-login form">
                <form action="login.jsp" method="post">
                    <div class="form-sub-w3">
                        <input type="text" name="shopname" placeholder="Shop name" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="text" name="owner" placeholder="User Name" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="text" name="Address" placeholder="Address" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="text" name="gst" placeholder="GST number" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="text" name="gmail" placeholder="Gmail id" required=""/>
                    </div>
                    <div class="form-sub-w3">
                        <input type="password" name="Password" placeholder="Password" required=""/>
                    </div>
                     <div class="form-sub-w3">
                        <input type="file" name="img" placeholder="img"/>
                    </div>
                    <div class="submit-agileits">
                        <input type="submit" value="Register">
                    </div>
                  
                </form>
            </div>
        </div>

    </body>
</html>