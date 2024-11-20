<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
 <%

            if (request.getParameter("Email") != null) {
                String Username = request.getParameter("Username");
                String Password = request.getParameter("Password");
                String Email = request.getParameter("Email");
                String Phone = request.getParameter("Phone");
                String sql2="Select * from USER where gmail="+Email;
                if(sql2==null){
                    out.println("<script>alert('User Already Exist')</script>");
                }
                else{
                String sql = "INSERT INTO USER(NAME,gmail,pass,phone_no)VALUES('" + Username + "','" + Email + "','" + Password + "','" + Phone + "')";
                int rru = food.DataUtility.executeDML(sql);
              
                }
            }

       
            response.sendRedirect("index2.html");

        %>