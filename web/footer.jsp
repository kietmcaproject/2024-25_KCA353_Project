<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Saathi Footer</title>
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
    <style>
         .newsletter {
            background-color: #585AB3; /* Red background */
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
        }
        .newsletter h4 {
            margin-bottom: 20px;
        }
        .newsletter input[type="email"] {
            padding: 10px;
            width: 250px;
            border: none;
            border-radius: 5px 0 0 5px;
        }
        .newsletter input[type="submit"] {
            padding: 10px 20px;
            background-color: white;
            color: red;
            border: none;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
        }
        .newsletter input[type="submit"]:hover {
            background-color: #ddd; /* Lighter background on hover */
        }
        
        * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

.container {
    width: 80%;
    margin: 50px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
/*FEEBACK CSS*/
.testimonials {
    text-align: center;
    margin-bottom: 40px;
}

.testimonials h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.testimonials p {
    color: #666;
    margin-bottom: 20px;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.testimonial-card {
    background-color: #e0e7ff ;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.testimonial-card img {
    border-radius: 50%;
    margin-bottom: 10px;
}

.testimonial-card h2 {
    font-size: 18px;
    margin-bottom: 5px;
}

.testimonial-card p {
    color: #666;
    margin-bottom: 10px;
}

/*LAST OF footer*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #fff;
    color: #333;
}

.container {
    width: 80%;
    margin: 50px auto;
    background-color: #C5B6E0;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.container2{
    width: 80%;
    margin: 50px auto;
    background-color: #FBF1EB;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}


.contact-section h1 {
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
}

.contact-section p {
    text-align: center;
    margin-bottom: 30px;
    color: #555;
}

.contact-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.contact-card {
    background-color: #585AB3;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
}

.contact-card:hover {
    transform: translateY(-10px);
}

.contact-card .icon {
    background-color: #C5B6E0;
    padding: 15px;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.contact-card h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
}

.contact-card p {
    margin-bottom: 5px;
    color: #FBF1EB;
}

.contact-card a {
    color: red;
    text-decoration: none;
}

.contact-card a:hover {
    text-decoration: underline;
}

/* Footer Section */
.footer {
    margin-top: 50px;
/*    background-color: #C5B6E0;*/
    padding: 30px 0;
/*    border-top: 1px solid #C5B6E0;*/
}

.newsletter {
    text-align: center;
    margin-bottom: 20px;
}

.newsletter input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;
    width: 250px;
}

.newsletter button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.newsletter button:hover {
    background-color: #0056b3;
}

.footer-links {
    display: flex;
    justify-content: space-between;
    text-align: left;
}

.footer-links div {
    width: 30%;
}

.footer-links h3 {
    font-size: 18px;
    margin-bottom: 10px;
}

.footer-links ul {
    list-style-type: none;
}

.footer-links ul li {
    margin-bottom: 8px;
}

.footer-links ul li a {
    text-decoration: none;
    color: #333;
}

.footer-links ul li a:hover {
    color: #007BFF;
}

.social ul {
    display: flex;
    gap: 15px;
}

.social ul li a {
    color: #555;
}

.social ul li a:hover {
    color: #007BFF;
}
    </style>
</head>
<body>

    <!-- Newsletter Signup Section -->
    <div class="newsletter">
    <h4 style="font-size: 2rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Sign up for our newsletter</h4>
            <input type="email" name="email" placeholder="Enter your email" required style="font-size: 1.2rem; font-family: 'Open Sans', sans-serif;">
    <a href="index2.html">
        <input type="submit" value="Subscribe Now" style="font-size: 1.2rem; font-family: 'Open Sans', sans-serif;">
    </a>
</div>

<!-- FEEDBACK PART -->
<div class="container">
    <section class="testimonials">
        <h1 style="font-size: 2.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Testimonials</h1>
        <p style="font-size: 2rem; font-family: 'Open Sans', sans-serif;">We met your expectation. For sure!</p>
        
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <img src="https://via.placeholder.com/50" alt="John Doe">
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">MADHU</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Company ABC</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Condition was good and budget was also according to me.</p>
            </div>
            <div class="testimonial-card">
                <img src="https://via.placeholder.com/50" alt="Jane Smith">
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">HARSHIT SINGH</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">STUDENT</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Great experience renting equipment. Easy process and excellent customer service.</p>
            </div>
            <div class="testimonial-card">
                <img src="https://via.placeholder.com/50" alt="David Johnson">
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">ANSHIKA VERMA</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Content Creator</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Highly recommend this platform for renting and selling products. Very reliable and efficient.</p>
            </div>
            <div class="testimonial-card">
                <img src="https://via.placeholder.com/50" alt="Sarah Lee">
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">ARTI CHAUDHARY</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Travel Blogger</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Impressed with the variety of products available for rent. Made my travel photography much easier.</p>
            </div>
        </div>
    </section>
</div>

<!-- LAST OF FOOTER -->
<div class="container2">
    <section class="contact-section" id="contact">
        <h1 style="font-size: 2.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Contact Us</h1>
        <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Have a question or need assistance? Feel free to reach out to us.</p>
        
        <div class="contact-grid">
            <div class="contact-card">
                <div class="icon">
                    <img src="https://via.placeholder.com/40" alt="Email Icon">
                </div>
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Email</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">For business inquiries or partnerships, please contact our sales team.</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;"><a href="mailto:info@rentandsell.com">info@saathi.com</a></p>
            </div>

            <div class="contact-card">
                <div class="icon">
                    <img src="https://via.placeholder.com/40" alt="Phone Icon">
                </div>
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Phone</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">Follow us on social media for updates and promotions.</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;"><a href="tel:+91-9456254251">+91-9456254251</a></p>
            </div>

            <div class="contact-card">
                <div class="icon">
                    <img src="https://via.placeholder.com/40" alt="Location Icon">
                </div>
                <h2 style="font-size: 1.5rem; font-family: 'Poppins', sans-serif; font-weight: bold;">Office</h2>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">We look forward to hearing from you!</p>
                <p style="font-size: 1.4rem; font-family: 'Open Sans', sans-serif;">kiet college, Ghazibad</p>
            </div>
        </div>
    </section>

    <div class="footer-links">
        <div class="company">
            <h3 style="font-size: 1.8rem; font-family: 'Poppins', sans-serif;">Company</h3>
            <ul>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Home</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Products</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">About Us</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Contact Us</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">FAQs</a></li>
            </ul>
        </div>

        <div class="quick-links">
            <h3 style="font-size: 1.8rem; font-family: 'Poppins', sans-serif;">Quick Links</h3>
            <ul>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Terms of Service</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Privacy Policy</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Renting Guidelines</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Selling Guidelines</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Blog</a></li>
            </ul>
        </div>

        <div class="social">
            <h3 style="font-size: 1.8rem; font-family: 'Poppins', sans-serif;">Follow Us</h3>
            <ul>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Facebook</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Instagram</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">Twitter</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">LinkedIn</a></li>
                <li><a href="#" style="font-family: 'Open Sans', sans-serif; font-size: 1.4rem;">YouTube</a></li>
            </ul>
        </div>
    </div>
</div>

    <!-- Your remaining page content goes here -->

</body>
</html>