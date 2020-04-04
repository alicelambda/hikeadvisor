import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from apiModels import State, app, db, lat_list, long_list, states

def func () :
	list_state = State.query.all()
	for state in states :
		result = State.query.filter_by(state_name=state).first()
		url = ("https://maps.googleapis.com/maps/api/staticmap?center="
			+ result.state_capital
			+ ","
			+ result.state_name
			+ "&zoom=14&size=400x400&key=AIzaSyDiDwoPvTLCXHS4J-qNDVHfDu27JIlWnv4")
		result.state_mapPicURL = url
		print(url)
		db.session.commit()

if __name__ == "__main__" :
	func()