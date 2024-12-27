from flask import Flask, render_template, request, jsonify
import subprocess
import os
from assistant import takeCommand  # Replace with the specific function name you want to use from assistant.py

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/start-voice', methods=['POST'])
def start_voice_assistant():
    try:
        # Use subprocess to start the voice assistant from assistant.py
        subprocess.Popen(['python', os.path.join(os.getcwd(), 'assistant.py')])
        return jsonify({'message': 'Voice Assistant Started!'})
    except Exception as e:
        return jsonify({'message': f'Failed to start Voice Assistant: {e}'}), 500

@app.route('/send-email', methods=['POST'])
def send_email_route():
    from assistant import send_email  # Import send_email function from assistant.py
    data = request.json
    subject = data.get('subject', '')
    body = data.get('body', '')
    to_emails = data.get('to_emails', [])
    
    if not (subject and body and to_emails):
        return jsonify({'message': 'Missing subject, body, or recipient emails.'}), 400
    
    try:
        send_email(subject, body, to_emails)
        return jsonify({'message': 'Email sent successfully!'})
    except Exception as e:
        return jsonify({'message': f'Failed to send email: {e}'}), 500

if __name__ == "__main__":
    app.run(debug=True)



