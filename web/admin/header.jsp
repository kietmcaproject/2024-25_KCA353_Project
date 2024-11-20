<%@page import="java.sql.ResultSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div class="page-container">    
    <div class="left-content">
        <div class="mother-grid-inner">
            <!--header start here-->
            <div class="header-main">
                <div class="header-left">
                    <div class="logo-name">
                        <a href="../index.jsp"> <h1>Saathi</h1> </a>                                 
                    </div>
                    <!--search-box-->
                    <div class="search-box">
                        <form>
                            <input type="text" placeholder="Search..." required="">    
                            <input type="submit" value="">                    
                        </form>
                    </div><!--//end-search-box-->

                    <%
                        Integer userId = (Integer) session.getAttribute("userId");
                        String id = Integer.toString(userId); 
                        if (id != null && !id.isEmpty()) {
                            String sqlreg = "SELECT * FROM retailer WHERE id='" + id + "'";
                            ResultSet rs = food.DataUtility.executeDQL(sqlreg);
                            if (rs != null && rs.next()) {
                                String img = rs.getString("img");
                                String shopName = rs.getString("shop_name");
                                String ownerName = rs.getString("owner_name");
                    %>

                    <div class="clearfix"> </div>
                </div>

                <div class="header-right">
                    <div class="profile_details">        
                        <ul>
                            <li class="dropdown profile_details_drop">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <div class="profile_img">    
                                        <span class="prfil-img">
                                            <%
                                                String imagePath = request.getContextPath() + "/images/" + rs.getString("img");
                                            %>

                                            <!-- Display image from the database with updated styles -->
                                            <img src="<%= imagePath%>" alt="Profile Image" class="profile-img-circle" />
                                        </span> 
                                        <div class="user-name">
                                            <!-- Display shop name and owner name from the database -->
                                            <p><%= ownerName%></p>
                                            <span><%= shopName%></span>
                                        </div>
                                        <i class="fa fa-angle-down lnr"></i>
                                        <i class="fa fa-angle-up lnr"></i>
                                        <div class="clearfix"></div>    
                                    </div>    
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"> </div>                
                </div>
                <div class="clearfix"> </div>    
            </div>
            <!--header end here-->

            <!-- script-for sticky-nav -->
            <script>
                $(document).ready(function () {
                    var navoffeset = $(".header-main").offset().top;
                    $(window).scroll(function () {
                        var scrollpos = $(window).scrollTop();
                        if (scrollpos >= navoffeset) {
                            $(".header-main").addClass("fixed");
                        } else {
                            $(".header-main").removeClass("fixed");
                        }
                    });
                });
            </script> 

            <%
                    } else {
                        out.println("No data found for the given ID.");
                    }
                } else {
                    out.println("ID parameter is missing.");
                }
            %>
        </div>
    </div>
</div>

<style>
    /* CSS to make the image circular and adjust the size */
    .profile-img-circle {
        width: 50px; /* Set a smaller width */
        height: 50px; /* Set a smaller height */
        border-radius: 50%; /* Make the image circular */
        object-fit: cover; /* Ensure the image covers the circle properly */
    }

    .profile_img {
        display: flex;
        align-items: center;
    }

    .user-name p {
        font-size: 14px; /* Adjust font size for the user's name */
        font-weight: bold;
        margin: 0;
    }

    .user-name span {
        font-size: 12px; /* Adjust font size for the shop name */
        color: #666;
    }

    .header-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .profile_details ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .profile_details_drop a {
        text-decoration: none;
        color: #333;
    }

    .profile_details_drop .profile_img {
        margin-right: 10px;
    }
</style>