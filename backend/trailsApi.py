import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from apiModels import Trail, app, db, lat_list, long_list, states


def getTrail():
    api_key = "200690331-4aa76c9665782f15abad75022b5b89d8"
    max_dist = 200

    for i in range(len(lat_list)):
        url = (
            "https://www.hikingproject.com/data/get-trails?lat="
            + str(lat_list[i])
            + "&lon="
            + str(long_list[i])
            + "&maxDistance="
            + str(max_dist)
            + "&maxResults=30"
            + "&key="
            + api_key
        )
        print(str(url))

        max_trail = 15
        reponse = requests.get(url)

        if reponse.status_code != 200:
            continue

        jsonRes = json.loads(reponse.text)

        if jsonRes["trails"] == []:
            continue

        if len(jsonRes["trails"]) < max_trail:
            max_trail = len(jsonRes["trails"])

        total = 0

        for j in range(max_trail):
            try:
                info_id = jsonRes["trails"][j]["id"]
                info_name = jsonRes["trails"][j]["name"]
                info_location = jsonRes["trails"][j]["location"]
                info_length = jsonRes["trails"][j]["length"]
                info_stars = jsonRes["trails"][j]["stars"]
                info_latitude = jsonRes["trails"][j]["latitude"]
                info_longitude = jsonRes["trails"][j]["longitude"]
                info_numstars = jsonRes["trails"][j]["starVotes"]
                info_high = jsonRes["trails"][j]["high"]
                info_low = jsonRes["trails"][j]["low"]
                info_ascent = jsonRes["trails"][j]["ascent"]
                info_descent = jsonRes["trails"][j]["descent"]
                info_picURL = jsonRes["trails"][j]["imgMedium"]
                info_states = states[i]

                exists = Trail.query.filter_by(trail_id=info_id).scalar() is not None

                if not exists and None not in (
                    info_id,
                    info_name,
                    info_location,
                    info_length,
                    info_stars,
                    info_latitude,
                    info_longitude,
                    info_numstars,
                    info_high,
                    info_low,
                    info_ascent,
                    info_descent,
                    info_picURL,
                    info_states,
                ):
                    db.session.add(
                        Trail(
                            trail_id=info_id,
                            trail_name=info_name,
                            trail_location=info_location,
                            trail_length=info_length,
                            trail_stars=info_stars,
                            trail_latitude=info_latitude,
                            trail_longitude=info_longitude,
                            trail_numstars=info_numstars,
                            trail_high=info_high,
                            trail_low=info_low,
                            trail_ascent=info_ascent,
                            trail_descent=info_descent,
                            trail_picURL=info_picURL,
                            trail_states=info_states,
                        )
                    )
                    db.session.commit()

            except KeyError:
                pass
    # print(total)


if __name__ == "__main__":
    getTrail()
