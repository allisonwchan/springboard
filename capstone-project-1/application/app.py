import os

from flask import Flask, render_template, request, flash, redirect, session, g
from sqlalchemy.exc import IntegrityError, InvalidRequestError
import requests
from werkzeug.datastructures import MultiDict

from forms import UserAddForm, UserUpdateForm, LoginForm, SearchForm, AdvancedSearchForm
from models import db, connect_db, User, Recipe
from secret_keys import API_SECRET_KEY
from sample_data.complex_search import complex_search
from sample_data.recipe_info import recipe_info
from sample_data.recipes_by_ingredients import recipes_by_ingredients
from sample_data.similar_recipes import similar_recipes

CURR_USER_KEY = "curr_user"
BASE_URL = "https://api.spoonacular.com/recipes"

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
app.app_context().push()

connect_db(app)
db.create_all()

###############################################################################
# Helper functions 

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

###############################################################################
# Signup, login, logout routes 

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
                diet=form.diet.data,
                allergies=form.allergies.data or User.allergies.default
            )

            db.session.commit()

            do_login(user)

            return redirect("/")
        
        # find way to separate username and email validation
        # both are IntegrityError
        except IntegrityError:
            flash("Username or email already taken", 'danger')
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
# Recipe search routes

@app.route('/', methods=['GET', 'POST'])
def show_homepage():
    """Show homepage and simple recipe search form."""

    form = SearchForm()
    if form.validate_on_submit():
        query = form.query.data

        return redirect(f"/recipes/results?query={query}")
    
    return render_template('home.html', form=form)


@app.route('/advanced-search', methods=['GET', 'POST'])
def show_advanced_search():
    """Show and perform advanced search."""

    if not g.user:
        return redirect('/login')

    if request.method == 'GET':
        form = AdvancedSearchForm(formdata=MultiDict({'diet': g.user.diet, 
                                                      'excludeIngredients': g.user.allergies}))
    else:
        form = AdvancedSearchForm()

    if form.validate_on_submit():
        args = "&".join([f"{k}={v}" for k, v in form.data.items()])
        return redirect(f"/recipes/results?{args}")

    return render_template('advanced-search.html', form=form)


##############################################################################
# Recipe routes
# use example data to test data extraction methods (includeIngredients = "pasta")

@app.route('/recipes')
def show_recipes():
    """Show 50 random recipes based on user's default preferences."""

    if not g.user:
        return redirect('/login')
    
    default_num_recipes = 2

    resp = requests.get(f"{BASE_URL}/random",
                        params={"tags": {g.user.diet},
                                "number": default_num_recipes,
                                "apiKey": API_SECRET_KEY})

    json = resp.json()
    recipes = json["recipes"]

    return render_template('recipes/list.html', 
                           recipes=recipes,
                           page='random')


@app.route('/recipes/results')
def show_results():
    """Show recipes that include ingredients inputted by user.
    Return 30 recipes by default."""

    default_num_recipes = 2

    resp = requests.get(f"{BASE_URL}/complexSearch",
                        params={"query": request.args.get("query"),
                                "ingredients": request.args.get("includeIngredients") or None,
                                "number": request.args.get("number") or default_num_recipes,
                                "diet": request.args.get("diet") or None,
                                "excludeIngredients": request.args.get("excludeIngredients") or None,
                                "sort": request.args.get("sort") or None,
                                "type": request.args.get("type") or None,
                                "apiKey": API_SECRET_KEY})
    json = resp.json()
    recipes = json["results"]

    # if no results show up, redirect user to home page and flash message
    if len(recipes) == 0:
        flash(f"No recipes found for '{request.args.get('query')}'.", "danger")
        return redirect("/")

    saved_recipes = g.user.recipes
    api_ids = [recipe.api_id for recipe in saved_recipes]

    return render_template('recipes/results.html', 
                           query=request.args.get("query"),
                           recipes=recipes,
                           api_ids=api_ids,
                           page='results')


# @app.route('/recipes/<int:recipe_api_id>')
# def show_recipe_info(recipe_api_id):
#     """Show details about a recipe."""

#     resp = requests.get(f"{BASE_URL}/{recipe_api_id}/information",
#                         params={"apiKey": API_SECRET_KEY})
#     json = resp.json()
    
#     return render_template('recipes/detail.html', 
#                            recipe_info=json)


@app.route('/recipes/detail')
def show_recipe_info():
    """Show details about a recipe."""

    saved_recipes = g.user.recipes
    api_ids = [recipe.api_id for recipe in saved_recipes]
    
    return render_template('recipes/detail.html', 
                           recipe_info=recipe_info,
                           api_ids=api_ids,
                           similar_recipes=similar_recipes,
                           page='detail'
                           )


##############################################################################
# User routes

@app.route('/users')
def show_users():
    """Show all users."""

    users = User.query.all()
    return render_template('users/list.html', users=users)


@app.route('/users/<int:user_id>')
def show_user_info(user_id):
    """Show user's info."""

    return render_template("users/detail.html", user=User.query.get_or_404(user_id))


@app.route('/users/<int:user_id>/update', methods=["GET", "POST"])
def update_user_info(user_id):
    """Let a user update their own info."""

    if not g.user:
        return redirect('/login')
    
    user = User.query.get_or_404(user_id)
    
    if request.method == 'GET':
        form = UserUpdateForm(formdata=MultiDict({'username': user.username, 
                                                  'email': user.email, 
                                                  'image_url': user.image_url}))
    else:
        form = UserUpdateForm()

    if form.validate_on_submit():
        is_match = User.authenticate(user.username, form.password.data)
        if is_match == False:
            flash("Invalid password.", "danger")
            return redirect(f"/users/{user.id}/update")
        
        try:
            user.username = form.username.data
            user.email = form.email.data
            user.image_url=form.image_url.data or User.image_url.default.arg
            db.session.commit()

            flash("Successfully updated profile.", "success")
            return redirect(f"/users/{user_id}")

        # prevent user from choosing a pre-existing username
        except IntegrityError:
            flash("Username already taken.", 'danger')
            return render_template('users/update.html', form=form)

    return render_template("users/update.html", form=form, user=user)


@app.route('/users/delete', methods=["POST"])
def delete_user():
    """Delete user."""

    if not g.user:
        flash("Access unauthorized.", "danger")
        return redirect("/")

    do_logout()

    db.session.delete(g.user)
    db.session.commit()

    flash("Successfully deleted profile.", "success")
    return redirect("/signup")

@app.route('/users/save_recipe/<int:recipe_api_id>/<recipe_title>/<page>', methods=['POST'])
def save_recipe(recipe_api_id, recipe_title, page):
    """Save a recipe."""

    if not g.user:
        return redirect('/login')

    # check if recipe_id is in database; if not, add it
    recipes = Recipe.query.filter_by(api_id=recipe_api_id, user_id=g.user.id).all()
    if len(recipes) == 0:
        recipe = Recipe(api_id=recipe_api_id,
                        title=recipe_title,
                        user_id=g.user.id)
        
        db.session.add(recipe)
        db.session.commit()
        
    flash("Recipe saved.", "success")

    # redirect to different pages depending on where user saved a recipe
    if page == 'result':
        return redirect('/recipes/results')
    elif page == 'detail':
        return redirect('/recipes/detail')
    else:
        return redirect('/recipes')
    

@app.route('/users/unsave_recipe/<int:recipe_api_id>/<page>', methods=['POST'])
def unsave_recipe(recipe_api_id, page):
    """Unsave a recipe."""

    if not g.user:
        return redirect('/login')

    recipe = Recipe.query.filter_by(api_id=recipe_api_id, user_id=g.user.id).first()
    db.session.delete(recipe)
    db.session.commit()
        
    flash("Recipe unsaved.", "success")

    # redirect to different pages depending on where user unsaved a recipe
    if page == 'result':
        return redirect('/recipes/results')
    elif page == 'detail':
        return redirect('/recipes/detail')
    else:
        return redirect('/recipes')