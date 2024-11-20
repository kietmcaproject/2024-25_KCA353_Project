package org.apache.jsp.admin;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.math.BigInteger;
import java.sql.ResultSet;

public final class category_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList<String>(4);
    _jspx_dependants.add("/admin/links.jsp");
    _jspx_dependants.add("/admin/header.jsp");
    _jspx_dependants.add("/admin/footer.jsp");
    _jspx_dependants.add("/admin/sidebar.jsp");
  }

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE HTML>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Category Add</title>\n");
      out.write("        ");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n");
      out.write("        <meta name=\"keywords\" content=\"Shoppy Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, \n");
      out.write("              Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design\" />\n");
      out.write("        <script type=\"application/x-javascript\"> addEventListener(\"load\", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>\n");
      out.write("        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->\n");
      out.write("        <link href=\"css/bootstrap.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">\n");
      out.write("        <!-- Custom Theme files -->\n");
      out.write("        <link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n");
      out.write("        <!--js-->\n");
      out.write("        <script src=\"js/jquery-2.1.1.min.js\"></script> \n");
      out.write("        <!--icons-css-->\n");
      out.write("        <link href=\"css/font-awesome.css\" rel=\"stylesheet\"> \n");
      out.write("        <!--Google Fonts-->\n");
      out.write("        <link href='//fonts.googleapis.com/css?family=Carrois+Gothic' rel='stylesheet' type='text/css'>\n");
      out.write("        <link href='//fonts.googleapis.com/css?family=Work+Sans:400,500,600' rel='stylesheet' type='text/css'>\n");
      out.write("        <!--//skycons-icons-->");
      out.write("\n");
      out.write("        <style>\n");
      out.write("            body {\n");
      out.write("                overflow-x: hidden;\n");
      out.write("            }\n");
      out.write("            .cat-input {\n");
      out.write("                padding: 10px 130px;\n");
      out.write("                text-align: center;\n");
      out.write("            }\n");
      out.write("            textarea {\n");
      out.write("                padding: 10px 380px;\n");
      out.write("            }\n");
      out.write("        </style>\n");
      out.write("    </head>\n");
      out.write("    <body>    \n");
      out.write("        ");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<div class=\"page-container\">    \n");
      out.write("    <div class=\"left-content\">\n");
      out.write("        <div class=\"mother-grid-inner\">\n");
      out.write("            <!--header start here-->\n");
      out.write("            <div class=\"header-main\">\n");
      out.write("                <div class=\"header-left\">\n");
      out.write("                    <div class=\"logo-name\">\n");
      out.write("                        <a href=\"../index.jsp\"> <h1>Saathi</h1> </a>                                 \n");
      out.write("                    </div>\n");
      out.write("                    <!--search-box-->\n");
      out.write("                    <div class=\"search-box\">\n");
      out.write("                        <form>\n");
      out.write("                            <input type=\"text\" placeholder=\"Search...\" required=\"\">    \n");
      out.write("                            <input type=\"submit\" value=\"\">                    \n");
      out.write("                        </form>\n");
      out.write("                    </div><!--//end-search-box-->\n");
      out.write("\n");
      out.write("                    ");

                        // Retrieve 'id' parameter from the request
                        String id = request.getParameter("id");
                        if (id != null && !id.isEmpty()) {
                            // Database query to get retailer details
                            String sqlreg = "SELECT * FROM retailer WHERE id='" + id + "'";

                            // Execute query
                            ResultSet rs = food.DataUtility.executeDQL(sqlreg);
                            if (rs != null && rs.next()) {
                                String img = rs.getString("img");
                                String shopName = rs.getString("shop_name");
                                String ownerName = rs.getString("owner_name");
                    
      out.write("\n");
      out.write("\n");
      out.write("                    <div class=\"clearfix\"> </div>\n");
      out.write("                </div>\n");
      out.write("\n");
      out.write("                <div class=\"header-right\">\n");
      out.write("                    <div class=\"profile_details\">        \n");
      out.write("                        <ul>\n");
      out.write("                            <li class=\"dropdown profile_details_drop\">\n");
      out.write("                                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n");
      out.write("                                    <div class=\"profile_img\">    \n");
      out.write("                                        <span class=\"prfil-img\">\n");
      out.write("                                            ");

                                                String imagePath = request.getContextPath() + "/images/" + rs.getString("img");
                                            
      out.write("\n");
      out.write("\n");
      out.write("                                            <!-- Display image from the database with updated styles -->\n");
      out.write("                                            <img src=\"");
      out.print( imagePath);
      out.write("\" alt=\"Profile Image\" class=\"profile-img-circle\" />\n");
      out.write("                                        </span> \n");
      out.write("                                        <div class=\"user-name\">\n");
      out.write("                                            <!-- Display shop name and owner name from the database -->\n");
      out.write("                                            <p>");
      out.print( ownerName);
      out.write("</p>\n");
      out.write("                                            <span>");
      out.print( shopName);
      out.write("</span>\n");
      out.write("                                        </div>\n");
      out.write("                                        <i class=\"fa fa-angle-down lnr\"></i>\n");
      out.write("                                        <i class=\"fa fa-angle-up lnr\"></i>\n");
      out.write("                                        <div class=\"clearfix\"></div>    \n");
      out.write("                                    </div>    \n");
      out.write("                                </a>\n");
      out.write("                            </li>\n");
      out.write("                        </ul>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"clearfix\"> </div>                \n");
      out.write("                </div>\n");
      out.write("                <div class=\"clearfix\"> </div>    \n");
      out.write("            </div>\n");
      out.write("            <!--header end here-->\n");
      out.write("\n");
      out.write("            <!-- script-for sticky-nav -->\n");
      out.write("            <script>\n");
      out.write("                $(document).ready(function () {\n");
      out.write("                    var navoffeset = $(\".header-main\").offset().top;\n");
      out.write("                    $(window).scroll(function () {\n");
      out.write("                        var scrollpos = $(window).scrollTop();\n");
      out.write("                        if (scrollpos >= navoffeset) {\n");
      out.write("                            $(\".header-main\").addClass(\"fixed\");\n");
      out.write("                        } else {\n");
      out.write("                            $(\".header-main\").removeClass(\"fixed\");\n");
      out.write("                        }\n");
      out.write("                    });\n");
      out.write("                });\n");
      out.write("            </script> \n");
      out.write("\n");
      out.write("            ");

                    } else {
                        out.println("No data found for the given ID.");
                    }
                } else {
                    out.println("ID parameter is missing.");
                }
            
      out.write("\n");
      out.write("        </div>\n");
      out.write("    </div>\n");
      out.write("</div>\n");
      out.write("\n");
      out.write("<style>\n");
      out.write("    /* CSS to make the image circular and adjust the size */\n");
      out.write("    .profile-img-circle {\n");
      out.write("        width: 50px; /* Set a smaller width */\n");
      out.write("        height: 50px; /* Set a smaller height */\n");
      out.write("        border-radius: 50%; /* Make the image circular */\n");
      out.write("        object-fit: cover; /* Ensure the image covers the circle properly */\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .profile_img {\n");
      out.write("        display: flex;\n");
      out.write("        align-items: center;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .user-name p {\n");
      out.write("        font-size: 14px; /* Adjust font size for the user's name */\n");
      out.write("        font-weight: bold;\n");
      out.write("        margin: 0;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .user-name span {\n");
      out.write("        font-size: 12px; /* Adjust font size for the shop name */\n");
      out.write("        color: #666;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .header-right {\n");
      out.write("        display: flex;\n");
      out.write("        justify-content: flex-end;\n");
      out.write("        align-items: center;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .profile_details ul {\n");
      out.write("        list-style-type: none;\n");
      out.write("        margin: 0;\n");
      out.write("        padding: 0;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .profile_details_drop a {\n");
      out.write("        text-decoration: none;\n");
      out.write("        color: #333;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    .profile_details_drop .profile_img {\n");
      out.write("        margin-right: 10px;\n");
      out.write("    }\n");
      out.write("</style>");
      out.write("\n");
      out.write("      \n");
      out.write("        <!-- /script-for sticky-nav -->\n");
      out.write("        <!--inner block start here-->\n");
      out.write("        ");

           
            if (request.getParameter("catname") != null) {
                String catname = request.getParameter("catname");
                String catorder = request.getParameter("catorder");
                String catdesc = request.getParameter("catdesc");
                String sql = "INSERT INTO category(category_name, category_desc, category_order, dateon) VALUES('" + catname + "', '" + catdesc + "', " + catorder + ", NOW());";
                int r = food.DataUtility.executeDML(sql);
            }
        
      out.write("\n");
      out.write("      \n");
      out.write("        <div class=\"inner-block\" style=\"height: 630px\">\n");
      out.write("            <div class=\"cols-grids panel-widget\">\n");
      out.write("                <h2 style=\"color:#23297F;\">Category Add</h2>\n");
      out.write("                <form method=\"post\" action=\"category.jsp\">               \n");
      out.write("                    <div class=\"row mb40\">\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <label>Category Name</label><br>\n");
      out.write("                            <input type=\"text\" placeholder=\"Enter Category Name\" class=\"cat-input\" name=\"catname\" required>\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <label>Category Order</label><br>\n");
      out.write("                            <input type=\"text\" placeholder=\"Enter Category Order\" class=\"cat-input\" name=\"catorder\" required>\n");
      out.write("                        </div>\n");
      out.write("                    </div>\n");
      out.write("                    \n");
      out.write("                    <div class=\"row mb40\">\n");
      out.write("                        <div class=\"col-md-12\">\n");
      out.write("                            <label>Category Description</label><br>\n");
      out.write("                            <textarea name=\"catdesc\" required placeholder=\"Enter Description\"></textarea>\n");
      out.write("                        </div>\n");
      out.write("                    </div> \n");
      out.write("                    <div class=\"col-lg-12\">\n");
      out.write("                        <button style=\"background: #23297F;\" type=\"submit\" class=\"btn btn-success\">Submit</button>\n");
      out.write("                    </div>\n");
      out.write("                </form>\n");
      out.write("              \n");
      out.write("            </div>    \n");
      out.write("        </div>\n");
      out.write("      <!--inner block end here-->\n");
      out.write("        <!--copy rights start here-->\n");
      out.write("        ");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("   <div class=\"copyrights\">\n");
      out.write("                    <p>© 2024 Saathi. All Rights Reserved | Design by </p>\n");
      out.write("                </div>\t\n");
      out.write("\n");
      out.write("        <!--COPY rights end here-->\n");
      out.write("    </div>\n");
      out.write("</div>\n");
      out.write("<!--slider menu-->\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("    <title>sidebar</title>\n");
      out.write("    <style>\n");
      out.write("        /* General Styling for Sidebar */\n");
      out.write("        body {\n");
      out.write("            font-family: Arial, sans-serif;\n");
      out.write("            margin: 0;\n");
      out.write("            padding: 0;\n");
      out.write("            background-color: #f4f4f4;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .sidebar-menu {\n");
      out.write("            width: 220px;\n");
      out.write("            height: 100%;\n");
      out.write("            background-color: black;\n");
      out.write("            color: #fff;\n");
      out.write("            position: fixed;\n");
      out.write("            top: 0;\n");
      out.write("            left: 0;\n");
      out.write("            transition: all 0.3s ease;\n");
      out.write("            padding-top: 50px;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .menu {\n");
      out.write("            list-style: none;\n");
      out.write("            padding: 0;\n");
      out.write("            margin: 0;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .menu li {\n");
      out.write("            position: relative;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .menu li a {\n");
      out.write("            display: block;\n");
      out.write("            padding: 15px;\n");
      out.write("            color: #ecf0f1;\n");
      out.write("            text-decoration: none;\n");
      out.write("            font-size: 16px;\n");
      out.write("            font-weight: 500;\n");
      out.write("            border-bottom: 1px solid #34495e;\n");
      out.write("            transition: background-color 0.3s ease, padding-left 0.3s ease;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .menu li a:hover {\n");
      out.write("            background-color: #3498db;\n");
      out.write("            padding-left: 25px;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .submenu {\n");
      out.write("            display: none;\n");
      out.write("            background-color: #34495e;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .submenu li a {\n");
      out.write("            padding-left: 30px;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        .submenu-icon {\n");
      out.write("            position: absolute;\n");
      out.write("            right: 20px;\n");
      out.write("            top: 18px;\n");
      out.write("            transition: transform 0.3s ease;\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        /* Hover Effects for Sidebar */\n");
      out.write("        .menu li a:hover .fa {\n");
      out.write("            transform: rotate(90deg);\n");
      out.write("        }\n");
      out.write("\n");
      out.write("        /* Responsive Design: For mobile view */\n");
      out.write("        @media (max-width: 768px) {\n");
      out.write("            .sidebar-menu {\n");
      out.write("                width: 200px;\n");
      out.write("            }\n");
      out.write("\n");
      out.write("            .menu li a {\n");
      out.write("                font-size: 14px;\n");
      out.write("                padding: 12px;\n");
      out.write("            }\n");
      out.write("\n");
      out.write("            .submenu li a {\n");
      out.write("                padding-left: 25px;\n");
      out.write("            }\n");
      out.write("\n");
      out.write("            .menu {\n");
      out.write("                padding-top: 10px;\n");
      out.write("            }\n");
      out.write("        }\n");
      out.write("    </style>\n");
      out.write("</head>\n");
      out.write("<body>\n");
      out.write("\n");
      out.write("    <div class=\"sidebar-menu\">\n");
      out.write("        <div class=\"menu\">\n");
      out.write("            <ul id=\"menu\">\n");
      out.write("                <li id=\"menu-home\">\n");
      out.write("                    <a href=\"../index.jsp\"><i class=\"fa fa-tachometer\"></i><span>Dashboard</span></a>\n");
      out.write("                </li>\n");
      out.write("                <li>\n");
      out.write("                    <a href=\"#\" class=\"submenu-toggle\"><i class=\"fa fa-bars\"></i><span>Category</span><i class=\"fa fa-angle-down submenu-icon\"></i></a>\n");
      out.write("                    <ul class=\"submenu\">\n");
      out.write("                        <li><a href=\"category.jsp\">Add</a></li>\n");
      out.write("                        <li><a href=\"category_edit.jsp\">Edit</a></li>\t\t            \n");
      out.write("                    </ul>\n");
      out.write("                </li>\n");
      out.write("                <li>\n");
      out.write("                    <a href=\"#\" class=\"submenu-toggle\"><i class=\"fa fa-book nav_icon\"></i><span>Sub Category</span><i class=\"fa fa-angle-down submenu-icon\"></i></a>\n");
      out.write("                    <ul class=\"submenu\">\n");
      out.write("                        <li><a href=\"subcat.jsp\">Add</a></li>\n");
      out.write("                        <li><a href=\"subcatedit.jsp\">Edit</a></li>\n");
      out.write("                    </ul>\n");
      out.write("                </li>\n");
      out.write("                <li>\n");
      out.write("                    <a href=\"#\" class=\"submenu-toggle\"><i class=\"fa fa-file-text\"></i><span>Products</span><i class=\"fa fa-angle-down submenu-icon\"></i></a>\n");
      out.write("                    <ul class=\"submenu\">\n");
      out.write("                        <li><a href=\"ProductAdd.jsp\">Add</a></li>\n");
      out.write("                        <li><a href=\"ProductEdit.jsp\">Edit</a></li>\t\t           \n");
      out.write("                    </ul>\n");
      out.write("                </li>\n");
      out.write("            </ul>\n");
      out.write("        </div>\n");
      out.write("    </div>\n");
      out.write("\n");
      out.write("    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>\n");
      out.write("    <script>\n");
      out.write("        $(document).ready(function () {\n");
      out.write("            // Toggle submenu visibility\n");
      out.write("            $(\".submenu-toggle\").click(function () {\n");
      out.write("                $(this).next(\".submenu\").slideToggle();\n");
      out.write("                $(this).find(\".submenu-icon\").toggleClass(\"fa-angle-up fa-angle-down\");\n");
      out.write("            });\n");
      out.write("        });\n");
      out.write("    </script>\n");
      out.write("\n");
      out.write("</body>\n");
      out.write("</html>");
      out.write("\n");
      out.write("<div class=\"clearfix\"> </div>\n");
      out.write("</div>\n");
      out.write("<!--slide bar menu end here-->\n");
      out.write("<script>\n");
      out.write("    var toggle = true;\n");
      out.write("\n");
      out.write("    $(\".sidebar-icon\").click(function () {\n");
      out.write("        if (toggle)\n");
      out.write("        {\n");
      out.write("            $(\".page-container\").addClass(\"sidebar-collapsed\").removeClass(\"sidebar-collapsed-back\");\n");
      out.write("            $(\"#menu span\").css({\"position\": \"absolute\"});\n");
      out.write("        }\n");
      out.write("        else\n");
      out.write("        {\n");
      out.write("            $(\".page-container\").removeClass(\"sidebar-collapsed\").addClass(\"sidebar-collapsed-back\");\n");
      out.write("            setTimeout(function () {\n");
      out.write("                $(\"#menu span\").css({\"position\": \"relative\"});\n");
      out.write("            }, 400);\n");
      out.write("        }\n");
      out.write("        toggle = !toggle;\n");
      out.write("    });\n");
      out.write("</script>\n");
      out.write("<!--scrolling js-->\n");
      out.write("<script src=\"js/jquery.nicescroll.js\"></script>\n");
      out.write("<script src=\"js/scripts.js\"></script>\n");
      out.write("<!--//scrolling js-->\n");
      out.write("<script src=\"js/bootstrap.js\"></script>\n");
      out.write("<!-- mother grid end here-->\n");
      out.write("</body>\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
