from diagrams import Diagram
from diagrams.onprem.client import User
from diagrams.onprem.compute import Server
from diagrams.onprem.database import MySQL
from diagrams.onprem.inmemory import Redis
from diagrams.onprem.network import Nginx


# Create the flowchart
with Diagram("ChatBot for National Consumer Helpline", show=True):
    # Users
    user = User("User")
    admin = User("Admin")
    employee = User("Employee")
    
    # Web Application
    web_app = Server("Flask App")
    web_server = Nginx("Web Server")
    
    # Databases
    mysql_db = MySQL("MySQL Database")
    redis_cache = Redis("Session Cache")

    # Email Service
    email_service = Server("SMTP (Flask-Mail)")

    # Flow Connections
    user >> web_server >> web_app
    admin >> web_server >> web_app
    employee >> web_server >> web_app

    web_app >> mysql_db
    web_app >> redis_cache
    web_app >> email_service
