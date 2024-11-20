<%@page import="java.sql.ResultSet"%>
<!DOCTYPE html>
<html>
<head>
    <title>Saathi - Rent Products</title>
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
        <h3 style="text-align: center; margin-bottom: 30px;">Rent Products</h3>
        <div class="product-container">
            <%
                try {
                    ResultSet rsp = food.DataUtility.executeDQL("SELECT * FROM product WHERE transaction_type='rent' OR transaction_type='sell,rent' OR transaction_type='rent,sell' ORDER BY product_name LIMIT 4;");
                    while (rsp.next()) {
                        String imgPath = rsp.getString("img1") != null ? rsp.getString("img1") : "placeholder.png";
                        String productName = rsp.getString("product_name") != null ? rsp.getString("product_name") : "Unknown Product";
                        String rentPrice = rsp.getString("rentprice") != null ? rsp.getString("rentprice") : "N/A";
                        String productId = rsp.getString("id");
            %>
            <div class="product-card">
                <img src="images/<%= imgPath %>" alt="<%= productName %>">
                <h4><%= productName %></h4>
                <p>&#8377;<%= rentPrice %> / Month</p>
                <form action="cart.jsp?source=rent" method="post">
                    <input type="hidden" name="product_name" value="<%= productName %>">
                    <input type="hidden" name="productid" value="<%= productId %>">
                    <input type="hidden" name="rentprice" value="<%= rentPrice %>">
                    <input type="number" name="qty" value="1" min="1" step="1" required>
                    <input type="submit" name="submit" value="RENT">
                </form>
            </div>
            <%
                    }
                } catch (Exception e) {
                    out.println("<p>Error loading products. Please try again later.</p>");
                }
            %>
        </div>
    </div>
    <%@include file="footer.jsp" %>
</body>
</html>
