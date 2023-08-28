from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def say_welcome():
    """Return simple "welcome" Greeting."""

    html = "<html><body><h1>welcome</h1></body></html>"
    return html

@app.route('/welcome/home')
def say_welcome_home():
    """Return simple "welcome home" Greeting."""

    html = "<html><body><h1>welcome home</h1></body></html>"
    return html

@app.route('/welcome/back')
def say_welcome_back():
    """Return simple "welcome back" Greeting."""

    html = "<html><body><h1>welcome back</h1></body></html>"
    return html