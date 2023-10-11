from flask import Flask, redirect, render_template, session
from models import User, Feedback, db, connect_db
from forms import RegisterUserForm, LoginUserForm, FeedbackForm
from werkzeug.exceptions import Unauthorized

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///auth"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'auth'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['DEBUG_TB_ENABLED'] = True
app.app_context().push()

connect_db(app)
db.create_all()


@app.route('/')
def redirect_homepage():
    """Redirect to /register."""

    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def show_register_form():
    """Show form for new user to register."""

    form = RegisterUserForm()

    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != "csrf_token"} 
        user = User.register(**data)

        db.session.commit()
        session['username'] = user.username

        return redirect(f"/users/{user.username}")
    
    else:
        return render_template('register.html', form=form)
    

@app.route('/login', methods=['GET', 'POST'])
def show_login_form():
    """Show user login form."""

    form = LoginUserForm()

    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != "csrf_token"} 

        # if user info exists, user=True
        user = User.authenticate(**data)

        if user:
            session['username'] = user.username
            return redirect(f"/users/{user.username}")

        else:
            form.username.errors = ['Bad username/password']
    
    else:
        return render_template('login.html', form=form)    


@app.route('/users/<username>')
def show_user_info(username):
    """Show user's info after registering or logging in."""

    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    user = User.query.filter_by(username=username).first()
    return render_template('user-info.html', user=user)
    

@app.route('/users/<username>/delete')
def delete_user(username):
    """
    Let a user delete their own account.
    
    Use rmust be signed in.
    """

    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    
    user_id = User.query.filter_by(username=username).first().id
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """
    Let a user add feedback in their own account. 
    
    User might be signed in.
    """

    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    form = FeedbackForm()

    if form.validate_on_submit():
        data = {k: v for k, v in form.data.items() if k != 'csrf_token'}

        # username isn't part of form data so need to add in
        feedback = Feedback(**data,
                            username=username)

        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/users/{username}")
    else:
        return render_template('feedback.html', form=form)


@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    """Allow user to edit their own feedback."""

    feedback = Feedback.query.get_or_404(feedback_id)
    username = feedback.username

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    if form.validate_on_submit():
        form = FeedbackForm(obj=feedback)

        data = {k: v for k, v in form.data.items() if k != 'csrf_token'}

        feedback = Feedback(**data)
        db.session.commit()

        return redirect(f"/users/{username}")
    
    else:
        return render_template('update.html', form=form)    


@app.route('/feedback/<int:feedback_id>/delete', method=['POST'])
def delete_feedback(feedback_id):
    """Allow user to delete their own feedback."""
    
    feedback = Feedback.query.get_or_404(feedback_id)
    username = feedback.username

    if "username" not in session or username != session['username']:
        raise Unauthorized()
    
    db.session.delete(feedback)
    db.session.commit()

    return redirect(f"/users/{username}")


@app.route('/logout')
def logout_user():
    """Clear info from session and redirect to hompage."""

    session.pop('username')
    return redirect('/')