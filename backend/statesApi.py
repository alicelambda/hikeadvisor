#example call of wf:
#http://api.wolframalpha.com/v2/query?appid=2728H3-LPHEWRWQ35&input=texas&output=json

#examle call of timezonedb:
#http://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=json&by=position&lat=40.689247&lng=-74.044502

import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from apiModels import State, app, db, lat_list, long_list, states

def getState () :
    wf_api_key = "2728H3-LPHEWRWQ35"
    timezone_api_key = "IKHSRO9WDYI8"
    space = " "

    for i in range(0, len((lat_list))) :

        input_states = states[i]

        if (input_states == "New York") :
            input_states = "New York State"

        if (input_states == "Washington") :
            input_states = "Washington State"

        if (space in input_states) :
            temp = input_states.replace(space, "%20")
            input_states = temp

        wf_url = ("http://api.wolframalpha.com/v2/query?appid="
            + wf_api_key
            + "&input="
            + input_states
            + "&output=json"
            )

        print (wf_url)

        timezone_url = ("http://api.timezonedb.com/v2.1/get-time-zone?key="
            + timezone_api_key
            + "&format=json&by=position&lat="
            + str(lat_list[i])
            + "&lng="
            + str(long_list[i])
            )

        wf_response = requests.get (wf_url)
        timezone_response = requests.get (timezone_url)

        if wf_response.status_code != 200 or timezone_response.status_code != 200 :
            # For debug purpose
            print ("State: " + states[i] + " failed to connect")
            continue

        wf_jsonRes = json.loads (wf_response.text)
        timezone_jsonRes = json.loads (timezone_response.text)

        try :
            info_name = states[i]
            info_timezone = timezone_jsonRes["abbreviation"]
            info_lat = lat_list[i]
            info_long = long_list[i]

            # update flag URL using pgAdmin4
            info_flagPicURL = "Default"

            basic_data = text_to_list(wf_jsonRes["queryresult"]["pods"][1]["subpods"][0]["img"]["alt"])
            info_capital = basic_data[3]

            population_data = text_to_list(wf_jsonRes["queryresult"]["pods"][3]["subpods"][0]["img"]["alt"])

            #print(population_data)

            info_population = population_data[1]
            info_populationDensity = population_data[5]

            geographic_data = text_to_list(wf_jsonRes["queryresult"]["pods"][7]["subpods"][0]["img"]["alt"])

            #print(geographic_data)

            info_totalArea = int(geographic_data[1].replace(" mi^2", ""))
            info_landArea = int(geographic_data[3].replace(" mi^2", ""))
            info_elevation = float(geographic_data[9].replace(" ft", ""))
            info_highest = geographic_data[11]
            info_lowest = geographic_data[12 + 1]

            symbol_data = text_to_list(wf_jsonRes["queryresult"]["pods"][15]["subpods"][0]["img"]["alt"])

            info_motto = symbol_data[7]

            exists = (State.query.filter_by(state_name = info_name).scalar() is not None)

            if not exists and None not in (
                info_name,
                info_timezone,
                info_lat,
                info_long,
                info_flagPicURL,
                info_capital,
                info_population,
                info_populationDensity,
                info_totalArea,
                info_landArea,
                info_elevation,
                info_highest,
                info_lowest,
                info_motto,
            ) :
                db.session.add (
                    State (
                        state_name = info_name,
                        state_timezone = info_timezone,
                        state_lat = info_lat,
                        state_long = info_long,
                        state_flagPicURL = info_flagPicURL,
                        state_capital = info_capital,
                        state_population = info_population,
                        state_populationDensity = info_populationDensity,
                        state_totalArea = info_totalArea,
                        state_landArea = info_landArea,
                        state_elevation = info_elevation,
                        state_highest = info_highest,
                        state_lowest = info_lowest,
                        state_motto = info_motto,
                        )
                    )
                db.session.commit ()
                print (states[i] + " committed")

        except KeyError :
        	pass

def text_to_list (text) :
    temp = text.replace("\n", " | ")
    result = temp.split(" | ")
    return result


if __name__ == "__main__" :
	getState ()