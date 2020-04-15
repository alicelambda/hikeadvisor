import requests
import json
import unittest

api_link = "https://api.hikeadvisor.me/api"
ANIMAL_PROPERTIES = [
    "animal_ancestry",
    "animal_commonName",
    "animal_description",
    "animal_id",
    "animal_isExtinct",
    "animal_lastSighting",
    "animal_location",
    "animal_numObser",
    "animal_picURL",
    "animal_rank",
    "animal_scientificName",
    "animal_taxonName",
]
STATE_PROPERTIES = [
    "state_capital",
    "state_elevation",
    "state_flagPicURL",
    "state_highest",
    "state_landArea",
    "state_lat",
    "state_long",
    "state_lowest",
    "state_motto",
    "state_name",
    "state_population",
    "state_populationDensity",
    "state_timezone",
    "state_totalArea",
]
TRAIL_PROPERTIES = [
    "trail_ascent",
    "trail_descent",
    "trail_high",
    "trail_id",
    "trail_latitude",
    "trail_length",
    "trail_location",
    "trail_longitude",
    "trail_low",
    "trail_name",
    "trail_numstars",
    "trail_picURL",
    "trail_stars",
    "trail_states",
]


class Unit_Tests(unittest.TestCase):

    # ANIMAL TESTS
    def test_animal_model_status_code(self):
        response = requests.request("GET", api_link + "/animal")
        self.assertEqual(response.status_code, 200)

    def test_animal_model_data(self):
        response = requests.request("GET", api_link + "/animal")
        data = response.json()
        data_array = data["objects"]
        assert "num_results" in data
        assert "page" in data
        assert "total_pages" in data
        for prop in ANIMAL_PROPERTIES:
            assert prop in data_array[0]

    def test_animal_model_paging(self):
        response = requests.request("GET", api_link + "/animal?page=3")
        data = response.json()
        data_array = data["objects"]
        assert "num_results" in data
        assert "page" in data
        assert "total_pages" in data
        for prop in ANIMAL_PROPERTIES:
            assert prop in data_array[0]

    def test_animal_instance_status_code(self):
        response = requests.request("GET", api_link + "/animal/3454")
        self.assertEqual(response.status_code, 200)

    def test_animal_instance_data(self):
        response = requests.request("GET", api_link + "/animal/3454")
        data = response.json()
        for prop in ANIMAL_PROPERTIES:
            assert prop in data

    # STATE TESTS
    def test_state_model_status_code(self):
        response = requests.request("GET", api_link + "/state")
        self.assertEqual(response.status_code, 200)

    def test_state_model_data(self):
        response = requests.request("GET", api_link + "/state")
        data = response.json()
        data_array = data["objects"]
        assert "num_results" in data
        assert "page" in data
        assert "total_pages" in data
        for prop in STATE_PROPERTIES:
            assert prop in data_array[0]

    def test_state_model_paging(self):
        response = requests.request("GET", api_link + "/state?page=3")
        data = response.json()
        data_array = data["objects"]
        assert "num_results" in data
        assert "page" in data
        assert "total_pages" in data
        for prop in STATE_PROPERTIES:
            assert prop in data_array[0]

    def test_state_instance_status_code(self):
        response = requests.request("GET", api_link + "/state/Texas")
        self.assertEqual(response.status_code, 200)

    def test_state_instance_data(self):
        response = requests.request("GET", api_link + "/state/Texas")
        data = response.json()
        for prop in STATE_PROPERTIES:
            assert prop in data

    # TRAIL TESTS
    def test_trail_model_status_code(self):
        response = requests.request("GET", api_link + "/trail")
        self.assertEqual(response.status_code, 200)

    def test_trail_model_data(self):
        response = requests.request("GET", api_link + "/trail")
        data = response.json()
        data_array = data["objects"]
        for prop in TRAIL_PROPERTIES:
            assert prop in data_array[0]

    def test_trail_model_paging(self):
        response = requests.request("GET", api_link + "/trail?page=3")
        data = response.json()
        data_array = data["objects"]
        assert "num_results" in data
        assert "page" in data
        assert "total_pages" in data
        for prop in TRAIL_PROPERTIES:
            assert prop in data_array[0]

    def test_trail_instance_status_code(self):
        response = requests.request("GET", api_link + "/trail/7000056")
        self.assertEqual(response.status_code, 200)

    def test_trail_instance_data(self):
        response = requests.request("GET", api_link + "/trail/7000056")
        data = response.json()
        for prop in TRAIL_PROPERTIES:
            assert prop in data


    #SEARCH TESTS
    def test_search_status_code(self):
    	response = requests.request("GET", api_link + "/search?q=Texas")
    	self.assertEqual(response.status_code, 200)

    def test_search_data(self):
    	response = requests.request("GET", api_link + "/search?q=Texas")
    	data = response.json()
    	assert "num_animals" in data
    	assert "num_states" in data
    	assert "num_trails" in data
    	assert "animals" in data["result"]
    	assert "states" in data["result"]
    	assert "trails" in data["result"]




if __name__ == "__main__":
    unittest.main()
