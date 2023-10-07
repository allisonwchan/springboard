"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, render_template, flash, jsonify
from models import Cupcake, db, connect_db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'blog'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.app_context().push()

# db.drop_all()
connect_db(app)
db.create_all()

@app.route('/')
def show_cupcakes():
    """Show all cupcakes."""

    cupcakes = Cupcake.query.all()
    return render_template('cupcakes.html', cupcakes=cupcakes)


@app.route('/api/cupcakes')
def get_cupcake_data():
    """Get data about cupcakes and return JSON."""

    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Create a new cupcake."""

    data = request.json

    cupcake = Cupcake(flavor=data['flavor'],
                          size=data['size'],
                          rating=data['rating'],
                          image=data['image'])
    
    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.to_dict()), 201)


@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake_info(cupcake_id):
    """Get info on a specific cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.to_dict())


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    """Update info about a cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    data = request.json

    cupcake.flavor = data['flavor']
    cupcake.size = data['size']
    cupcake.rating = data['rating']
    cupcake.image = data['image']

    db.session.commit()

    return jsonify(cupcake=cupcake.to_dict())


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """Delete a cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")