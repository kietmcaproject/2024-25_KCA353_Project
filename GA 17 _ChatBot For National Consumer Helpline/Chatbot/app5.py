from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import mysql.connector
import os
from dotenv import load_dotenv
from contextlib import contextmanager
from functools import wraps
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Ensure required environment variables are set
required_env_vars = ['SECRET_KEY', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'SECURITY_PASSWORD_SALT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
    raise ValueError("Missing environment variables!")

app.secret_key = os.getenv('SECRET_KEY')

# Configure Flask-Mail
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.getenv('MAIL_USERNAME')
)

mail = Mail(app)

# Set session lifetime for 30 minutes
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=5)

# Database Connection Helper
@contextmanager
def get_db_cursor():
    db = None
    cursor = None
    try:
        db = mysql.connector.connect(
            host="localhost",
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        cursor = db.cursor(dictionary=True)
        yield db, cursor
    except mysql.connector.Error as err:
        logger.error(f"Database connection error: {err}")
        raise
    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

# Role-Based Access Control
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'username' not in session:
                flash("Please log in first.", "error")
                return redirect(url_for('login'))
            if session.get('role') != role:
                flash("You do not have permission to access this page.", "error")
                return redirect(url_for('home'))
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Fetch employee details
def get_employee(username):
    with get_db_cursor() as (db, cursor):
        cursor.execute("SELECT * FROM employees WHERE username=%s", (username,))
        employee = cursor.fetchone()
        return employee if employee else None

# Fetch employee tasks from database
def get_employee_tasks(username):
    with get_db_cursor() as (db, cursor):
        cursor.execute("SELECT * FROM tasks WHERE assigned_to=%s", (username,))
        tasks = cursor.fetchall()
        return tasks if tasks else []

# Routes for user, admin, and employee dashboards
@app.route('/user_dashboard')
def user_dashboard():
    return render_template('user_dashboard.html')


@app.route('/admin_dashboard')
@role_required('admin')  # Ensure only admins can access
def admin_dashboard():
    try:
        with get_db_cursor() as (db, cursor):
            # Get total users count
            cursor.execute("SELECT COUNT(*) as total FROM users")
            total_users = cursor.fetchone()['total']
            
            # Get recent activity (last 5 signup/updates)
            cursor.execute("""
                SELECT id, username, full_name, role, created_at 
                FROM users 
                ORDER BY created_at DESC 
                LIMIT 5
            """)
            recent_users = cursor.fetchall()
            
            return render_template('admin_dashboard.html', 
                                 total_users=total_users,
                                 recent_users=recent_users)
    except Exception as e:
        logger.error(f"Error fetching admin dashboard data: {e}")
        flash("Error loading dashboard data", "error")
        return redirect(url_for('home'))
    

    

@app.route('/employee_dashboard')
@role_required('employee')  # Only employees can access this page
def employee_dashboard():
    # Get employee info from session
    employee = {
        'full_name': session.get('full_name', ''),
        'username': session.get('username', ''),
        'role': session.get('role', '')
    }
    return render_template('employee_dashboard.html', employee=employee)

# Home Route with Dynamic Role-Based Redirection
@app.route('/')
def home():
    if 'username' in session:
        role = session.get('role')
        logger.debug(f"Session found for {session['username']} with role {role}")
        if role in ['user', 'admin', 'employee']:  # Ensure the role is valid
            return redirect(url_for(f"{role.lower()}_dashboard"))
        else:
            flash("Invalid role assigned.", "error")
            return redirect(url_for('logout'))
    else:
        logger.debug("No session found, redirecting to login")
        return redirect(url_for('login'))

# Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if not username or not password:
            flash("Please enter both username and password", "error")
            return redirect(url_for('login'))

        try:
            with get_db_cursor() as (db, cursor):
                cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
                user = cursor.fetchone()

                if user and check_password_hash(user['password'], password):
                    # Store the user info in session
                    session['username'] = user['username']
                    session['role'] = user['role']
                    session['full_name'] = user['full_name']  # Store full_name to use in templates
                    session.permanent = True  # Ensure session stays persistent (configuring permanent sessions)

                    flash(f"Welcome back, {user['full_name']}!", "success")

                    # Redirect based on the user's role
                    if user['role'] == 'employee':
                        return redirect(url_for('employee_dashboard'))  # Direct employee to their dashboard
                    elif user['role'] == 'admin':
                        return redirect(url_for('admin_dashboard'))  # Direct admin to their dashboard
                    elif user['role'] == 'user':
                        return redirect(url_for('user_dashboard'))  # Direct regular user to their dashboard
                    else:
                        flash("Invalid role", "error")
                        return redirect(url_for('logout'))
                else:
                    flash("Invalid username or password", "error")
                    logger.error("Invalid login attempt for username: %s", username)

        except mysql.connector.Error as e:
            logger.error(f"Login error - Database error: {e}")
            flash("An error occurred during login", "error")
        except Exception as e:
            logger.error(f"Login error: {e}")
            flash("An unexpected error occurred during login", "error")

    return render_template('login.html')

# Signup Route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Get form data
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        full_name = request.form.get('full_name')
        role = request.form.get('role')  # User can choose role: 'user', 'admin', 'employee'

        # Validate form data
        if not username or not email or not password or not confirm_password or not full_name or not role:
            flash("All fields are required.", "error")
            return redirect(url_for('signup'))

        if password != confirm_password:
            flash("Passwords do not match.", "error")
            return redirect(url_for('signup'))

        try:
            # Check if the username or email already exists in the database
            with get_db_cursor() as (db, cursor):
                cursor.execute("SELECT * FROM users WHERE username=%s OR email=%s", (username, email))
                existing_user = cursor.fetchone()
                if existing_user:
                    flash("Username or email already exists.", "error")
                    return redirect(url_for('signup'))

                # Hash the password before storing it
                hashed_password = generate_password_hash(password)

                # Insert new user into the database
                cursor.execute(
                    "INSERT INTO users (username, email, password, full_name, role) VALUES (%s, %s, %s, %s, %s)",
                    (username, email, hashed_password, full_name, role)
                )
                db.commit()

                flash("Account created successfully! Please log in.", "success")
                return redirect(url_for('login'))

        except mysql.connector.Error as e:
            logger.error(f"Database error: {e}")
            flash("An error occurred while creating your account. Please try again.", "error")
        except Exception as e:
            logger.error(f"Error during signup: {e}")
            flash("An unexpected error occurred. Please try again.", "error")

    return render_template('signup.html')

# Logout Route
@app.route('/logout')
def logout():
    session.clear()  # Clear all session data
    flash("You have been logged out.", "info")
    return redirect(url_for('login'))

# Forgot Password Route
@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        if not email:
            flash("Please enter your email", "error")
            return redirect(url_for('forgot_password'))
        try:
            with get_db_cursor() as (db, cursor):
                cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
                user = cursor.fetchone()
                if user:
                    # Generate a password reset token
                    serializer = URLSafeTimedSerializer(app.secret_key)
                    token = serializer.dumps(email, salt=os.getenv('SECURITY_PASSWORD_SALT'))
                    reset_url = url_for('reset_password', token=token, _external=True)

                    # Send the reset link via email
                    msg = Message("Password Reset Request", recipients=[email])
                    msg.body = f"Click the following link to reset your password: {reset_url}"
                    mail.send(msg)

                    flash("A password reset link has been sent to your email.", "info")
                else:
                    flash("Email not found.", "error")

        except mysql.connector.Error as e:
            logger.error(f"Database error: {e}")
            flash("An error occurred while processing your request.", "error")
        except Exception as e:
            logger.error(f"Error during password reset request: {e}")
            flash("An unexpected error occurred.", "error")

    return render_template('forgot_password.html')

# Password Reset Route
@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    try:
        # Verify the token
        serializer = URLSafeTimedSerializer(app.secret_key)
        email = serializer.loads(token, salt=os.getenv('SECURITY_PASSWORD_SALT'), max_age=3600)
    except SignatureExpired:
        flash("The password reset link has expired.", "error")
        return redirect(url_for('forgot_password'))
    except Exception as e:
        flash("Invalid or expired token.", "error")
        return redirect(url_for('forgot_password'))

    if request.method == 'POST':
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')

        if new_password != confirm_password:
            flash("Passwords do not match.", "error")
            return redirect(url_for('reset_password', token=token))

        try:
            with get_db_cursor() as (db, cursor):
                # Update the user's password in the database
                hashed_password = generate_password_hash(new_password)
                cursor.execute("UPDATE users SET password=%s WHERE email=%s", (hashed_password, email))
                db.commit()

                flash("Your password has been updated successfully.", "success")
                return redirect(url_for('login'))

        except mysql.connector.Error as e:
            logger.error(f"Database error: {e}")
            flash("An error occurred while resetting your password.", "error")
        except Exception as e:
            logger.error(f"Error during password reset: {e}")
            flash("An unexpected error occurred.", "error")

    return render_template('reset_password.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)