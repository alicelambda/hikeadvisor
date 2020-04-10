import alice from '../../images/blurb/alice.png';
import austin from '../../images/blurb/austin.jpg';
import nabil from '../../images/blurb/nabil.png';
import josh from '../../images/blurb/josh.jpg';
import long from '../../images/blurb/long.png';


const blurbData = [
    { 
        "name": "Alice Reuter",
        "role": "Frontend",
        "description":"I am a second year Computer Science major interested in systems programming and cybersecurity. When not programming I enjoy bouldering and cat memes.",
        "noissues":0,
        "nocommits":9,
        "notestcases":1,
        "username": "alicelambda",
        "photo":alice
    }, 
    {
        "name": "Austin Aurelio",
        "role": "Backend",
        "description":"I am a second year Computer Science major and I always use the light theme.",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"austinrandy0209",
        "photo":austin
    },
    {
        "name": "Nabil Zubair",
        "role": "Backend",
        "description":"I am a junior majoring in computer science and minoring in Japanese. Some of my hobbies include playing the piano, video games, and cooking.",
        "noissues":0,
        "nocommits":9,
        "notestcases":110,
        "photo":nabil,
        "username":"nzubair76"
    },
    {
        "name": "Josh Trunick",
        "role": "Frontend",
        "description":"I'm a senior majoring in Computer Science interested in web and mobile dev. You can catch me either cooking a new recipe, slinging a frisbee or pitching a startup idea to my friends.",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"jtrunick",
        "photo":josh
    },
    {
        "name": "Long Do",
        "role": "Backend",
        "description":"I'm a junior CS student. Hobbies include: animes, video games and cooking",
        "noissues":0,
        "nocommits":9,
        "notestcases":0,
        "username":"LongDo16",
        "photo":long
    }
]

const blurb= `
Hike Advisor helps you to discover the joy of hiking. It tells you in real-time what animals you would be able to see on your favourite hiking trails! Have you ever been on a hike and wondered to yourself, "What types of animals will I be able to see today?" Well, Hike Advisor can help with that! Do you want to see a Red Shouldered Hawk or a Freetail Bat? Then hike on a trail where they have been recently spotted! Hike Advisor is for anyone who enjoys the outdoors and spotting animals.


`

export {blurb,blurbData};