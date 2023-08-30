from flask import Flask, request, render_template
from stories import stories

app = Flask(__name__)

@app.route('/')
def get_story():
    """Let user choose story template."""

    return render_template("base.html", stories=stories.values())

@app.route("/words")
def get_words():
    """Generate and show form to ask words."""

    story_id = request.args["story_id"]
    story = stories[story_id]

    prompts = story.prompts

    return render_template("words.html",
                           story_id=story_id,
                           title=story.title,
                           prompts=prompts)


@app.route("/story")
def show_story():
    """Show story result."""

    story_id = request.args["story_id"]
    story = stories[story_id]

    text = story.generate(request.args)

    return render_template("story.html",
                           title=story.title,
                           text=text)