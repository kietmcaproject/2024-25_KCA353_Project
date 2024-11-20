<%@page import="java.sql.ResultSet"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Saathi - Products</title>
        <%@include file="top.jsp" %>
        <style>
            .product-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }
            .product-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                width: 250px;
                text-align: center;
                padding: 20px;
                background-color: #fff;
                transition: transform 0.3s;
            }
            .product-card img {
                height: 140px;
                width: auto;
                margin-bottom: 15px;
                border-radius: 8px;
            }
            .product-card:hover {
                transform: scale(1.05);
            }
            .product-card h4 {
                color: #333;
                margin: 10px 0;
            }
            .product-card p {
                color: #555;
                font-size: 16px;
            }
            .product-card input[type="submit"] {
                margin-top: 10px;
                padding: 10px 20px;
                background-color: #007bff;
                border: none;
                color: white;
                border-radius: 5px;
                cursor: pointer;
            }
            .product-card input[type="submit"]:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <%@include file="header.jsp" %>
        <div class="container">
            <h3 style="text-align: center; margin-bottom: 30px;">Our Products</h3>
            <div class="product-container">
                <%                    String sql = "";
                    if (request.getParameter("productid") != null) {
                        int productid = Integer.parseInt(request.getParameter("productid"));
                        sql = "SELECT * FROM product WHERE subcatid = " + productid;
                    }
                    ResultSet ps = food.DataUtility.executeDQL(sql);
                    while (ps.next()) {
                        String transactionType = ps.getString("transaction_type");
                        boolean isBuy = transactionType.contains("sell");
                        boolean isRent = transactionType.contains("rent");
                        

                %>
                <div class="product-card">
                    <img src="images/<%= ps.getString("img1")%>" alt="<%= ps.getString("product_name")%>">
                    <h4><%= ps.getString("product_name")%></h4>
                    <div>
                        <% if (isBuy) {%>
                        <h4>Buy Price: &#8377;<%= ps.getString("product_price")%></h4>
                        <% } %>
                        <% if (isRent) {%>
                        <h4>Rent Price: &#8377;<%= ps.getString("rentprice")%></h4>
                        <% }%>
                    </div>
                    <form action="cart.jsp?source=buy" method="post">
                        <input type="hidden" name="product_name" value="<%= ps.getString("product_name")%>">
                        <input type="hidden" name="productid" value="<%= ps.getString("id")%>">
                        <input type="hidden" name="product_price" value="<%= ps.getString("product_price")%>">
                        <input type="number" name="qty" value="1" min="1" required>
                        <%   if (isBuy) { %>
                        <input type="submit" name="submit" value="BUY" class="button" />
                        <% } else if (isRent) { %>
                        <input type="submit" name="submit" value="RENT" class="button" />
                        <% } %>
                    </form>
                </div>
                <%
                    }
                %>
            </div>
        </div>
        <%@include file="footer.jsp" %>
    </body>
</html>
