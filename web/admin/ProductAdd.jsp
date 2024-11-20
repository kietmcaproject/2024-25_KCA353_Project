<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Product Add</title>
        <%@include file="links.jsp" %>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
              
            }
            .inner-block {
                padding: 30px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 900px;
                margin-left: 350px;  
            }

            h2 {
                text-align: center;
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
            }

            label {
                font-weight: bold;
                color: #555;
                margin-bottom: 5px;
            }

            .form-control, .cat-input, textarea {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                width: 100%;
            }

            .checkbox-group {
                display: flex;
                gap: 15px;
                align-items: center;
            }

            .checkbox-group label {
                display: flex;
                align-items: center;
                font-weight: normal;
                color: #555;
            }

            .btn-submit {
                width: 100%;
                padding: 12px;
                background-color: #28a745;
                color: #fff;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .btn-submit:hover {
                background-color: #218838;
            }

            .cols-grids {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
            }

            .col-md-6, .col-md-12 {
                flex: 1 1 45%;
            }

            /* Adjust for full width on smaller screens */
            @media (max-width: 768px) {
                .col-md-6, .col-md-12 {
                    flex: 1 1 100%;
                }
            }
            body{
                overflow-x: hidden;
            }
            .cat-input{
                padding: 10px 130px;
                text-align: center;
            }

        </style>
    </head>
    <body>	
        <%@include file="header.jsp" %>
        <!-- /script-for sticky-nav -->
        <!--inner block start here-->
        <%
            if (request.getParameter("productname") != null) {
                String productname = request.getParameter("productname");
                String catid = request.getParameter("catid");
                String subcatid = request.getParameter("subcatid");
                String productprice = request.getParameter("productprice");
                String rentprice = request.getParameter("rentprice");
                String img1 = request.getParameter("img1");
                String img2 = request.getParameter("img2");
                String productdesc = request.getParameter("productdesc");
                String retailerid = request.getParameter("retailerid");
                String transactionType = "";
                if (request.getParameter("productOption") != null) {
                    String[] options = request.getParameterValues("productOption");
                    transactionType = String.join(",", options); // Joins selected values with a comma
                }
                
                String sql = "INSERT INTO product(catid,subcatid,product_name,product_price,rentprice,product_desc,img1,img2,retailerid,dateon,transaction_type)VALUES(" + catid + "," + subcatid + ",'" + productname + "'," + productprice + "," + rentprice + ",'" + productdesc + "','" + img1 + "','" + img2 + "','" + retailerid + "',NOW(), '" + transactionType + "');";
              
                int rp = food.DataUtility.executeDML(sql);
                 if (rp > 0) {
                    out.print("<script>alert('Added successfully')</script>");
                } else {
                    out.print("<script>alert('Not added')</script>");
                }

            }
        %>
         <h2>Product Add</h2>
        <div class="inner-block" style="margin-top:100px;">
            <form method="post" action="ProductAdd.jsp">  
                <div class="cols-grids panel-widget"><h2>Product Add</h2></div>
                <div class="cols-grids">
                    <div class="col-md-6 form-group">
                        <label>Shop Name</label>
                        <select name="retailerid" class="form-control">
                            <option>Choose Shop Name</option>
                            <% ResultSet rsr = food.DataUtility.executeDQL("SELECT * FROM retailer ORDER BY shop_name");
                                while (rsr.next()) {%>
                            <option value="<%= rsr.getString(1)%>"><%= rsr.getString(2)%></option>
                            <% } %>
                        </select>
                    </div> 

                    <div class="col-md-6 form-group">
                        <label>Category Name</label>
                        <select name="catid" class="form-control" onclick="getSubCat(this.value)">
                            <option>Choose Category Name</option>
                            <% ResultSet rsc = food.DataUtility.executeDQL("SELECT * FROM category ORDER BY category_name");
                                while (rsc.next()) {%>
                            <option value="<%= rsc.getString(1)%>"><%= rsc.getString(2)%></option>
                            <% }%>
                        </select>
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Sub Category Name</label>
                        <select name="subcatid" id="subcatidsel" class="form-control">
                            <option>Choose Sub-category</option>
                        </select>
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Product Name</label>
                        <input type="text" placeholder="Enter Product Name" class="cat-input" name="productname" required="">
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Product Price</label>
                        <input type="text" placeholder="Enter Product Price" class="cat-input" name="productprice" required="">
                    </div>
                   <div class="col-md-6 form-group">
                        <label>Rent Price</label>
                        <input type="text" placeholder="Enter Rented Price" class="cat-input" name="rentprice" required="">
                    </div>
                    <div class="col-md-6 form-group checkbox-group">
                        <label><b>Want to</b></label>
                        <label><input type="checkbox" name="productOption" value="rent"> Rent</label>
                        <label><input type="checkbox" name="productOption" value="sell"> Sell</label>
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Image 1</label>
                        <input type="file" class="cat-input" name="img1" required="">
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Image 2</label>
                        <input type="file" class="cat-input" name="img2" required="">
                    </div>

                    <div class="col-md-12">
                        <lable>Product Description</lable><br>
                        <textarea type="text" value="description" name="productdesc" required="" placeholder="Enter Description">         
                        </textarea>
                    </div>


                </div> 

                <div class="form-group">
                    <button type="submit" class="btn-submit">Submit</button>
                </div>
            </form>
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
<script>
    function getSubCat(id) {


        $("#subcatidsel").html('<option>Loading...</option>');
        $.ajax({
            type: "GET",
            url: "getSubCatByCatId.jsp",
            data: {catid: id},
            success: function (data) {
                $("#subcatidsel").html(data);
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", status, error);
                $("#subcatidsel").html('<option value="">Failed to load subcategories</option>');
            }
        });
    }
</script>
</html>


