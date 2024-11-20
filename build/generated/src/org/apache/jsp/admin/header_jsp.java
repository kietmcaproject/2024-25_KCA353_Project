package org.apache.jsp.admin;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class header_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

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
      out.write("<!DOCTYPE html>\n");
      out.write("   <div class=\"page-container\">\t\n");
      out.write("            <div class=\"left-content\">\n");
      out.write("                <div class=\"mother-grid-inner\">\n");
      out.write("                    <!--header start here-->\n");
      out.write("                    <div class=\"header-main\">\n");
      out.write("                        <div class=\"header-left\">\n");
      out.write("                            <div class=\"logo-name\">\n");
      out.write("                                <a href=\"index.html\"> <h1>Saathi</h1> \n");
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
      out.write("                                            <div class=\"profile_img\">\t\n");
      out.write("                                                <span class=\"prfil-img\"><img src=\"images/p1.png\" alt=\"\"> </span> \n");
      out.write("                                                <div class=\"user-name\">\n");
      out.write("                                                    <p>Admin</p>\n");
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
