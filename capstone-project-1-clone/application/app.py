import os

from flask import Flask, render_template, request, flash, redirect, session, g
from sqlalchemy.exc import IntegrityError, InvalidRequestError
import requests

from forms import UserAddForm, UserUpdateForm, LoginForm
from models import db, connect_db, User
from secret_keys import API_SECRET_KEY

from sample_data.complex_search import complex_search
from sample_data.recipe_info import recipe_info, recipe_info2
from sample_data.recipes_by_ingredients import recipes_by_ingredients

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgresql:///recipes'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")

connect_db(app)


###############################################################################
# Homepage and user auth 

@app.route('/')
def show_homepage():
    """Show homepage."""

    return render_template('home.html')

@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
            )
            db.session.commit()

            do_login(user)

            return redirect("/")

        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form=form)

    else:
        return render_template('users/signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")

        flash("Invalid credentials.", 'danger')

    return render_template('users/login.html', form=form)


@app.route('/logout')
def logout():
    """Handle logout of user."""

    do_logout()
    flash("Successfully logged out.", "success")
    return redirect("/")


##############################################################################
# Recipe routes
# use example data to test data extraction methods (includeIngredients = "pasta")
@app.route('/recipes')
def show_recipes():
    """Show 50 random recipes based on user's default preferences."""
    # get random recipes endpoint, number = 50
    # get new recipes with each refresh

    return render_template('recipes/list.html')


@app.route('/recipes/results')
def show_results():
    """Show recipes that include ingredients inputted by user.
    Also includes how many and what excluded ingredients are present, if any."""

    # recipe_ids = [recipe["id"] for recipe in recipes_by_ingredients]
    # missing_ingredient_counts = [recipe["missedIngredientCount"] for recipe in recipes_by_ingredients]
    # missing_ingredient_list = [recipe["missedIngredients"][0] for recipe in recipes_by_ingredients]
    # missing_ingredients = [lst["name"] for lst in missing_ingredient_list]

    return render_template('recipes/results.html', 
                           recipes=complex_search["results"])


@app.route('/recipes/detail')
def show_recipe_info():
    """Show details about a recipe (name, URL, excluded ingredients, etc.)"""
    # use get info bulk to input multiple recipe IDs at one time


    return render_template('recipes/detail.html', 
                           recipe_info=recipe_info)


##############################################################################
# User routes