from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = 'https://tse3.mm.bing.net/th?id=OIP.iC6w-uAguv7_8AQJvWl7kAHaHa&pid=Api&P=0&h=220'

class Pet(db.Model):
    """Class for a pet."""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, nullable=False)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def image_url(self):
        """Return image for pet -- bespoke or generic."""

        return self.photo_url or DEFAULT_IMAGE


def connect_db(app):
    """Connect this database to provided Flask app."""

    db.app = app
    db.init_app(app)