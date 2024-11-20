<%@page import="java.sql.ResultSet"%>
<!DOCTYPE html>
<html>
<head>
    <title>Saathi - Buy Products</title>
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
        <h3 style="text-align: center; margin-bottom: 30px;">Buy Products</h3>
        <div class="product-container">
            <%
                ResultSet rsp = food.DataUtility.executeDQL("SELECT * FROM product WHERE transaction_type='sell'OR transaction_type='sell,rent'OR transaction_type='rent,sell' ORDER BY product_name LIMIT 4;");
                while (rsp.next()) {
            %>
            <div class="product-card">
                <img src="images/<%= rsp.getString("img1") %>" alt="<%= rsp.getString("product_name") %>">
                <h4><%= rsp.getString("product_name") %></h4>
                <p>&#8377;<%= rsp.getString("product_price") %></p>
                <form action="cart.jsp?source=buy" method="post">
                    <input type="hidden" name="product_name" value="<%= rsp.getString("product_name") %>">
                    <input type="hidden" name="productid" value="<%= rsp.getString("id") %>">
                    <input type="hidden" name="product_price" value="<%= rsp.getString("product_price") %>">
                    <input type="number" name="qty" value="1" min="1" required>
                    <input type="submit" name="submit" value="BUY">
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
