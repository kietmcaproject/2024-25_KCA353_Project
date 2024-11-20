<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Category Edit</title>
        <%@include file="links.jsp" %>
        <style>
            body{
                overflow-x: hidden;
            }
            .cat-input{
                padding: 10px 130px;
                text-align: center;
            }
            textarea{
                padding: 10px 380px;
            }
            .data{
                border: 2px solid black;
                background-color: #8F84D2;
            }
            th{
                background-color: lightgrey;
            }
        </style>
    </head>
    <body>	
        <%@include file="header.jsp" %>
        <%
            if (request.getParameter("catdel") != null) {
                String catdel = request.getParameter("catdel");
                String sql = "DELETE FROM category WHERE id=" + catdel;
                int rdel = food.DataUtility.executeDML(sql);
            }
          if (request.getParameter("catid") != null) {
                String catname = request.getParameter("catname");
                String catorder = request.getParameter("catorder");
                String catdesc = request.getParameter("catdesc");
                String catid = request.getParameter("catid");
                String sql = "UPDATE category SET category_name='" + catname + "' , category_desc='" + catdesc + "', category_order=" + catorder + " WHERE id=" + catid;
                int redit = food.DataUtility.executeDML(sql);
            }
        %>

        <%
            if (request.getParameter("catedit") != null) {
                String catedit = request.getParameter("catedit");
                ResultSet rs = food.DataUtility.executeDQL("SELECT *FROM category where id=" + catedit);
                if (rs.next()) {
        %>
        <div class="inner-block" style="height: 400px; margin-left: 200px">
            <div class="cols-grids panel-widget">
                <h2>Category Update</h2>
                <form method="post"  action="category_edit.jsp">               
                    <div class="row mb40">
                        <div class="col-md-6">
                            <lable>Category Name</lable><br>
                            <input type="text" value="<%= rs.getString("category_name")%>" class="cat-input" name="catname" required="">
                            <input type="hidden" name="catid" value="<%= rs.getString("id")%>"  />
                        </div>
                        <div class="col-md-6">
                            <lable>Category Order</lable><br>
                            <input type="text" value="<%= rs.getString("category_order")%>" class="cat-input" name="catorder" required="">
                        </div>
                         <div class="col-md-12">
                            <lable>Category Description</lable><br>
                            <textarea type="text" value="<%= rs.getString("category_desc")%>" name="catdesc" required="">
                                   
                            </textarea>
                        </div>
                    </div>
                   
                    <div class="col-lg-12">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>

                </form>
            </div>
        </div>
        <%
                }
            }
        %>
        <div class="inner-block" style="height: 630px; margin-left: 200px">
            <div class="cols-grids panel-widget">
                <h2>Category Edit</h2>
                <form method="post"  action="category_edit.jsp">  
                </form>
                <div class="form-group col-lg-12 ">
                    <table class="data table table-bordered table-striped">
                        <tr>
                            <th>S.NO</th>
                            <th>Category Name</th>
                            <th>Category Order</th>
                            <th>Category Description</th>
                            <th>Action</th>

                        </tr>
                        <%
                            ResultSet rs = food.DataUtility.executeDQL("Select *from category order by id");
                            while (rs.next()) {
                        %>
                        <tr>
                            <td><%= rs.getString("id")%></td>
                            <td><%= rs.getString("category_name")%></td>
                            <td><%= rs.getString("category_order")%></td>
                            <td><%= rs.getString("category_desc")%></td>
                            <td>
                                <a href="category_edit.jsp?catedit=<% out.print(rs.getString("id")); %>" class="btn btn-warning" >Edit</a>
                                <a href="category_edit.jsp?catdel=<% out.print(rs.getString("id")); %>"  class="btn btn-danger">Delete</a>
                            </td>


                        </tr>

                        <%
                            }
                        %>
                    </table>
                </div>

            </div>
            <div class="clearfix"> </div>

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




