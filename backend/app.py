from flask import Flask, jsonify, request
import requests
import json
import os
import time
import sys
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask import render_template
from apiModels import states, engine
from flask_cors import CORS
import flask_restless

application = Flask(__name__)
application.config.from_object(Config)
CORS(application)
db = SQLAlchemy(application)
migrate = Migrate(application, db)

default_results_per_page = 10


trail_attr = ["trail_id", "trail_name", "trail_location", "trail_length", "trail_stars", "trail_latitude", "trail_longitude",
"trail_numstars", "trail_high", "trail_low", "trail_ascent", "trail_descent", "trail_picURL", "trail_states", "trail_mapPicURL"]

animal_attr = ["animal_id", "animal_location", "animal_scientificName", "animal_picURL", "animal_commonName", "animal_numObser",
"animal_description", "animal_ancestry", "animal_isExtinct", "animal_rank", "animal_lastSighting", "animal_taxonName", "animal_taxonNetwork"]

state_attr = ["state_name", "state_elevation", "state_capital", "state_totalArea", "state_population", "state_populationDensity",
"state_timezone", "state_flagPicURL", "state_motto", "state_lat", "state_long", "state_landArea", "state_highest", "state_lowest", "state_mapPicURL"]


class Trail(db.Model):
    __tablename__ = "trail"
    __table_args__ = {"schema": "public"}
    trail_id = db.Column(db.Integer, primary_key=True)
    trail_name = db.Column(db.Unicode)
    trail_location = db.Column(db.Unicode)
    trail_length = db.Column(db.Float)
    trail_stars = db.Column(db.Float)
    trail_latitude = db.Column(db.Float)
    trail_longitude = db.Column(db.Float)
    trail_numstars = db.Column(db.Integer)
    trail_high = db.Column(db.Integer)
    trail_low = db.Column(db.Integer)
    trail_ascent = db.Column(db.Integer)
    trail_descent = db.Column(db.Integer)
    trail_picURL = db.Column(db.Unicode)
    trail_states = db.Column(db.Unicode)
    trail_mapPicURL = db.Column(db.Unicode)

    def __repr__(self):
        return "Trail {}".format(self.trail_name)


class Animal(db.Model):
    __tablename__ = "animal"
    __table_args__ = {"schema": "public"}
    animal_id = db.Column(db.Integer, primary_key=True)
    animal_location = db.Column(db.Unicode)
    animal_scientificName = db.Column(db.Unicode)
    animal_picURL = db.Column(db.Unicode)
    animal_commonName = db.Column(db.Unicode)
    animal_numObser = db.Column(db.Integer)
    animal_description = db.Column(db.Unicode)
    animal_ancestry = db.Column(db.Unicode)
    animal_isExtinct = db.Column(db.Boolean)
    animal_rank = db.Column(db.Unicode)
    animal_lastSighting = db.Column(db.Unicode)
    animal_taxonName = db.Column(db.Unicode)
    animal_taxonNetwork = db.Column(db.Unicode)

    def __repr__(self):
        return "Animal {}".format(self.animal_commonName)


class State(db.Model):
    __tablename__ = "state"
    __table_args__ = {"schema": "public"}
    state_name = db.Column(db.Unicode, primary_key=True)
    state_elevation = db.Column(db.Float)
    state_capital = db.Column(db.Unicode)
    state_totalArea = db.Column(db.Integer)
    state_population = db.Column(db.Unicode)
    state_populationDensity = db.Column(db.Unicode)
    state_timezone = db.Column(db.Unicode)
    state_flagPicURL = db.Column(db.Unicode)
    state_motto = db.Column(db.Unicode)
    state_lat = db.Column(db.Float)
    state_long = db.Column(db.Float)
    state_landArea = db.Column(db.Integer)
    state_highest = db.Column(db.Unicode)
    state_lowest = db.Column(db.Unicode)
    state_mapPicURL = db.Column(db.Unicode)

    def __repr__(self):
        return "State {}".format(self.state_name)


manager = flask_restless.APIManager(application, flask_sqlalchemy_db=db)

manager.create_api(Trail, results_per_page=default_results_per_page)
manager.create_api(Animal, results_per_page=default_results_per_page)
manager.create_api(State, results_per_page=default_results_per_page)


@application.route("/")
def index():
    response = jsonify(
        {
            "status": 200,
            "message": "Welcome to the HikeAdvisor API! The documentation is at https://documenter.getpostman.com/view/1048799/SzKWuxeb?version=latest. Check our our website https://hikeadvisor.me as well.",
        }
    )
    response.status_code = 200
    return response


# Because I forgot to add relationship to the database, I had to implement search to connect the model
# This is use to connect animal with state
# For frontend use only
# example result: {"animal list":["47607","60551","51112"],"status":200}
@application.route("/animal/search_state")
def get_animal_by_state():
    query = request.args.get("q")

    if not query in states:
        response_json = {"status": 404}
        response_json["message"] = "Not found"
        response = jsonify(response_json)
        response.status_code = 404
        return response
    else:
        query_list = Animal.query.filter_by(animal_location=query).all()
        temp = []
        for row in query_list:
            temp.append(str(row.animal_id))
        response_json = {"status": 200}
        response_json["animal list"] = list(temp)
        response = jsonify(response_json)
        response.status_code = 200
        return response


# Because I forgot to add relationship to the database, I had to implement search to connect the model
# This is use to connect trail with state
# For frontend use only
# example result: {"status":200, "trail list":[7017937,7016992,7013161,7021696,7029003,7016574,7027232,7036362,7019190,7029620,7063387]}
@application.route("/trail/search_state")
def get_trail_by_state():
    query = request.args.get("q")

    if not query in states:
        response_json = {"status": 404}
        response_json["message"] = " Not found"
        response = jsonify(response_json)
        response.status_code = 404
        return response
    else:
        query_list = Trail.query.filter_by(trail_states=query).all()
        temp = []
        for row in query_list:
            temp.append(row.trail_id)
        response_json = {"status": 200}
        response_json["trail list"] = list(temp)
        response = jsonify(response_json)
        response.status_code = 200
        return response

#example call: http://127.0.0.1:5000/api/search?q=texas (local machine only)
@application.route("/api/search")
def search() :
    input_query = request.args.get("q")

    if input_query == None or len(input_query) < 1 :
        response_json = {"status": 400}
        if input_query == None :
            response_json["message"] = "Invalid. Search query not found."
        else :
            response_json["message"] = "Invalid. Search query cannot be empty."
        response = jsonify(response_json)
        response.status_code = 400
        return response
    else :
        input_query = input_query.lower()
        models = {"trails" : Trail.query, "animals" : Animal.query, "states" : State.query}
        response_json = {"status": 200}
        response_json["result"] = {}
        for model in ["trails", "animals", "states"] :
            if model == "trails" :
                response_json["result"][model] = search_model(input_query, models[model], trail_attr)
                response_json["num_trails"] = len(response_json["result"][model])
            elif model == "animals" :
                response_json["result"][model] = search_model(input_query, models[model], animal_attr)
                response_json["num_animals"] = len(response_json["result"][model])
            else :
                response_json["result"][model] = search_model(input_query, models[model], state_attr)
                response_json["num_states"] = len(response_json["result"][model])

        total = 0
        for result in ["num_trails", "num_animals", "num_states"] :
            total = total + int(response_json[result])

        response_json["total_results"] = total
        response_json["page"] = 1
        response_json["total_pages"] = 1
        response = jsonify(response_json)
        response.status_code = 200
        return response

def search_model(input_query, model_query, model_attr) :
    return [convert_to_dict(row, model_attr) for row in model_query.all() if helper(input_query, row, model_attr)]

def helper(input_query, row, model_attr) :
    for attr in model_attr :
        try : 
            val = str(getattr(row, attr))
        except UnicodeEncodeError :
            val = getattr(row, attr).encode('ascii', 'ignore').decode('ascii')
        if val != None and input_query in val.lower() :
            return True
    return False

def convert_to_dict(row, model_attr) :
    response_json = {}
    for attr in model_attr :
        response_json[attr] = getattr(row, attr)
    return response_json

@application.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


if __name__ == "__main__":
    application.debug = False
    port = int(os.environ.get("PORT", 5000))
    application.run(host="0.0.0.0", port=port)
    # on local machine
    # application.run()
