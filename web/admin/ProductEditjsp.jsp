
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    if(request.getParameter("productname")!=null)      {
    String productname=request.getParameter("productname");
    String pid=request.getParameter("ProductEdit");
    String sql="UPDATE product SET product_name='" + productname + "'WHERE id=" + pid;
    out.print(sql);
    int rep = food.DataUtility.executeDML(sql);
    }
%>
