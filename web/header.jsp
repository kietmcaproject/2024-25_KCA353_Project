<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%> 
<%@page import="java.sql.SQLException"%>
<%@page import="java.util.logging.Logger"%>
<%@page import="java.util.logging.Level"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Saathi</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
        <link href="css/font-awesome.css" rel="stylesheet" type="text/css" media="all" /> 
        <script src="js/jquery-1.11.1.min.js"></script>
        <!-- Include jQuery -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

        <!-- Include Bootstrap JS -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <style>

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background-color: white; /* White background */
                border-bottom: 2px solid #ddd; /* Light border */
            }
            .header-logo img {
                height: 100px; /* Adjust height as needed */
                width: auto; /* Maintain aspect ratio */
            }

            .header-search {
                flex: 1;
                text-align: center;
            }
            .header-search input[type="text"] {
                width: 60%;
                padding: 10px;
                border: 2px solid #585AB3; /* Green border */
                border-radius: 5px 0 0 5px;
            }
            .header-search input[type="submit"] {
                padding: 10px 20px;
                background-color: #585AB3;
                color: white;
                border: none;
                border-radius: 0 5px 5px 0;
            }
            .header-links {
                flex: 1;
                text-align: right;
            }
            .header-links a {
                color: #333;
                margin-left: 20px;
                text-decoration: none;
                font-weight: bold; /* Bold links */
            }

            /* General styling for the hero section */
            .hero-section {
                text-align: center;
                padding: 100px 20px;
                background-color: #fff;
            }

            /* Styling for the title */
            .hero-section h1 {
                font-size: 3rem;
                color: #1a1a1a; /* Darker shade of text */
                margin-bottom: 20px;
                font-family: 'Arial', sans-serif;
            }

            /* Styling for the paragraph */
            .hero-section p {
                font-size: 1.25rem;
                color: #555; /* Lighter grey for the text */
                margin-bottom: 30px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
                line-height: 1.6;
            }

            /* Default margin for larger screens */
            .hero-section {
                margin-left: 400px;
            }

            /* Adjust margin on medium screens */
            @media (max-width: 992px) {
                .hero-section {
                    margin-left: 200px;
                }
            }

            /* Adjust margin on small screens */
            @media (max-width: 768px) {
                .hero-section {
                    margin-left: 100px;
                }
            }

            /* Center on extra small screens */
            @media (max-width: 576px) {
                .hero-section {
                    margin-left: 0;
                    text-align: center; /* Center-align content for small screens */
                }
            }
            /* Container for buttons */
            .button-container {
                display: flex;
                justify-content: center;
                gap: 20px;
            }

            /* Styling for buttons */
            .btn {
                padding: 12px 30px;
                font-size: 1.1rem;
                border-radius: 5px;
                text-decoration: none;
                transition: background-color 0.3s ease;
                border: 2px solid transparent;
            }

            /* Rent Button Styling */
            .rent-btn {
                background-color: #23297F; /* Green */
                color: white;
            }

            .rent-btn:hover {
                background-color: #23297F; /* Darker green on hover */
            }

            /* Buy Button Styling */
            .buy-btn {
                background-color: transparent;
                color: #23297F;
                border: 2px solid #23297F;
            }

            .buy-btn:hover {
                background-color: #23297F;
                color: white;
            }
            .main-container {
                display: flex;
                justify-content: space-between; 
                align-items: flex-start; 
                margin: 0 20px; 
                margin-bottom: 50px;

            }

            /* Left Side: Navbar */
            .left-side {
                width: 1000px;  /* Adjust this width based on your content's need */
            }

            /* Right Side: Hero Section */
            .right-side {
                width: 6000px;  
                margin-top: 50px;
            }

            /* Hero Section */
            .hero-section {
                text-align: left;
                padding: 20px;
            }

            /* Optional: Navbar style adjustments */
            .navbar-nav {
                padding-left: 0;
                list-style: none;
            }

            .navbar-nav li {
                margin-bottom: 10px;
            }

            /* Media query for responsiveness */
            @media (max-width: 768px) {
                .main-container {
                    flex-direction: column;  /* Stack elements vertically */
                }

                .left-side, .right-side {
                    width: 100%;  /* Full width for both sections */
                    margin-left: 0; /* Remove margin */
                }
            }

        </style>
    </head>
    <body>
        <!-- Header Section -->
        <header class="header">
            <div class="header-logo">
                <a href="index.jsp">
                    <img src="data:image/png;base64,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" alt="Your Logo">
                </a>
            </div>

            <div class="header-search">
                <form action="#" method="post">
                    <input type="text" name="Product" placeholder="Search for anything...">
                    <input type="submit" value="Search">
                </form>
            </div>

            <div class="header-links">
                <a href="index2.html" class="btn buy-btn" style="font-size: 1.5rem; font-weight: bold;">To Buy</a>
                <a href="userregisterform.jsp" class="btn buy-btn" style="font-size: 1.5rem; font-weight: bold;">To Sell</a>
                <a href="#contact" style="font-size: 1.5rem; font-weight: bold;">Help & Contact</a>
                          </div>
        </header>


        <div class="main-container">
            <!-- Left Side: Navbar with Categories -->
            <div class="left-side">
                <div class="collapse navbar-collapse" id="bs-megadropdown-tabs">
                    <ul class="nav navbar-nav nav_1">
                        <%
                            Logger logger = Logger.getLogger("MyLogger");
                            try {
                                String categoryQuery = "SELECT id, category_name FROM category ORDER BY category_name";
                                ResultSet rsi = food.DataUtility.executeDQL(categoryQuery);

                                if (rsi != null) {
                                    while (rsi.next()) {
                                        int cid = rsi.getInt("id");
                                        String categoryName = rsi.getString("category_name");

                                        // Query to check if there are any subcategories for this category
                                        String subCategoryCheckQuery = "SELECT COUNT(*) AS subcat_count FROM subcat WHERE catid = '" + cid + "'";
                                        ResultSet subcatCheck = food.DataUtility.executeDQL(subCategoryCheckQuery);

                                        if (subcatCheck != null && subcatCheck.next() && subcatCheck.getInt("subcat_count") > 0) {
                        %>
                        <li class="dropdown mega-dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <%= categoryName%> <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
                                <div class="w3ls_vegetables">
                                    <ul>
                                        <%
                                            // Query to get subcategories for the current category
                                            String subCategoryQuery = "SELECT subcat_name, id FROM subcat WHERE catid = '" + cid + "' ORDER BY subcat_name";
                                            ResultSet rssc = food.DataUtility.executeDQL(subCategoryQuery);

                                            // Check if the ResultSet has rows and iterate over them
                                            if (rssc != null) {
                                                while (rssc.next()) {
                                        %>
                                        <li><a href="products.jsp?productid=<%= rssc.getString("id")%>">
                                                <%= rssc.getString("subcat_name")%></a></li>
                                        <hr>
                                        <%
                                                }
                                            } else {
                                                logger.log(Level.WARNING, "No subcategories found for category ID: " + cid);
                                            }
                                        %>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <%
                        } else {
                        %>
                        <li><a href="#"> <%= categoryName%> </a></li>
                            <%
                                            }
                                        }
                                    } else {
                                        logger.log(Level.WARNING, "No categories found.");
                                    }
                                } catch (SQLException e) {
                                    logger.log(Level.SEVERE, "SQL Exception: " + e.getMessage(), e);
                                } catch (Exception e) {
                                    logger.log(Level.SEVERE, "Exception: " + e.getMessage(), e);
                                }
                            %>
                    </ul>
                </div>
            </div>


            <!-- Right Side: Hero Section -->
            <div class="right-side">
                <div class="hero-section">
                    <h1 style="font-size: 4rem; font-weight: bold; font-family: 'Arial', sans-serif;">Rent or Buy Quality Products</h1>
                    <p style="font-size: 1.5rem; line-height: 1.8; font-family: 'Verdana', sans-serif;">
                        Find the perfect solution for your needs by choosing from our wide range of products available for rent or purchase.
                    </p>
                    <div class="button-container">
                        <a href="buyproduct.jsp" class="btn buy-btn" style="font-size: 1.3rem; font-family: 'Tahoma', sans-serif;">Buy Now</a>
                        <a href="rentproduct.jsp" class="btn buy-btn" style="font-size: 1.3rem; font-family: 'Tahoma', sans-serif;">Rent Now</a>
                                </div>
                </div>
            </div>

        </nav>
    </div>


    <div class="clearfix"></div>
</div>

<!-- Your remaining page content goes here -->

</body>
</html>