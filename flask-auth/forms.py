from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField, TextAreaField
from wtforms.validators import InputRequired, DataRequired, Length


class RegisterUserForm(FlaskForm):
    """Form to add new user."""

    username = StringField('Username', 
                           validators=[InputRequired()])
    password = PasswordField('Password',
                           validators=[DataRequired()])
    email = EmailField('Email',
                       validators=[InputRequired()])
    first_name = StringField('First name',
                             validators=[InputRequired()])
    last_name = StringField('Last name',
                             validators=[InputRequired()])
    

class LoginUserForm(FlaskForm):
    """Form for user to log in."""

    username = StringField('Username', 
                           validators=[InputRequired()])
    password = PasswordField('Password',
                           validators=[DataRequired()])
    

class FeedbackForm(FlaskForm):
    """Form to submit feedback."""

    title = StringField('Title',
                        validators=[InputRequired()])
    content = TextAreaField('Content', 
                            validators=[InputRequired()])