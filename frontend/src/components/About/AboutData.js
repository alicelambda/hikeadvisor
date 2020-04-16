import alice from '../../images/blurb/alice.png';
import austin from '../../images/blurb/austin.jpg';
import nabil from '../../images/blurb/nabil.png';
import josh from '../../images/blurb/josh.jpg';
import long from '../../images/blurb/long.png';


const blurbData = [
    {
        "name": "Alice Reuter",
        "role": "Frontend",
        "description": "I worked on the frontend design theme and the about and trails model. I am a second year Computer Science major interested in systems programming and cybersecurity. When not programming I enjoy bouldering and cat memes.",
        "noissues": 0,
        "nocommits": 9,
        "notestcases": 22,
        "username": "alicelambda",
        "photo": alice
    },
    {
        "name": "Austin Aurelio",
        "role": "Backend",
        "description":"I worked on the user experience of the website and handled user feedback to decide what features to add. I am a second year Computer Science major and I always use the light theme.",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"austinrandy0209",
        "photo":austin
    },
    {
        "name": "Nabil Zubair",
        "role": "Backend",
        "description":"I am a junior majoring in computer science and minoring in Japanese. Some of my hobbies include playing the piano, video games, and cooking. I worked on the backend and tested functionality for both the backend and frontend.",
        "noissues":0,
        "nocommits":9,
        "notestcases":110,
        "photo":nabil,
        "username":"nzubair76"
    },
    {
        "name": "Josh Trunick",
        "role": "Frontend",
        "description":"I worked on the frontend, desining the homepage as well as the animals and states models. I'm a senior majoring in Computer Science interested in web and mobile dev. You can catch me either cooking a new recipe, slinging a frisbee or pitching a startup idea to my friends.",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"jtrunick",
        "photo":josh
    },
    {
        "name": "Long Do",
        "role": "Backend",
        "description":"I worked on the backend. I worked with database, implemented API and helped fixing bug on the frontend. I'm a junior CS student. Hobbies include: animes, video games and cooking",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"LongDo16",
        "photo":long
    }
]

const blurb = `
Hike Advisor helps you to discover the joy of hiking. It tells you in real-time what animals you would be able to see on your favourite hiking trails! Have you ever been on a hike and wondered to yourself, "What types of animals will I be able to see today?" Well, Hike Advisor can help with that! Do you want to see a Red Shouldered Hawk or a Freetail Bat? Then hike on a trail where they have been recently spotted! Hike Advisor is for anyone who enjoys the outdoors and spotting animals.


`

export { blurb, blurbData };

const x = [
    {
        "state_animals":
            ["40269", "Vesper Bats", "120215", "Brown-belted Bumble Bee"],
        "state_capital": "Montgomery",
        "state_elevation": 492.1,
        "state_flagPicURL": " https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Alabama_%281861%2C_obverse%29.svg",
        "state_highest": "Cheaha Mountain, 2405 ft",
        "state_landArea": 50650,
        "state_lat": 32.31823,
        "state_long": -86.902298,
        "state_lowest": "Gulf of Mexico, 0 ft",
        "state_mapPicURL": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Alabama_in_United_States.svg",
        "state_motto": "Audemus jura nostra defendere",
        "state_name": "Alabama",
        "state_population": "4.875 million people",
        "state_populationDensity": "92.99 people/mi^2",
        "state_timezone": "CDT",
        "state_totalArea": 52420,
        "state_trails": ["7042916", "Narrows Ridge Full Loop", "7085494", "Wolfden Loop"]
    },
    {
        "trail_animals": ["4246", "Pied-billed Grebe", "145245", "Yellow-rumped Warbler"],
        "trail_ascent": 1390,
        "trail_descent": -1390,
        "trail_high": 5707,
        "trail_id": 7000108,
        "trail_latitude": 37.2594,
        "trail_length": 4.4,
        "trail_location": "Springdale, Utah",
        "trail_longitude": -112.9507,
        "trail_low": 4321,
        "trail_mapPicURL": "https://maps.googleapis.com/maps/api/staticmap?center=37.2594,-112.9507&zoom=12&size=400x400&key=AIzaSyDiDwoPvTLCXHS4J-qNDVHfDu27JIlWnv4",
        "trail_name": "Angels Landing",
        "trail_numstars": 539,
        "trail_picURL": "https://cdn-files.apstatic.com/hike/7010203_medium_1554398018.jpg",
        "trail_stars": 4.9,
        "trail_states": "Utah"
    },
    {
        "animal_ancestry": "48460",
        "animal_commonName": "Animals",
        "animal_description": "Animals are eukaryotic, multicellular organisms that form the biological kingdom Animalia. With few exceptions, animals are motile (able to move), heterotrophic (consume organic material), reproduce sexually, and their embryonic development includes a blastula stage. The body plan of the animal derives from this blastula, differentiating specialized tissues and organs as it develops; this plan eventually becomes fixed, although some undergo metamorphosis at some stage in their lives.",
        "animal_id": 1,
        "animal_isExtinct": false,
        "animal_lastSighting": "2020-03-08T10:03:38-04:00",
        "animal_location": "Vermont",
        "animal_numObser": 19495047,
        "animal_picURL": "https://static.inaturalist.org/photos/55133652/medium.jpg?1572218969",
        "animal_rank": "kingdom",
        "animal_scientificName": "Animalia",
        "animal_taxonName": "Animalia",
        "animal_taxonNetwork": "https://hikingadvisor-static.s3.amazonaws.com/Animalia.gif",
        "animal_trails": ["7002742", "Franconia Ridge Loop", "7003385", "The Presidential Traverse"]
    }];