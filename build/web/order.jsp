<%   
 
    String qty=request.getParameter("qty");
    String product_name=request.getParameter("product_name");
    String rate=request.getParameter("rate");
    String total=request.getParameter("total");
    String sessionid = session.getAttribute("cart").toString();
    String paymentmode=request.getParameter("paymentmode");
    String sql = "INSERT INTO tblorders(ordertotal, tax, userid,paymentmode,dateon) VALUES('" + total + "', '" + 0+ "', " + sessionid + "," + paymentmode + ",NOW());";
    out.print(sql);
    int r = food.DataUtility.executeDML(sql);
%>
