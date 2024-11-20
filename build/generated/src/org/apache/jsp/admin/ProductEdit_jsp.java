package org.apache.jsp.admin;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.ResultSet;

public final class ProductEdit_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<!DOCTYPE HTML>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Product Add</title>\n");
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
      out.write("            body{\n");
      out.write("                overflow-x: hidden;\n");
      out.write("            }\n");
      out.write("            .cat-input{\n");
      out.write("                padding: 10px 130px;\n");
      out.write("                text-align: center;\n");
      out.write("            }\n");
      out.write("            textarea{\n");
      out.write("                padding: 10px 380px;\n");
      out.write("            }\n");
      out.write("        </style>\n");
      out.write("    </head>\n");
      out.write("    <body>\t\n");
      out.write("        ");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("   <div class=\"page-container\">\t\n");
      out.write("            <div class=\"left-content\">\n");
      out.write("                <div class=\"mother-grid-inner\">\n");
      out.write("                    <!--header start here-->\n");
      out.write("                    <div class=\"header-main\">\n");
      out.write("                        <div class=\"header-left\">\n");
      out.write("                            <div class=\"logo-name\">\n");
      out.write("                                <a href=\"index.html\" > <h1 style=\"color:#23297F;\">Saathi</h1> \n");
      out.write("                                    <!--<img id=\"logo\" src=\"\" alt=\"Logo\"/>--> \n");
      out.write("                                </a> \t\t\t\t\t\t\t\t\n");
      out.write("                            </div>\n");
      out.write("                            <!--search-box-->\n");
      out.write("                            <div class=\"search-box\">\n");
      out.write("                                <form>\n");
      out.write("                                    <input type=\"text\" placeholder=\"Search...\" required=\"\">\t\n");
      out.write("                                    <input type=\"submit\" value=\"\">\t\t\t\t\t\n");
      out.write("                                </form>\n");
      out.write("                            </div><!--//end-search-box-->\n");
      out.write("                            <div class=\"clearfix\"> </div>\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"header-right\">\n");
      out.write("                            <div class=\"profile_details_left\"><!--notifications of menu start -->\n");
      out.write("                                <ul class=\"nofitications-dropdown\">\n");
      out.write("                                    <li class=\"dropdown head-dpdn\">\n");
      out.write("                                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\"><i class=\"fa fa-envelope\"></i><span class=\"badge\">3</span></a>\n");
      out.write("                                        <ul class=\"dropdown-menu\">\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_header\">\n");
      out.write("                                                    <h3>You have 3 new messages</h3>\n");
      out.write("                                                </div>\n");
      out.write("                                            </li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p4.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor</p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li class=\"odd\"><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p2.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor </p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p3.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor</p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_bottom\">\n");
      out.write("                                                    <a href=\"#\">See all messages</a>\n");
      out.write("                                                </div> \n");
      out.write("                                            </li>\n");
      out.write("                                        </ul>\n");
      out.write("                                    </li>\n");
      out.write("                                    <li class=\"dropdown head-dpdn\">\n");
      out.write("                                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\"><i class=\"fa fa-bell\"></i><span class=\"badge blue\">3</span></a>\n");
      out.write("                                        <ul class=\"dropdown-menu\">\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_header\">\n");
      out.write("                                                    <h3>You have 3 new notification</h3>\n");
      out.write("                                                </div>\n");
      out.write("                                            </li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p5.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor</p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li class=\"odd\"><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p6.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor</p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"user_img\"><img src=\"images/p7.png\" alt=\"\"></div>\n");
      out.write("                                                    <div class=\"notification_desc\">\n");
      out.write("                                                        <p>Lorem ipsum dolor</p>\n");
      out.write("                                                        <p><span>1 hour ago</span></p>\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"clearfix\"></div>\t\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_bottom\">\n");
      out.write("                                                    <a href=\"#\">See all notifications</a>\n");
      out.write("                                                </div> \n");
      out.write("                                            </li>\n");
      out.write("                                        </ul>\n");
      out.write("                                    </li>\t\n");
      out.write("                                    <li class=\"dropdown head-dpdn\">\n");
      out.write("                                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\"><i class=\"fa fa-tasks\"></i><span class=\"badge blue1\">9</span></a>\n");
      out.write("                                        <ul class=\"dropdown-menu\">\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_header\">\n");
      out.write("                                                    <h3>You have 8 pending task</h3>\n");
      out.write("                                                </div>\n");
      out.write("                                            </li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"task-info\">\n");
      out.write("                                                        <span class=\"task-desc\">Database update</span><span class=\"percentage\">40%</span>\n");
      out.write("                                                        <div class=\"clearfix\"></div>\t\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"progress progress-striped active\">\n");
      out.write("                                                        <div class=\"bar yellow\" style=\"width:40%;\"></div>\n");
      out.write("                                                    </div>\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"task-info\">\n");
      out.write("                                                        <span class=\"task-desc\">Dashboard done</span><span class=\"percentage\">90%</span>\n");
      out.write("                                                        <div class=\"clearfix\"></div>\t\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"progress progress-striped active\">\n");
      out.write("                                                        <div class=\"bar green\" style=\"width:90%;\"></div>\n");
      out.write("                                                    </div>\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"task-info\">\n");
      out.write("                                                        <span class=\"task-desc\">Mobile App</span><span class=\"percentage\">33%</span>\n");
      out.write("                                                        <div class=\"clearfix\"></div>\t\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"progress progress-striped active\">\n");
      out.write("                                                        <div class=\"bar red\" style=\"width: 33%;\"></div>\n");
      out.write("                                                    </div>\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li><a href=\"#\">\n");
      out.write("                                                    <div class=\"task-info\">\n");
      out.write("                                                        <span class=\"task-desc\">Issues fixed</span><span class=\"percentage\">80%</span>\n");
      out.write("                                                        <div class=\"clearfix\"></div>\t\n");
      out.write("                                                    </div>\n");
      out.write("                                                    <div class=\"progress progress-striped active\">\n");
      out.write("                                                        <div class=\"bar  blue\" style=\"width: 80%;\"></div>\n");
      out.write("                                                    </div>\n");
      out.write("                                                </a></li>\n");
      out.write("                                            <li>\n");
      out.write("                                                <div class=\"notification_bottom\">\n");
      out.write("                                                    <a href=\"#\">See all pending tasks</a>\n");
      out.write("                                                </div> \n");
      out.write("                                            </li>\n");
      out.write("                                        </ul>\n");
      out.write("                                    </li>\t\n");
      out.write("                                </ul>\n");
      out.write("                                <div class=\"clearfix\"> </div>\n");
      out.write("                            </div>\n");
      out.write("                            <!--notification menu end -->\n");
      out.write("                            <div class=\"profile_details\">\t\t\n");
      out.write("                                <ul>\n");
      out.write("                                    <li class=\"dropdown profile_details_drop\">\n");
      out.write("                                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n");
      out.write("                                            <div class=\"profile_img\">\n");
      out.write("                                                <style>\n");
      out.write("                                                                img {\n");
      out.write("                                                                 border-radius: 50%;\n");
      out.write("                                                                    }\n");
      out.write("                                                </style>\n");
      out.write("                                                <span class=\"prfil-img\"><img src=\"https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png\" alt=\"\" width=\"40\" height=\"40\"> </span> \n");
      out.write("                                                <div class=\"user-name\">\n");
      out.write("                                                    <p style=\"color:#23297F;\">Admin</p>\n");
      out.write("                                                    <span>Administrator</span>\n");
      out.write("                                                </div>\n");
      out.write("                                                <i class=\"fa fa-angle-down lnr\"></i>\n");
      out.write("                                                <i class=\"fa fa-angle-up lnr\"></i>\n");
      out.write("                                                <div class=\"clearfix\"></div>\t\n");
      out.write("                                            </div>\t\n");
      out.write("                                        </a>\n");
      out.write("                                        <ul class=\"dropdown-menu drp-mnu\">\n");
      out.write("                                            <li> <a href=\"#\"><i class=\"fa fa-cog\"></i> Settings</a> </li> \n");
      out.write("                                            <li> <a href=\"#\"><i class=\"fa fa-user\"></i> Profile</a> </li> \n");
      out.write("                                            <li> <a href=\"#\"><i class=\"fa fa-sign-out\"></i> Logout</a> </li>\n");
      out.write("                                        </ul>\n");
      out.write("                                    </li>\n");
      out.write("                                </ul>\n");
      out.write("                            </div>\n");
      out.write("                            <div class=\"clearfix\"> </div>\t\t\t\t\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"clearfix\"> </div>\t\n");
      out.write("                    </div>\n");
      out.write("                    <!--heder end here-->\n");
      out.write("                    <!-- script-for sticky-nav -->\n");
      out.write("                    <script>\n");
      out.write("                        $(document).ready(function () {\n");
      out.write("                            var navoffeset = $(\".header-main\").offset().top;\n");
      out.write("                            $(window).scroll(function () {\n");
      out.write("                                var scrollpos = $(window).scrollTop();\n");
      out.write("                                if (scrollpos >= navoffeset) {\n");
      out.write("                                    $(\".header-main\").addClass(\"fixed\");\n");
      out.write("                                } else {\n");
      out.write("                                    $(\".header-main\").removeClass(\"fixed\");\n");
      out.write("                                }\n");
      out.write("                            });\n");
      out.write("\n");
      out.write("                        });\n");
      out.write("                    </script>\n");
      out.write("\n");
      out.write("        ");

            if (request.getParameter("ProductDel") != null) {
                String ProductDel = request.getParameter("ProductDel");
                String sql = "delete from product where id =" + ProductDel;
                int srpdel = food.DataUtility.executeDML(sql);
            }

            if (request.getParameter("productname") != null) {
                String productname = request.getParameter("productname");
                String pid = request.getParameter("pid");
                String catid = request.getParameter("catid");
                String subcatid = request.getParameter("subcatid");
                String productprice = request.getParameter("productprice");
                String rentprice = request.getParameter("rentprice");
                String productdesc = request.getParameter("productdesc");
                String img1 = request.getParameter("img1");
                String img2 = request.getParameter("img2");
                String retailerid = request.getParameter("retailerid");
                String sql = "UPDATE product SET product_name='" + productname + "',product_price='" + productprice + "',product_desc='" + productdesc + "',catid='" + catid + "',subcatid='" + subcatid + "',img1='" + img1 + "',img2='" + img2 + "',retailerid='" + retailerid + "' WHERE id=" + pid;

                int rep = food.DataUtility.executeDML(sql);
            }
        
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("        ");

            if (request.getParameter("ProductEdit") != null) {
                String ProductEdit = request.getParameter("ProductEdit");
                ResultSet rsp = food.DataUtility.executeDQL("SELECT * FROM product WHERE id=" + ProductEdit);
                if (rsp.next()) {
        
      out.write(" \n");
      out.write("        <div class=\"inner-block\" style=\"height: 630px\">\n");
      out.write("            <div class=\"cols-grids panel-widget\">\n");
      out.write("                <h2>Product Edit</h2>\n");
      out.write("                <form method=\"post\"  action=\"ProductEdit.jsp\" >               \n");
      out.write("                    <div class=\"row mb40\">\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <label>Shop Name</label>\n");
      out.write("                            <select name=\"retailerid\" class=\"form-control\" onclick=\"getSubCat(this.value)\">\n");
      out.write("                                <option>Choose Shop Name</option>\n");
      out.write("\n");
      out.write("                                ");

                                    ResultSet rsr = food.DataUtility.executeDQL("SELECT * FROM retailer ORDER BY shop_name");

                                    while (rsr.next()) {

                                
      out.write("\n");
      out.write("                                <option selected=\"true\" value=\"");
 out.print(rsr.getString(1)); 
      out.write('"');
      out.write('>');
 out.print(rsr.getString(2)); 
      out.write("</option>\n");
      out.write("\n");
      out.write("\n");
      out.write("                                ");


                                    }
                                
      out.write("\n");
      out.write("                            </select>\n");
      out.write("                        </div> \n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <label>Category Name</label>\n");
      out.write("                            <select name=\"catid\" class=\"form-control\" onclick=\"getSubCat(this.value)\">\n");
      out.write("                                <option>Choose Category Name</option>\n");
      out.write("\n");
      out.write("                                ");

                                    ResultSet rsc = food.DataUtility.executeDQL("SELECT * FROM category ORDER BY category_name");

                                    while (rsc.next()) {

                                
      out.write("\n");
      out.write("                                <option selected=\"true\" value=\"");
 out.print(rsc.getString(1)); 
      out.write('"');
      out.write('>');
 out.print(rsc.getString(2)); 
      out.write("</option>\n");
      out.write("\n");
      out.write("\n");
      out.write("                                ");


                                    }
                                
      out.write("\n");
      out.write("                            </select>\n");
      out.write("                        </div> \n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <label>Sub Category Name</label>\n");
      out.write("                            <select name=\"subcatid\" id=\"subcatidsel\" class=\"form-control\">\n");
      out.write("\n");
      out.write("                            </select>\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <lable>Product Name</lable><br>\n");
      out.write("                            <input type=\"text\" placeholder=\"Enter Product Name\" class=\"cat-input\" name=\"productname\" required=\"\">\n");
      out.write("                            <input type=\"hidden\" value=\"");
      out.print( rsp.getString("id"));
      out.write("\" name=\"pid\" />\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <lable>Product Price</lable><br>\n");
      out.write("                            <input type=\"text\" placeholder=\"Enter Product Price\" class=\"cat-input\" name=\"productprice\" required=\"\">\n");
      out.write("                        </div>\n");
      out.write("                         <div class=\"col-md-6 form-group\">\n");
      out.write("                        <label>Rent Price</label>\n");
      out.write("                        <input type=\"text\" placeholder=\"Enter Rented Price\" class=\"cat-input\" name=\"rentprice\" required=\"\">\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <lable>Image 1</lable><br>\n");
      out.write("                            <input type=\"file\" placeholder=\"Enter Image 1\" class=\"cat-input\" name=\"img1\" required=\"\">\n");
      out.write("                        </div>\n");
      out.write("                        <div class=\"col-md-6\">\n");
      out.write("                            <lable>Image 2</lable><br>\n");
      out.write("                            <input type=\"file\" placeholder=\"Enter Image 2\" class=\"cat-input\" name=\"img2\" required=\"\">\n");
      out.write("                        </div>\n");
      out.write("                    </div>\n");
      out.write("                    <div class=\"row mb40\">\n");
      out.write("                        <div class=\"col-md-12\">\n");
      out.write("                            <lable>Product Description</lable><br>\n");
      out.write("                            <textarea type=\"text\" value=\"description\" name=\"productdesc\" required=\"\" placeholder=\"Enter Description\">\n");
      out.write("                                   \n");
      out.write("                            </textarea>\n");
      out.write("                        </div>\n");
      out.write("\n");
      out.write("                    </div> \n");
      out.write("                    <div class=\"col-lg-12\">\n");
      out.write("                        <button type=\"submit\" class=\"btn btn-success\">Submit</button>\n");
      out.write("                    </div>\n");
      out.write("\n");
      out.write("                </form>\n");
      out.write("            </div>\t\n");
      out.write("        </div>\n");
      out.write("\n");
      out.write("        ");

                }
            }
        
      out.write("\n");
      out.write("\n");
      out.write("        <div class=\"inner-block\" style=\"height: 630px\">\n");
      out.write("            <div class=\"cols-grids panel-widget\">\n");
      out.write("                <h2>Product Edit</h2>  \n");
      out.write("                <div class=\"form-group col-lg-12 \">\n");
      out.write("                    <table class=\"data table table-bordered table-striped\">\n");
      out.write("                        <tr>\n");
      out.write("                            <th>S.NO</th>\n");
      out.write("                            <th>Category Id</th>\n");
      out.write("                            <th>Sub Category Id</th>\n");
      out.write("                            <th>Retailer Id</th>\n");
      out.write("                            <th>Product Name</th>\n");
      out.write("                            <th>Product Price</th>\n");
      out.write("                            <th>Product Description</th>\n");
      out.write("                            <th>Image 1</th>\n");
      out.write("                            <th>Image 2</th>\n");
      out.write("                            <th>Action</th>\n");
      out.write("                        </tr>\n");
      out.write("                        ");

                            ResultSet rs = food.DataUtility.executeDQL("SELECT * FROM product ORDER BY id");
                            while (rs.next()) {
                        
      out.write("\n");
      out.write("                        <tr>\n");
      out.write("                            <td>");
      out.print( rs.getString("id"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("catid"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("subcatid"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("retailerid"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("product_name"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("product_price"));
      out.write("</td>\n");
      out.write("                            <td>");
      out.print( rs.getString("product_desc"));
      out.write("</td>\n");
      out.write("                            <td>\n");
      out.write("                                ");

    String imagePath = request.getContextPath() + "/images/" + rs.getString("img1");
      
      out.write("\n");
      out.write("                                <img src=\"");
      out.print( imagePath );
      out.write("\" alt=\"Image 1\" width=\"100\" height=\"100\" />\n");
      out.write("                            </td>\n");
      out.write("                            <td>\n");
      out.write("                                <img src=\"");
      out.print( imagePath );
      out.write("\" alt=\"Image 2\" width=\"100\" height=\"100\" />\n");
      out.write("                            </td>\n");
      out.write("\n");
      out.write("                            <td>\n");
      out.write("                                <a href=\"ProductEdit.jsp?ProductEdit=");
 out.print(rs.getString("id")); 
      out.write("\" class=\"btn btn-warning\">Edit</a>\n");
      out.write("                                <a href=\"ProductEdit.jsp?ProductDel=");
 out.print(rs.getString("id")); 
      out.write("\" class=\"btn btn-danger\">Delete</a>\n");
      out.write("                            </td>\n");
      out.write("                        </tr>\n");
      out.write("                        ");

                            }
                        
      out.write("\n");
      out.write("                    </table>\n");
      out.write("                </div>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"clearfix\"></div>\n");
      out.write("        </div>\n");
      out.write("        <!--inner block end here-->\n");
      out.write("        <!--copy rights start here-->\n");
      out.write("        ");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("   <div class=\"copyrights\">\n");
      out.write("                    <p>© 2024 Saathi. All Rights Reserved | Design by  <a href=\"http://w3layouts.com/\" target=\"_blank\">W3layouts</a> </p>\n");
      out.write("                </div>\t\n");
      out.write("\n");
      out.write("        <!--COPY rights end here-->\n");
      out.write("    </div>\n");
      out.write("</div>\n");
      out.write("<!--slider menu-->\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<div class=\"sidebar-menu\">\n");
      out.write("    <div class=\"logo\"> <a href=\"#\" class=\"sidebar-icon\"> <span class=\"fa fa-bars\"></span> </a> <a href=\"#\"> <span id=\"logo\" ></span> \n");
      out.write("        </a> </div>\t\t  \n");
      out.write("    <div class=\"menu\">\n");
      out.write("        <ul id=\"menu\" >\n");
      out.write("            <li id=\"menu-home\" ><a href=\"index.html\"><i class=\"fa fa-tachometer\"></i><span>Dashboard</span></a></li>\n");
      out.write("            <li><a href=\"#\"><i class=\"fa fa-bars\"></i><span>Category</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul>\n");
      out.write("                    <li><a href=\"category.jsp\">Add</a></li>\n");
      out.write("                    <li><a href=\"category_edit.jsp\">Edit</a></li>\t\t            \n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("            <li id=\"menu-comunicacao\" ><a href=\"#\"><i class=\"fa fa-book nav_icon\"></i><span>Sub Category</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul id=\"menu-comunicacao-sub\" >\n");
      out.write("                    <li id=\"menu-mensagens\" style=\"width: 120px\" ><a href=\"subcat.jsp\">Add</a>\t\t              \n");
      out.write("                    </li>\n");
      out.write("                    <li id=\"menu-arquivos\" ><a href=\"subcatedit.jsp\">Edit</a></li>\n");
      out.write("\n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("            <li id=\"menu-academico\" ><a href=\"#\"><i class=\"fa fa-file-text\"></i><span>Products</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul id=\"menu-academico-sub\" >\n");
      out.write("                    <li id=\"menu-academico-boletim\" ><a href=\"ProductAdd.jsp\">Add</a></li>\n");
      out.write("                    <li id=\"menu-academico-avaliacoes\" ><a href=\"ProductEdit.jsp\">Edit</a></li>\t\t           \n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("\n");
      out.write("            <li><a href=\"charts.html\"><i class=\"fa fa-bar-chart\"></i><span>Charts</span></a></li>\n");
      out.write("            <li><a href=\"#\"><i class=\"fa fa-envelope\"></i><span>Mailbox</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul id=\"menu-academico-sub\" >\n");
      out.write("                    <li id=\"menu-academico-avaliacoes\" ><a href=\"inbox.html\">Inbox</a></li>\n");
      out.write("                    <li id=\"menu-academico-boletim\" ><a href=\"inbox-details.html\">Compose email</a></li>\n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("            <li><a href=\"#\"><i class=\"fa fa-cog\"></i><span>System</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul id=\"menu-academico-sub\" >\n");
      out.write("                    <li id=\"menu-academico-avaliacoes\" ><a href=\"404.html\">404</a></li>\n");
      out.write("                    <li id=\"menu-academico-boletim\" ><a href=\"blank.html\">Blank</a></li>\n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("            <li><a href=\"#\"><i class=\"fa fa-shopping-cart\"></i><span>E-Commerce</span><span class=\"fa fa-angle-right\" style=\"float: right\"></span></a>\n");
      out.write("                <ul id=\"menu-academico-sub\" >\n");
      out.write("                    <li id=\"menu-academico-avaliacoes\" ><a href=\"product.html\">Product</a></li>\n");
      out.write("                    <li id=\"menu-academico-boletim\" ><a href=\"price.html\">Price</a></li>\n");
      out.write("                </ul>\n");
      out.write("            </li>\n");
      out.write("        </ul>\n");
      out.write("    </div>\n");
      out.write("</div>\n");
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
      out.write("\n");
      out.write("<div class=\"clearfix\"></div>\n");
      out.write("</div>\n");
      out.write("<!--slide bar menu end here-->\n");
      out.write("<script>\n");
      out.write("    var toggle = true;\n");
      out.write("\n");
      out.write("    $(\".sidebar-icon\").click(function () {\n");
      out.write("        if (toggle) {\n");
      out.write("            $(\".page-container\").addClass(\"sidebar-collapsed\").removeClass(\"sidebar-collapsed-back\");\n");
      out.write("            $(\"#menu span\").css({\"position\": \"absolute\"});\n");
      out.write("        } else {\n");
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
      out.write("<script>\n");
      out.write("    function getSubCat(id) {\n");
      out.write("\n");
      out.write("\n");
      out.write("        $(\"#subcatidsel\").html('<option>Loading...</option>');\n");
      out.write("        $.ajax({\n");
      out.write("            type: \"GET\",\n");
      out.write("            url: \"getSubCatByCatId.jsp\",\n");
      out.write("            data: {catid: id},\n");
      out.write("            success: function (data) {\n");
      out.write("                $(\"#subcatidsel\").html(data);\n");
      out.write("            },\n");
      out.write("            error: function (xhr, status, error) {\n");
      out.write("                console.error(\"AJAX Error:\", status, error);\n");
      out.write("                $(\"#subcatidsel\").html('<option value=\"\">Failed to load subcategories</option>');\n");
      out.write("            }\n");
      out.write("        });\n");
      out.write("    }\n");
      out.write("</script>\n");
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
