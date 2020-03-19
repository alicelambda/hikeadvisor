from flask import Flask, jsonify, request
import requests
import json
import os
import time
import sys
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
import flask_restless

application = Flask (__name__)
application.config.from_object (Config)
db = SQLAlchemy (application)
migrate = Migrate (application.db)

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

if __name__ == "__main__" :
	application.run ()