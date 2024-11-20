<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>sub-Category Add</title>
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
        </style>
    </head>
    <body>	
        <%@include file="header.jsp" %>
        <!-- /script-for sticky-nav -->
        <!--inner block start here-->
        <%            if (request.getParameter("subcatname") != null) {
                String subcatname = request.getParameter("subcatname");
                String catid = request.getParameter("catid");
                String subcatorder = request.getParameter("subcatorder");
                String subcatdesc = request.getParameter("subcatdesc");
                String sql = "INSERT INTO subcat(catid,subcat_name,subcat_desc,subcat_order,dateon)VALUES('" + catid + "','" + subcatname + "','" + subcatdesc + "','" + subcatorder + "',NOW());";
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
                <h2>Sub - Category Add</h2>
                <form method="post"  action="subcat.jsp">               
                    <div class="row mb40">
                        <div class="col-md-6">
                            <label>Category Name</label>
                            <select name="catid" class="form-control">
                                <option>Choose Category Name</option>

                                <%
                                    ResultSet rsc = food.DataUtility.executeDQL("SELECT * FROM category ORDER BY category_name");

                                    while (rsc.next()) {

                                %>
                                <option selected="true" value="<% out.print(rsc.getString(1)); %>"><% out.print(rsc.getString(2)); %></option>  
                                <%

                                    }
                                %>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <lable>Sub-Category Name</lable><br>
                            <input type="text" placeholder="Enter Sub-Category Name" class="cat-input" name="subcatname" required="">
                        </div>
                        <div class="col-md-6">
                            <lable>Sub-Category Order</lable><br>
                            <input type="text" placeholder="Enter Sub-Category Order" class="cat-input" name="subcatorder" required="">
                        </div>
                    </div>
                    <div class="row mb40">
                        <div class="col-md-12">
                            <lable>Sub-Category Description</lable><br>
                            <textarea type="text" value="description" name="subcatdesc" required="" placeholder="Enter Description">
                                   
                            </textarea>
                        </div>

                    </div> 
                    <div class="col-lg-12">
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>

                </form>
            </div>	
        </div>
    </div>

    <!--inner block end here-->
    <!--copy rights start here-->
    <%@include file="footer.jsp" %>
    <!--COPY rights end here-->
</div>
<!--slider menu-->
<%@include file="sidebar.jsp" %>
</body>
</html>


