<%@page import="java.sql.ResultSet"%> 
<%@page import="java.sql.SQLException"%>
<%@page import="java.util.logging.Logger"%>
<%@page import="java.util.logging.Level"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saathi</title>
    <link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
    <script src="js/jquery.min.js"></script>
    <script defer src="js/jquery.flexslider.js"></script>
    <style>
        banner {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background-color: #8F84D2; /* Green background similar to eBay */
            margin-bottom: 30px;
            color: white;
        }
        .banner .promo {
            text-align: center;
        }
        .promo h3 {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .promo a {
            background-color: #23297F;
            color: #FFFFFF;
            padding: 10px 20px;
            text-transform: uppercase;
            font-weight: bold;
            border-radius: 5px;
            text-decoration: none;
        }
        .banner img {
            width: 300px;
            height: auto;
            object-fit: contain;
            margin-left: 20px; 
            align-content: space-around;    /* Add some spacing */
        }
        /* Search bar styling */
        .search-bar {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        .search-bar input[type="text"] {
            width: 400px;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 5px 0 0 5px;
        }
        .search-bar input[type="submit"] {
            padding: 10px 20px;
            background-color: #32CD32;
            color: white;
            border: none;
            border-radius: 0 5px 5px 0;
        }
        /* Adjust flex for layout */
        .main-content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }
/*        PHOTO KE NEECHE WALI KI CSS*/
        /* CTA Section Wrapper */
.cta-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #fff;
  max-width: 1200px;
  margin: auto;
}

/* Image Styling */
.cta-image img {
  max-width: 100%;
  height: 250px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px; /* Adjust the image size */
}

.vl {
  border-left: 6px solid #23297F ;
  height: 500px;
}

/* Content Area */
.cta-content {
  max-width: 600px;
  padding-left: 30px;
}

/* Headings Styling */
.cta-content h2 {
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 10px;
  font-family: 'Arial', sans-serif;
}

/* Paragraph Styling */
.cta-content p {
  font-size: 1.2rem;
  color: #23297F;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cta-section {
    flex-direction: column;
    text-align: center;
  }

  .cta-image img {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .cta-content {
    padding-left: 0;
  }
}
/*STEPS CSS*/
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #C5B6E0;
    color: #333;
}

.container {
    width: 80%;
    margin: 50px auto;
    background-color: #C5B6E0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.intro {
    text-align: left;
    margin-bottom: 40px;
}

.intro h1 {
    font-size: 24px;
    margin-bottom: 15px;
}

.intro p {
    color: #666;
    margin-bottom: 20px;
}

.main-btn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.main-btn:hover {
    background-color: #0056b3;
}

.steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.step {
    background-color: #e0e7ff;
    padding: 20px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.step h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
}

.step p {
    color: #555;
}

    </style>
</head>
<body>
    <div class="banner">
        <div class="promo">
    <h3 style="font-size: 2.5rem; font-family: 'Georgia', serif; font-weight: bold;">Same tech for less</h3>
    <p style="font-size: 1.25rem; font-family: 'Arial', sans-serif; line-height: 1.6;">Save by shopping refurbished equipment.</p><br>
    <a href="#" style="font-size: 1.5rem; font-family: 'Verdana', sans-serif; color: white; text-decoration: none;">Shop Now</a>
</div>

        <img src="https://th.bing.com/th/id/OIG1.jynrgkUd1NyzYzunGEYf?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" alt="Promo Product">
        <img src="https://th.bing.com/th/id/OIG4.gQgDcJoJmqQlogkhGjCe?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" alt="Promo Product">
        <img src="https://th.bing.com/th/id/OIG1.EOWmeHkYGFO2_HVJXePT?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" alt="Promo Product">
 
    </div>

  
        </nav>
    </div>
<!--        PHOTOS KE NEECHE WALA CODE-->
   <div class="cta-section">
  <div class="cta-image">
    <img src="https://tse1.mm.bing.net/th?id=OIP.T0ez-GxRYgOFTU1b0xeOqQHaE8&pid=Api&P=0&h=180" alt="Product Image" />
  </div>
       
<!--       <h2>Vertical Line</h2>-->
​
      <div class="vl"></div>

<div class="cta-content">
    <h2>Rent or Sell Products</h2>
    <p>List your products for rent or sale, or browse through available items.</p>
    <h2>Variety of Products</h2>
    <p>Wide variety of products available for rent or purchase.</p>
    <h2>Convenient Transactions</h2>
    <p>Easy online transactions for renting and selling products.</p>
  </div>
</div>


    <div class="w3l_banner_nav_right">
        <section class="slider">
            <div class="flexslider">
                <ul class="slides">
                    <li>
                        <div class="w3l_banner_nav_right_banner">
                            <h3>Make your <span>Purchase</span> easy with Us.</h3>
                            <div class="more">
                                <a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="w3l_banner_nav_right_banner1">
                            <h3>Make your <span>Purchase</span> easy with Us.</h3>
                            <div class="more">
                                <a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="w3l_banner_nav_right_banner2">
                            <h3>Budget Friendly</h3>
                            <div class="more">
                                <a href="#" class="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        
        
        
        <!-- flexSlider -->
        <link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
        <script defer src="js/jquery.flexslider.js"></script>
        
        <script>
            function getSubCat(id) {
                $("#subcatidsel").html('<option>Loading...</option>');
                $.ajax({
                    type: "GET",
                    url: "getSubCatByCatId.jsp",
                    data: {catid: id},
                    success: function (data) {
                        $("#subcatidsel").html(data);
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", status, error);
                        $("#subcatidsel").html('<option value="">Failed to load subcategories</option>');
                    }
                });
            }
        </script>
        <!-- //flexSlider -->
    </div>
    <div class="clearfix"></div>
</div>

<!--STEPS-->
    <div class="container">
    <section class="intro">
        <h1 style="font-size: 3rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Discover the Power of Our Products</h1>
        <p style="font-size: 1.25rem; font-family: 'Open Sans', sans-serif; line-height: 1.6;">
            Discover the power of our products designed to meet your needs, whether you're looking to buy or rent. Experience quality, innovation, and convenience all in one place, making your shopping journey seamless and satisfying.
        </p>
        <button class="main-btn" style="font-size: 1.2rem; font-family: 'Roboto', sans-serif;">Main action</button>
    </section>

    <section class="steps">
        <div class="step">
            <h2 style="font-size: 2rem; font-family: 'Poppins', sans-serif; font-weight: bold;">01. Browse our products</h2>
            <p style="font-size: 1.1rem; font-family: 'Open Sans', sans-serif; line-height: 1.6;">Discover a wide range of products available for rent or purchase.</p>
        </div>
        <div class="step">
            <h2 style="font-size: 2rem; font-family: 'Poppins', sans-serif; font-weight: bold;">02. Select your desired item</h2>
            <p style="font-size: 1.1rem; font-family: 'Open Sans', sans-serif; line-height: 1.6;">Choose the product you want to rent or buy from our extensive collection.</p>
        </div>
        <div class="step">
            <h2 style="font-size: 2rem; font-family: 'Poppins', sans-serif; font-weight: bold;">03. Check availability and pricing</h2>
            <p style="font-size: 1.1rem; font-family: 'Open Sans', sans-serif; line-height: 1.6;">Verify the availability of the product on your desired dates and check the pricing details.</p>
        </div>
        <div class="step">
            <h2 style="font-size: 2rem; font-family: 'Poppins', sans-serif; font-weight: bold;">04. Complete your order</h2>
            <p style="font-size: 1.1rem; font-family: 'Open Sans', sans-serif; line-height: 1.6;">Finalize your order by providing the necessary details and payment information.</p>
        </div>
    </section>
</div>

</body>
</html>