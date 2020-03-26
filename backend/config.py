import sys, os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config (object) :
	SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:Bigbang123@hikeadvisordb.czecsyysbrfn.us-east-1.rds.amazonaws.com:5432/hikeadvisor"
	SQLALCHEMY_TRACK_MODIFICATIONS = False