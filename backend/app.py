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
import flask_restless

application = Flask (__name__)
application.config.from_object (Config)
db = SQLAlchemy (application)
migrate = Migrate (application, db)

default_results_per_page = 5


class Trail (db.Model) :
    __tablename__ = "trail"
    __table_args__ = {"schema": "public"}
    trail_id = db.Column (db.Integer, primary_key = True)
    trail_name = db.Column (db.Unicode)
    trail_location = db.Column (db.Unicode)
    trail_length = db.Column (db.Float)
    trail_stars = db.Column (db.Float)
    trail_latitude = db.Column (db.Float)
    trail_longtitude = db.Column (db.Float)
    trail_numstars = db.Column (db.Integer)
    trail_high = db.Column (db.Integer)
    trail_low = db.Column (db.Integer)
    trail_ascent = db.Column (db.Integer)
    trail_descent = db.Column (db.Integer)
    trail_picURL = db.Column (db.Unicode)
    trail_states = db.Column (db.Unicode)

    def __repr__ (self) :
    	return "Trail {}".format (self.trail_name)

class Animal (db.Model) :
    __tablename__ = "animal"
    __table_args__ = {"schema": "public"}
    animal_id = db.Column (db.Integer, primary_key = True)
    animal_location = db.Column (db.Unicode)
    animal_scientificName = db.Column (db.Unicode)
    animal_picURL = db.Column (db.Unicode)
    animal_commonName = db.Column (db.Unicode)
    animal_numObser = db.Column (db.Integer)
    animal_description = db.Column (db.Unicode)
    animal_ancestry = db.Column (db.Unicode)
    animal_isExtinct = db.Column (db.Boolean)
    animal_rank = db.Column (db.Unicode)
    animal_lastSighting = db.Column (db.Unicode)
    animal_taxonName = db.Column (db.Unicode)

    def __repr__ (self) :
    	return "Animal {}".format (self.animal_commonName)

class State (db.Model) :
    __tablename__ = "state"
    __table_args__ = {"schema": "public"}
    state_name = db.Column (db.Unicode, primary_key = True)
    state_elevation = db.Column (db.Float)
    state_capital = db.Column (db.Unicode)
    state_totalArea = db.Column (db.Integer)
    state_population = db.Column (db.Unicode)
    state_populationDensity = db.Column (db.Unicode)
    state_timezone = db.Column (db.Unicode)
    state_flagPicURL = db.Column (db.Unicode)
    state_motto = db.Column (db.Unicode)
    state_lat = db.Column (db.Float)
    state_long = db.Column (db.Float)
    state_landArea = db.Column (db.Integer)
    state_highest = db.Column (db.Unicode)
    state_lowest = db.Column (db.Unicode)

    def __repr__ (self) :
    	return "State {}".format (self.state_name)


manager = flask_restless.APIManager (application, flask_sqlalchemy_db = db)

manager.create_api (Trail, results_per_page = default_results_per_page)
manager.create_api (Animal, results_per_page = default_results_per_page)
manager.create_api (State, results_per_page = default_results_per_page)

@application.route ("/")
def index () :
	response = jsonify (
		{
		    "status" : 200,
		    "message":"Welcome to the HikeAdvisor API! The documentation is at https://documenter.getpostman.com/view/1048799/SzKWuxeb?version=latest. Check our our website https://hikeadvisor.me as well."
		}
	)
	response.status_code = 200
	return response

# For frontend use only
# example result: {"animal list":["47607","60551","51112"],"status":200}
@application.route ("/animal/search_state")
def get_animal_by_state () :
    query = request.args.get("q")

    if not query in states :
        response_json = {"status" : 404}
        response_json["message"] = "Not found"
        response = jsonify(response_json)
        response.status_code = 404
        return response
    else :
        query_list = Animal.query.filter_by(animal_location = query).all()
        temp = []
        for row in query_list :
            temp.append(str(row.animal_id))
        response_json = {"status" : 200}
        response_json["animal list"] = list(temp)
        response = jsonify(response_json)
        response.status_code = 200
        return response


# For frontend use only
# example result: {"status":200, "trail list":[7017937,7016992,7013161,7021696,7029003,7016574,7027232,7036362,7019190,7029620,7063387]}
@application.route ("/trail/search_state")
def get_trail_by_state () :
    query = request.args.get("q")

    if not query in states :
        response_json = {"status" : 404}
        response_json["message"] = " Not found"
        response = jsonify(response_json)
        response.status_code = 404
        return response
    else :
        query_list = Trail.query.filter_by(trail_states = query).all()
        temp = []
        for row in query_list :
            temp.append(row.trail_id)
        response_json = {"status" : 200}
        response_json["trail list"] = list(temp)
        response = jsonify(response_json)
        response.status_code = 200
        return response


@application.errorhandler(404)
def page_not_found (e) :
    return render_template('404.html'), 404

if __name__ == "__main__" :
	application.run ()