<%@ page import="java.util.Random" %>
<%@ page import="java.util.logging.Logger" %>
<%@ page import="java.util.logging.Level" %>

<%
    if (session != null && session.getAttribute("cart") == null) {
        session.setAttribute("cart", "FD" + new Random().nextInt());
    }

    String source = request.getParameter("source");
    String product_name = request.getParameter("product_name");
    String product_price = request.getParameter("product_price");
    String rentprice = request.getParameter("rentprice");
    String productid = request.getParameter("productid");
    String img = request.getParameter("img");
    String qty = request.getParameter("qty");
    if (product_name == null || product_name.isEmpty()) {
        throw new IllegalArgumentException("Product name is missing.");
    }
    if ((rentprice == null || rentprice.isEmpty()) && (product_price == null || product_price.isEmpty())) {
        throw new IllegalArgumentException("Product price or rent price must be provided.");
    }

    String productType = source;
    out.print(productType);
    double price = 0;
    if ("rent".equalsIgnoreCase(productType)) {
        price = (rentprice != null && !rentprice.isEmpty()) ? Double.parseDouble(rentprice) : 0;
    } else {
        price = Double.parseDouble(product_price);
    }
    out.print(price);

    int quantity = 1;
    try {
        quantity = Integer.parseInt(qty);
    } catch (NumberFormatException e) {
        quantity = 1; 
    }

    double total = quantity * price;

    String cart = session.getAttribute("cart").toString();
    String sql = "INSERT INTO tblshopingcart(pid, product_name, rate, img, qty, total, sessionid, dateon) " +
                 "VALUES('" + productid + "', '" + product_name + "', " + price + ", '" + img + "', " + quantity + ", " + total + ", '" + cart + "', NOW());";

    int r = food.DataUtility.executeDML(sql);
    response.sendRedirect("checkout.jsp?source=" + source);
%>
