from flask import Flask, request, render_template
from stories import story
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

@app.route('/')
def form():
    """Show Madlibs form on homepage."""

    prompts = story.prompts
    return render_template("home.html", prompts=prompts)

@app.route('/story')
def show_story():
    """Show created story."""

    text = story.generate(request.args)
    return render_template("story.html", text=text)