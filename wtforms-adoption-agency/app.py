from flask import Flask, request, redirect, render_template, flash
from models import Pet, db, connect_db
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///adoption"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'blog'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.app_context().push()

connect_db(app)
db.create_all()


@app.route('/')
def list_pets():
    """List all pets."""

    pets = Pet.query.all()
    return render_template('all-pets.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    """Show form to add a pet."""

    form = AddPetForm()

    if form.validate_on_submit():
        
        data = {k: v for k, v in form.data.items() if k != "csrf_token"} 
        new_pet = Pet(**data)

        db.session.add(new_pet)
        db.session.commit()

        flash(f"{new_pet.name} added.")
        return redirect('/')

    else:
        return render_template('new-pet.html', form=form)
    

@app.route('/<int:pet_id>')
def show_pet_info(pet_id):
    """Show info about a given pet."""

    pet = Pet.query.get_or_404(pet_id)
    return render_template('pet-info.html', pet=pet)


@app.route('/<int:pet_id>/edit', methods=['GET', 'POST'])
def edit_pet_info(pet_id):
    """Edit info about a pet."""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm()

    if form.validate_on_submit():
        
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        db.session.commit()

        flash(f"Updated information about {pet.name}.")
        return redirect(f"/{pet_id}")

    else:
        return render_template('edit-pet.html', form=form, pet=pet)