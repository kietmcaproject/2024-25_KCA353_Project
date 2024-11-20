<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>sidebar</title>
    <style>
        /* General Styling for Sidebar */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .sidebar-menu {
            width: 220px;
            height: 100%;
            background-color: black;
            color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            transition: all 0.3s ease;
            padding-top: 50px;
        }

        .menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .menu li {
            position: relative;
        }

        .menu li a {
            display: block;
            padding: 15px;
            color: #ecf0f1;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            border-bottom: 1px solid #34495e;
            transition: background-color 0.3s ease, padding-left 0.3s ease;
        }

        .menu li a:hover {
            background-color: #3498db;
            padding-left: 25px;
        }

        .submenu {
            display: none;
            background-color: #34495e;
        }

        .submenu li a {
            padding-left: 30px;
        }

        .submenu-icon {
            position: absolute;
            right: 20px;
            top: 18px;
            transition: transform 0.3s ease;
        }

        /* Hover Effects for Sidebar */
        .menu li a:hover .fa {
            transform: rotate(90deg);
        }

        /* Responsive Design: For mobile view */
        @media (max-width: 768px) {
            .sidebar-menu {
                width: 200px;
            }

            .menu li a {
                font-size: 14px;
                padding: 12px;
            }

            .submenu li a {
                padding-left: 25px;
            }

            .menu {
                padding-top: 10px;
            }
        }
    </style>
</head>
<body>

    <div class="sidebar-menu">
        <div class="menu">
            <ul id="menu">
                <li id="menu-home">
                    <a href="../index.jsp"><i class="fa fa-tachometer"></i><span>Dashboard</span></a>
                </li>
                <li>
                    <a href="#" class="submenu-toggle"><i class="fa fa-bars"></i><span>Category</span><i class="fa fa-angle-down submenu-icon"></i></a>
                    <ul class="submenu">
                        <li><a href="category.jsp">Add</a></li>
                        <li><a href="category_edit.jsp">Edit</a></li>		            
                    </ul>
                </li>
                <li>
                    <a href="#" class="submenu-toggle"><i class="fa fa-book nav_icon"></i><span>Sub Category</span><i class="fa fa-angle-down submenu-icon"></i></a>
                    <ul class="submenu">
                        <li><a href="subcat.jsp">Add</a></li>
                        <li><a href="subcatedit.jsp">Edit</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="submenu-toggle"><i class="fa fa-file-text"></i><span>Products</span><i class="fa fa-angle-down submenu-icon"></i></a>
                    <ul class="submenu">
                        <li><a href="ProductAdd.jsp">Add</a></li>
                        <li><a href="ProductEdit.jsp">Edit</a></li>		           
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            // Toggle submenu visibility
            $(".submenu-toggle").click(function () {
                $(this).next(".submenu").slideToggle();
                $(this).find(".submenu-icon").toggleClass("fa-angle-up fa-angle-down");
            });
        });
    </script>

</body>
</html>