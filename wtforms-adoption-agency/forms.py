from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, NumberRange, Length


class AddPetForm(FlaskForm):
    """Form for adding a pet."""

    name = StringField('Name', 
                       validators=[InputRequired()])
    species = SelectField('Species',
                          choices=[('cat', 'Cat'), ('dog', 'Dog'), ('porcupine', 'Porcupine')])
    photo_url = StringField('Photo',
                            validators=[Optional(), URL()])
    age = FloatField('Age',
                     validators=[Optional(),NumberRange(min=0, max=30)])
    notes = StringField('Notes',
                        validators=[Optional(), Length(min=10)])
    

class EditPetForm(FlaskForm):
    """Form for editing info about a pet."""

    photo_url = StringField('Photo',
                            validators=[Optional(), URL()])
    notes = StringField('Notes',
                        validators=[Optional(), Length(min=10)])
    available = BooleanField("Available?")