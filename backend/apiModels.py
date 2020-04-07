import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from sqlalchemy import create_engine

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://postgres:Bigbang123@hikeadvisordb.czecsyysbrfn.us-east-1.rds.amazonaws.com:5432/hikeadvisor"
db = SQLAlchemy(app)
db.create_all()


lat_list = [
    44.500000,
    39.000000,
    44.000000,
    31.000000,
    44.500000,
    41.700001,
    44.000000,
    43.000000,
    44.000000,
    41.500000,
    38.500000,
    33.000000,
    40.000000,
    39.000000,
    41.599998,
    34.799999,
    40.273502,
    38.573936,
    27.994402,
    39.876019,
    45.367584,
    44.182205,
    33.247875,
    19.741755,
    66.160507,
    35.860119,
    37.926868,
    39.833851,
    37.839333,
    47.650589,
    46.392410,
    36.084621,
    46.965260,
    47.751076,
    39.419220,
    39.113014,
    40.367474,
    32.318230,
    42.032974,
    34.307144,
    33.836082,
    41.203323,
    34.048927,
    39.045753,
    42.407211,
    36.778259,
    44.068203,
    43.075970,
    35.782169,
    30.391830,
]

long_list = [
    -89.500000,
    -80.500000,
    -72.699997,
    -100.000000,
    -100.000000,
    -71.500000,
    -120.500000,
    -75.000000,
    -71.500000,
    -100.000000,
    -98.000000,
    -90.000000,
    -89.000000,
    -75.500000,
    -72.699997,
    -92.199997,
    -86.126976,
    -92.603760,
    -81.760254,
    -117.224121,
    -68.972168,
    -84.506836,
    -83.441162,
    -155.844437,
    -153.369141,
    -86.660156,
    -78.024902,
    -74.871826,
    -84.270020,
    -100.437012,
    -94.636230,
    -96.921387,
    -109.533691,
    -120.740135,
    -111.950684,
    -105.358887,
    -82.996216,
    -86.902298,
    -93.581543,
    -106.018066,
    -81.163727,
    -77.194527,
    -111.093735,
    -76.641273,
    -71.382439,
    -119.417931,
    -114.742043,
    -107.290283,
    -80.793457,
    -92.329102,
]

states = [
    "Wisconsin",
    "West Virginia",
    "Vermont",
    "Texas",
    "South Dakota",
    "Rhode Island",
    "Oregon",
    "New York",
    "New Hampshire",
    "Nebraska",
    "Kansas",
    "Mississippi",
    "Illinois",
    "Delaware",
    "Connecticut",
    "Arkansas",
    "Indiana",
    "Missouri State",
    "Florida",
    "Nevada",
    "Maine",
    "Michigan",
    "Georgia",
    "Hawaii",
    "Alaska",
    "Tennessee",
    "Virginia",
    "New Jersey",
    "Kentucky",
    "North Dakota",
    "Minnesota",
    "Oklahoma",
    "Montana",
    "Washington",
    "Utah",
    "Colorado",
    "Ohio",
    "Alabama",
    "Iowa",
    "New Mexico",
    "South Carolina",
    "Pennsylvania",
    "Arizona",
    "Maryland",
    "Massachusetts",
    "California",
    "Idaho",
    "Wyoming",
    "North Carolina",
    "Louisiana",
]


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
        # return f"Trail('{self.trail_id}', '{self.trail_name}', '{self.trail_location}', '{self.trail_length}', '{self.trail_stars}', '{self.trail_latitude}', '{self.trail_latitude}', '{self.trail_longtitude}', '{self.trail_numstarts}', '{self.trail_high}', '{self.trail_low}', '{self.trail_ascent}', '{self.trail_descent}', '{self.trail_picURL}', '{self.trail_states}')"
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

    def __repr__(self):
        # return f"Animal('{self.animal_id}', '{self.animal_location}', '{self.animal_scientificName}', '{self.animal_picURL}', '{self.animal_commonName}', '{self.animal_numObser}', '{animal_description}', '{self.animal_ancestry}', '{self.animal_isExtinct}', '{self.animal_rank}', '{self.animal_lastSighting}', '{self.animal_taxonName}')"
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
    state_flagPicURL = db.Column(db.Unicode)
    state_mapPicURL = db.Column(db.Unicode)

    def __repr__(self):
        # return f"State('{self.state_name}', '{self.state_elevation}', '{self.state_capital}', '{self.state_totalArea}', '{self.state_population}', '{self.state_populationDensity}', '{self.state_timezone}', '{self.state_flagPicURL}', '{self.state_motto}', '{self.state_landArea}', '{self.state_lat}', '{self.state_long}', '{self.state_higest}', '{self.state_lowest}')"
        return "State {}".format(self.state_name)


engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
