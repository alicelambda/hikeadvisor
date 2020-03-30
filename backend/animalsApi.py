import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
import time
from apiModels import Animal, app, db, lat_list, long_list, states


def getAnimal():
    max_page = 1
    max_per_page = 4
    has_photo = "true"

    # example call:
    # https://api.inaturalist.org/v1/observations?photos=true&taxon_is_active=true&lat=44.500000&lng=-89.500000&page=1&per_page=4&order=desc&order_by=created_at
    # https://api.inaturalist.org/v1/observations?photos=true&taxon_is_active=true&hrank=species&lrank=subspecies&lat=44.500000&lng=-100.000000&page=1&per_page=4&order=desc&order_by=created_at
    for i in range(0, len(states)):

        if i != 0 and i % 5 == 0:
            time.sleep(300)

        max_per_page = 4
        url = (
            "https://api.inaturalist.org/v1/observations?photos="
            + has_photo
            + "&lat="
            + str(lat_list[i])
            + "&lng="
            + str(long_list[i])
            + "&page="
            + str(max_page)
            + "&per_page="
            + str(max_per_page)
            + "&order=desc&order_by=created_at"
        )
        response = requests.get(url)
        # print(url)

        if response.status_code != 200:
            print(url)
            print("URL not found")
            continue

        jsonRes = json.loads(response.text)

        limit = len(jsonRes["results"])

        if limit < max_per_page:
            max_per_page = limit

        for j in range(0, max_per_page):
            try:

                if jsonRes["results"][j]["taxon"] == None:
                    continue

                info_id = jsonRes["results"][j]["taxon"]["id"]

                # example call:
                # https://api.inaturalist.org/v1/taxa/3017

                description_url = "https://api.inaturalist.org/v1/taxa/" + str(info_id)

                description_response = requests.get(description_url)

                if description_response.status_code != 200:
                    print("Description URL not found")
                    continue

                summary = json.loads(description_response.text)

                info_location = states[i]
                info_scientificName = jsonRes["results"][j]["taxon"]["name"]

                if (
                    jsonRes["results"] == None
                    or len(jsonRes["results"]) == 0
                    or jsonRes["results"][j]["taxon"] == None
                    or jsonRes["results"][j]["taxon"]["default_photo"] == None
                ):
                    continue

                # print(info_scientificName)
                info_picURL = jsonRes["results"][j]["taxon"]["default_photo"][
                    "medium_url"
                ]
                info_commonName = jsonRes["results"][j]["taxon"][
                    "preferred_common_name"
                ]
                info_numObser = jsonRes["results"][j]["taxon"]["observations_count"]
                info_description = summary["results"][0]["wikipedia_summary"]
                info_isExtinct = jsonRes["results"][j]["taxon"]["extinct"]
                info_rank = jsonRes["results"][j]["taxon"]["rank"]
                info_lastSighting = jsonRes["results"][j]["time_observed_at"]
                info_taxonName = jsonRes["results"][j]["taxon"]["iconic_taxon_name"]
                info_ancestry = jsonRes["results"][j]["taxon"]["ancestry"].replace(
                    "/", ", "
                )

                exists = Animal.query.filter_by(animal_id=info_id).scalar() is not None

                # print (exists)

                if not exists and None not in (
                    info_id,
                    info_location,
                    info_scientificName,
                    info_picURL,
                    info_commonName,
                    info_numObser,
                    info_description,
                    info_isExtinct,
                    info_rank,
                    info_lastSighting,
                    info_taxonName,
                    info_ancestry,
                ):
                    db.session.add(
                        Animal(
                            animal_id=info_id,
                            animal_location=info_location,
                            animal_scientificName=info_scientificName,
                            animal_picURL=info_picURL,
                            animal_commonName=info_commonName,
                            animal_numObser=info_numObser,
                            animal_description=info_description,
                            animal_isExtinct=info_isExtinct,
                            animal_rank=info_rank,
                            animal_lastSighting=info_lastSighting,
                            animal_taxonName=info_taxonName,
                            animal_ancestry=info_ancestry,
                        )
                    )
                    db.session.commit()
                    print("Commit: " + states[i])
                    time.sleep(10)

            except KeyError:
                print("KeyError")
                pass


if __name__ == "__main__":
    getAnimal()
