from flask import Flask, render_template, request, redirect, url_for
import subprocess
import sys
   
app = Flask(__name__)

# Home Page Route
@app.route('/')
def index():
    return render_template('webpage.html')

# Search Route
@app.route('/search')
def search():
    query = request.args.get('query', '')

    return render_template('search_results.html', query=query)

# Additional Pages Routes
@app.route('/about')
def about():
    return render_template('About.html')

@app.route('/dls')
def dls():
    return render_template('dls.html')

@app.route('/bfs')
def bfs():
    return render_template('bfs.html')

@app.route('/contact') 
def contact():
    return render_template('contact.html')

@app.route('/dfs')
def dfs():
    return render_template('dfs.html')

@app.route('/services')
def services():
    return render_template('Services.html')

@app.route('/subscribe')
def subscribe():
    return render_template('Subscribe.html')

@app.route('/visiual')
def visiual():
    return render_template('visiual.html')

# Console Launch Routes
@app.route('/open_autogenrate_console')
def open_autogenrate_console():
    # Open a new console window and run autogenrate.py
    if sys.platform == "win32":
        subprocess.Popen(["start", "cmd", "/k", "python autogenrate.py"], shell=True)
    else:
        subprocess.Popen(["gnome-terminal", "--", "python3", "autogenrate.py"])
    return redirect(url_for('visiual'))

@app.route('/open_megenrate_console')
def open_megenrate_console():
    # Open a new console window and run megenrate.py
    if sys.platform == "win32":
        subprocess.Popen(["start", "cmd", "/k", "python megenrate.py"], shell=True)
    else:
        subprocess.Popen(["gnome-terminal", "--", "python3", "megenrate.py"])
    return redirect(url_for('visiual'))

# Run the App
if __name__ == '__main__':
    app.run(debug=True)
