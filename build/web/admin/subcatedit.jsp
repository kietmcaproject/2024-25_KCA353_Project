<%@page import="java.sql.ResultSet"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Sub-Category Edit</title>
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
            .data {
                border: 2px solid black;
                background-color: lightgreen;
            }
            th {
                background-color: lightgrey;
            }
        </style>
    </head>
    <body>    
        <%@include file="header.jsp" %>
        <%
            if (request.getParameter("subcatdel") != null) {
                String subcatdel = request.getParameter("subcatdel");
                String sql = "DELETE FROM subcat WHERE id=" + subcatdel;
                int srdel = food.DataUtility.executeDML(sql);
            }
            if (request.getParameter("subcatid") != null) {
                String catid = request.getParameter("catid");
                String subcatid = request.getParameter("subcatid");
                String subcatname = request.getParameter("subcatname");
                String subcatorder = request.getParameter("subcatorder");
                String subcatdesc = request.getParameter("subcatdesc");
                
                String sql = "UPDATE subcat SET subcat_name='" + subcatname + "', catid='" + catid + "' , subcat_desc='" + subcatdesc + "', subcat_order=" + subcatorder + " WHERE id=" + subcatid;
                int redit = food.DataUtility.executeDML(sql);
                
                

            }
        %>

        <%
            if (request.getParameter("subcatedit") != null) {
                String subcatedit = request.getParameter("subcatedit");
                ResultSet rs1 = food.DataUtility.executeDQL("SELECT * FROM subcat WHERE id=" + subcatedit);
                if (rs1.next()) {
        %>
        <div class="inner-block" style="height: 400px; margin-left: 200px">
            <div class="cols-grids panel-widget">
                <h2>Sub-Category Update</h2>
                <form method="post" action="subcatedit.jsp">               
                    <div class="row mb40">
                        <div class="col-md-6">
                            <label>Category Name</label>
                            <select name="catid" class="form-control">
                                <option>Choose Category Name</option>

                                <%                                                                
                                   ResultSet rsc = food.DataUtility.executeDQL("SELECT * FROM category ORDER BY category_name");

                                    while (rsc.next()) {
                                        if (rs1.getString("catid").equals(rsc.getString("id"))) {
                                %>
                                <option selected="true" value="<% out.print(rsc.getString(1)); %>"><% out.print(rsc.getString(2)); %></option>

                                <%
                                        } else {
                                %>
                                <option value="<% out.print(rsc.getString(1)); %>"><% out.print(rsc.getString(2)); %></option>

                                <%
                                        }
                                    }
                                %>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Sub Category Name</label><br>
                            <input type="text" value="<%= rs1.getString("subcat_name") %>" class="cat-input" name="subcatname" required="">
                            <input type="hidden" name="subcatid" value="<%= rs1.getString("id") %>" />
                        </div>
                        <div class="col-md-6">
                            <label>Sub Category Order</label><br>
                            <input type="text" value="<%= rs1.getString("subcat_order") %>" class="cat-input" name="subcatorder" required="">
                        </div>
                        <div class="col-md-12">
                            <label>Sub Category Description</label><br>
                            <textarea name="subcatdesc" required=""><%= rs1.getString("subcat_desc") %></textarea>
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
                <h2>Sub Category Edit</h2>
                <div class="form-group col-lg-12 ">
                    <table class="data table table-bordered table-striped">
                        <tr>
                            <th>S.NO</th>
                            <th>Category Id</th>
                            <th>Sub Category Name</th>
                            <th>Sub Category Order</th>
                            <th>Sub Category Description</th>
                            <th>Action</th>
                        </tr>
                        <%
                            ResultSet rs = food.DataUtility.executeDQL("SELECT * FROM subcat ORDER BY id");
                            while (rs.next()) {
                        %>
                        <tr>
                            <td><%= rs.getString("id") %></td>
                            <td><%= rs.getString("catid") %></td>
                            <td><%= rs.getString("subcat_name") %></td>
                            <td><%= rs.getString("subcat_order") %></td>
                            <td><%= rs.getString("subcat_desc") %></td>
                            <td>
                                <a href="subcatedit.jsp?subcatedit=<% out.print(rs.getString("id")); %>" class="btn btn-warning">Edit</a>
                                <a href="subcatedit.jsp?subcatdel=<% out.print(rs.getString("id")); %>" class="btn btn-danger">Delete</a>
                            </td>
                        </tr>
                        <%
                            }
                        %>
                    </table>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!--inner block end here-->
        <!--copy rights start here-->
        <%@include file="footer.jsp" %>
        <!--COPY rights end here-->
    </div>
</div>
<!--slider menu-->
<%@include file="sidebar.jsp" %>
<div class="clearfix"></div>
</div>
<!--slide bar menu end here-->
<script>
    var toggle = true;

    $(".sidebar-icon").click(function () {
        if (toggle) {
            $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            $("#menu span").css({"position": "absolute"});
        } else {
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
