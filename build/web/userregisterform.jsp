<%@page import="java.sql.ResultSet"%>

<!DOCTYPE html>
<html>
    <head>
        <title>Saathi | User Login</title>
        <%@include file="top.jsp" %>
    </head>
    <body>
        <%
            if (request.getParameter("Gmail") != null) {
                String gmail = request.getParameter("Gmail");
                String pass = request.getParameter("Password");
                String id = request.getParameter("id");
                out.println("ID from request: " + id);

                String sqlreg = "SELECT * FROM retailer WHERE gmail='" + gmail + "' AND pass ='" + pass + "'";
                ResultSet rl = food.DataUtility.executeDQL(sqlreg);

                if (rl.next()) {
                    session.setAttribute("login", gmail);
                    session.setAttribute("userId", rl.getInt("id"));

                    if (id != null) {
                        session.setAttribute("id", id);
                    }

                    response.sendRedirect("admin/ProductAdd.jsp");
                } else {
                    out.println("<script>alert('Invalid username or password')</script>");
                }
            }
        %>
        <%
            if (request.getParameter("shopname") != null) {
                String shopname = request.getParameter("shopname");
                String owner = request.getParameter("owner");
                String Address = request.getParameter("Address");
                String gst = request.getParameter("gst");
                String gmail = request.getParameter("gmail");
                String Password = request.getParameter("Password");
                String img = request.getParameter("img");
                String sql2 = "Select * from retailer where gmail=" + gmail;
                if (sql2 == null) {
                    out.println("<script>alert('User Already Exist')</script>");
                    response.sendRedirect("userregisterform.jsp");
                } else {
                    String sql = "INSERT INTO retailer(shop_name,shop_address,gst_no,owner_name,gmail,pass,img)VALUES('" + shopname + "','" + Address + "','" + gst + "','" + owner + "','" + gmail + "','" + Password + "','" + img + "')";
                    int rr = food.DataUtility.executeDML(sql);
                    response.sendRedirect("userregisterform.jsp");
                }

            }
        %>
        <div class="products-breadcrumb">
            <div class="container">
                <ul>
                    <li><i class="fa fa-home" aria-hidden="true"></i><a href="index.html">Home</a><span>|</span></li>
                    <li>Sign In & Sign Up</li>
                </ul>
            </div>
        </div>
        <div class="w3l_banner_nav_center">
            <div class="w3_login">
                <h3>Sign In & Sign Up</h3>
                <div class="w3_login_module">
                    <div class="module form-module">
                        <div class="toggle"><i class="fa fa-times fa-pencil"></i>
                            <div class="tooltip">Click Me</div>
                        </div>
                        <div class="form">
                            <h2>Login to your account</h2>
                            <form action="userregisterform.jsp" method="post">
                                <div class="form-sub-w3">
                                    <input type="text" name="Gmail" placeholder="Gmail" required=""/>
                                </div>
                                <div class="form-sub-w3">
                                    <input type="password" name="Password" placeholder="Password" required=""/>
                                    <input type="hidden" name="id" value="<%= request.getParameter("id") != null ? request.getParameter("id") : ""%>">
                                </div>
                                <label class="anim">
                                    <a href="register.jsp">New Here ?</a>
                                </label>
                                <div class="submit-agileits">
                                    <input type="submit" value="Login">
                                </div>
                                <a href="admin/web/resetpass.jsp">Forgot Password ?</a>
                            </form>
                        </div>

                        <div class="form">
                            <h2>Create an account</h2>
                            <form action="userregisterform.jsp" method="post">
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
                        <div class="cta"><a href="#">Forgot your password?</a></div>
                    </div>
                </div>
                <script>
                    $('.toggle').click(function () {
                        // Switches the Icon
                        $(this).children('i').toggleClass('fa-pencil');
                        // Switches the forms  
                        $('.form').animate({
                            height: "toggle",
                            'padding-top': 'toggle',
                            'padding-bottom': 'toggle',
                            opacity: "toggle"
                        }, "slow");
                    });
                </script>
            </div>
            <!-- //login -->
        </div>
        <div class="clearfix"></div>

        <!-- //banner -->
        <!-- newsletter-top-serv-btm -->
        <div class="newsletter-top-serv-btm">
            <div class="container">
                <div class="col-md-4 wthree_news_top_serv_btm_grid">
                    <div class="wthree_news_top_serv_btm_grid_icon">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <h3>Nam libero tempore</h3>
                    <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus 
                        saepe eveniet ut et voluptates repudiandae sint et.</p>
                </div>
                <div class="col-md-4 wthree_news_top_serv_btm_grid">
                    <div class="wthree_news_top_serv_btm_grid_icon">
                        <i class="fa fa-bar-chart" aria-hidden="true"></i>
                    </div>
                    <h3>officiis debitis aut rerum</h3>
                    <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus 
                        saepe eveniet ut et voluptates repudiandae sint et.</p>
                </div>
                <div class="col-md-4 wthree_news_top_serv_btm_grid">
                    <div class="wthree_news_top_serv_btm_grid_icon">
                        <i class="fa fa-truck" aria-hidden="true"></i>
                    </div>
                    <h3>eveniet ut et voluptates</h3>
                    <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus 
                        saepe eveniet ut et voluptates repudiandae sint et.</p>
                </div>
                <div class="clearfix"> </div>
            </div>
        </div>
        <!-- //newsletter-top-serv-btm -->
        <%@include file="footer.jsp" %>
    </body>
</html>