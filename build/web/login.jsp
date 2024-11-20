
<%@page import="java.sql.ResultSet"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
     if (request.getParameter("Email") != null) {

                String Email = request.getParameter("Email");
                String Password = request.getParameter("Password");
               
                String sqlreg1 = "SELECT * FROM USER WHERE gmail='" + Email + "' AND pass ='" + Password + "'";

                ResultSet rlu = food.DataUtility.executeDQL(sqlreg1);

                if (rlu.next()) {
                    session.setAttribute("login", Email);
                    session.setAttribute("userid", rlu.getInt("id"));
                    response.sendRedirect("checkout.jsp");
                } else {
                    out.println("<script>alert('Invalid user name or password')</script>");
                    response.sendRedirect("index2.html");
                }

            }
%>
