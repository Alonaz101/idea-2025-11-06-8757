from flask import Flask, request, jsonify
from models import User, Mood, Recipe, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# SQLAlchemy setup
engine = create_engine('sqlite:///recipes.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route('/api/recommendations', methods=['POST'])
def recommend():
    data = request.json
    mood = data.get('mood')
    session = Session()
    recipes = session.query(Recipe).filter(Recipe.mood_tag.ilike(f'%{mood}%')).all()
    result = [{'id': r.id, 'title': r.title, 'description': r.description} for r in recipes]
    session.close()
    return jsonify(result), 200

@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def recipe_detail(recipe_id):
    session = Session()
    recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        response = {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'instructions': recipe.instructions
        }
        status = 200
    else:
        response = {'error': 'Recipe not found'}
        status = 404
    session.close()
    return jsonify(response), status

if __name__ == '__main__':
    app.run(debug=True)
