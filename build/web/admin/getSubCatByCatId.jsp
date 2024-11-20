<%@page import="java.sql.ResultSet"%>
<option value="">Choose Sub Category</option>
<%
   
    if (request.getParameter("catid") != null) {
        String catid = request.getParameter("catid");
        ResultSet rs = food.DataUtility.executeDQL("SELECT * FROM subcat INNER JOIN category ON category.id=subcat.catid WHERE catid="+catid+" ORDER BY subcat_name");
        
        while (rs.next()) {
          
            %>
                <option value="<% out.print(rs.getString("id")); %>"><% out.print(rs.getString("subcat_name")); %></option>
            <%
        }

        }


%>