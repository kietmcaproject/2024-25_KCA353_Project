import os
import speech_recognition as sr
import pyttsx3
import webbrowser
import datetime
import smtplib

# Initialize the pyttsx3 engine
engine = pyttsx3.init()

def say(text):
    engine.say(text)
    engine.runAndWait()

def takeCommand():
    r = sr.Recognizer()
    attempts = 3
    for _ in range(attempts):
        with sr.Microphone() as source:
            r.adjust_for_ambient_noise(source)
            r.pause_threshold = 0.6
            print("Listening...")
            audio = r.listen(source)
        try:
            query = r.recognize_google(audio, language="en-in")
            print(f"User said: {query}")
            return query
        except sr.UnknownValueError:
            print("Sorry, I didn't get that. Please say it again.")
            say("Sorry, I didn't get that. Please say it again.")
        except sr.RequestError:
            print("Sorry, my speech service is down.")
            say("Sorry, my speech service is down.")
            return "None"
    print("Failed to understand after multiple attempts.")
    say("Failed to understand after multiple attempts.")
    return "None"

def send_email(subject, body, to_emails):
    from_email = "ECHO.vassistant@gmail.com"
    password = os.getenv('EMAIL_PASSWORD')  # Use environment variable for password

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, password)
        message = f'Subject: {subject}\n\n{body}'
        for to_email in to_emails:
            server.sendmail(from_email, to_email, message)
        server.quit()
        print("Email sent successfully!")
        say("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
        say(f"Failed to send email: {e}")

def get_email_addresses():
    email_address = [["Vinayak", "vinayak2002saxena@gmail.com"], ["Shivani", "shivanisahuofficial0401@gmail.com"]]
    to_emails = []
    say("Please name the recipients one by one. Say 'done' when you are finished.")
    while True:
        recipient = takeCommand().lower()
        if recipient == "okay":
            break
        for mailID in email_address:
            if mailID[0].lower() in recipient:
                say(f"Adding {mailID[0]} to the email list.")
                to_emails.append(mailID[1])
                break
        else:
            say("Sorry, I didn't catch that. Please say the name again.")
    return to_emails

if __name__ == '__main__':
    print('VSCODE')
    say("Hi, This is ECHO, Your Everyday Assistant. What can I do for you?")
    while True:
        text = takeCommand()
        if text != "None":
            sites = [["Youtube", "https://youtube.com"], ["Google", "https://google.com"], ["Fast", "https://fast.com"], ["kite", "http://lms.kiet.edu"]]
            for site in sites:
                if f"open {site[0].lower()}" in text.lower():
                    say(f"Opening {site[0]}, sir...")
                    webbrowser.open(site[1])
                    break
            if "play music" in text.lower():
                musicpath  = "C:\\Users\\ASUS\\Downloads\\Jannat Instrumental.mp3"
                print("Playing Music, sir")
                say("Playing music, sir")
                os.startfile(musicpath)

            if "what is the time" in text.lower():
                strftime = datetime.datetime.now().strftime("%H:%M:%S")
                say(f"Sir, the time is: {strftime}")

            if "send email" in text.lower():
                say("What is the subject of the email?")
                subject = takeCommand()
                say("What should I say in the email?")
                body = takeCommand()
                say("To whom should I send the email?")
                to_emails = get_email_addresses()
                if to_emails:
                    send_email(subject, body, to_emails)

            if any(phrase in text.lower() for phrase in ["shutdown", "shut down", "go down", "bye bye", "quit"]):
                say("Goodbye sir")
                break
