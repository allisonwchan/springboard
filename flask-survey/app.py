from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

# keys for sessions
current_survey_key = 'current survey'
responses_key = 'responses'


@app.route('/')
def show_homepage():
    """Show survey options."""

    return render_template("select-survey.html",
                           surveys=surveys)


@app.route('/', methods=['POST'])
def select_survey():
    """Allow user to choose a survey."""

    survey_id = request.form["survey_id"]
    survey = surveys[survey_id]
    session[current_survey_key] = survey_id

    return render_template("start-survey.html",
                           survey=survey)


@app.route('/start')
def clear_responses():
    """Initialize survey with no user responses."""

    session[responses_key] = []
    return redirect('/questions/0')


@app.route('/questions/<int:num>')
def show_questions(num):
    """Show survey questions and make sure URL is valid."""

    responses = session.get(responses_key)
    survey_id = session[current_survey_key]
    survey = surveys[survey_id]

    # if user tries to access questions too early, redirect to home page
    if responses is None:
        flash("Please select survey first.")
        return redirect('/')
     
    # if all questions filled out, redirect to thank you message
    if len(responses) == len(survey.questions):
        return redirect('/thanks')
    
    # if user tries to access questions out of order, redirect to correct URL
    if num != len(responses):
        flash("Please answer questions in order.")
        return redirect(f'/questions/{len(responses)}')
    
    q = survey.questions[num]
    return render_template("questions.html",
                        question=q.question,
                        choices=q.choices)


@app.route('/answer', methods=['POST'])
def get_answers():
    """Add answers to responses list."""

    choice = request.form['answer']
    text = request.form.get("text", "")

    responses = session[responses_key]
    responses.append({"choice": choice, "text": text})

    session[responses_key] = responses
    survey_id = session[current_survey_key]
    survey = surveys[survey_id]
    
    # if all questions filled out, redirect to thank you message
    if len(responses) == len(survey.questions):
        return redirect('/thanks')
    
    # else, redirect to next question
    else:
        return redirect(f'/questions/{len(responses)}')
    
    
@app.route('/thanks')
def show_thanks():
    """Show thank you message after completion of survey."""

    return render_template('thanks.html')