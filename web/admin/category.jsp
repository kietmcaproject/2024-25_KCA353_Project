
<%@page import="java.math.BigInteger"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Category Add</title>
        <%@include file="links.jsp" %>
        <style>
            body {
                overflow-x: hidden;
            }
            .cat-input {
                padding: 10px 130px;
                text-align: center;
            }
            textarea {
                padding: 10px 380px;
            }
        </style>
    </head>
    <body>    
        <%@include file="header.jsp" %>

        <!-- /script-for sticky-nav -->
        <!--inner block start here-->
        <%            if (request.getParameter("catname") != null) {
                String catname = request.getParameter("catname");
                String catorder = request.getParameter("catorder");
                String catdesc = request.getParameter("catdesc");
                String sql = "INSERT INTO category(category_name, category_desc, category_order, dateon) VALUES('" + catname + "', '" + catdesc + "', " + catorder + ", NOW());";
                int r = food.DataUtility.executeDML(sql);
                if (r > 0) {
                    out.print("<script>alert('Added successfully')</script>");
                } else {
                    out.print("<script>alert('Not added')</script>");
                }
            }
        %>

        <div class="inner-block" style="height: 630px; margin-left: 200px">
            <div class="cols-grids panel-widget">
                <h2 style="color:#23297F;">Category Add</h2>
                <form method="post" action="category.jsp">               
                    <div class="row mb40">
                        <div class="col-md-6">
                            <label>Category Name</label><br>
                            <input type="text" placeholder="Enter Category Name" class="cat-input" name="catname" required>
                        </div>
                        <div class="col-md-6">
                            <label>Category Order</label><br>
                            <input type="text" placeholder="Enter Category Order" class="cat-input" name="catorder" required>
                        </div>
                    </div>

                    <div class="row mb40">
                        <div class="col-md-12">
                            <label>Category Description</label><br>
                            <textarea name="catdesc" required placeholder="Enter Description"></textarea>
                        </div>
                    </div> 
                    <div class="col-lg-12">
                        <button style="background: #23297F;" type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>

            </div>    
        </div>
        <!--inner block end here-->
        <!--copy rights start here-->
        <%@include file="footer.jsp" %>
        <!--COPY rights end here-->
    </div>
</div>
<!--slider menu-->
<%@include file="sidebar.jsp" %>
<div class="clearfix"> </div>
</div>
<!--slide bar menu end here-->
<script>
    var toggle = true;

    $(".sidebar-icon").click(function () {
        if (toggle)
        {
            $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            $("#menu span").css({"position": "absolute"});
        }
        else
        {
            $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
            setTimeout(function () {
                $("#menu span").css({"position": "relative"});
            }, 400);
        }
        toggle = !toggle;
    });
</script>
<!--scrolling js-->
<script src="js/jquery.nicescroll.js"></script>
<script src="js/scripts.js"></script>
<!--//scrolling js-->
<script src="js/bootstrap.js"></script>
<!-- mother grid end here-->
</body>
</html>