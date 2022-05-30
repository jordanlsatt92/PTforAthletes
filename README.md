# PTforAthletes
Virtual Physical Therapist Application
The site can be reached at https://ptforathletes.herokuapp.com/

PT for Athletes is a Mongo DB, Express.js, React.js, and Node.js (MERN) full stack RESTful web application.

PT for Athletes is a web application that acts as a virtual physical therapist. The application consists of multiple parts, one of which is a searchable video library. The video library consists of exercises and stretches that educate the user on injuries and pain and the exercises and stretches that improve and prevent those symptoms. The users can follow along with the videos or simply educate themselves on the techniques used to improve or prevent injury. The videos are created by physical therapists that carry the degrees and authority to recommend exercises and stretches that have shown to improve the conditions of injuries.

The web application also contains a symptom tracker. The symptom tracker allows the users to input new symptoms, update existing symptoms, and delete those symptoms once they no longer exist. The users can either manually enter the names of the effected anatomy or use the interactive diagrams to click on a particular area of the body. Users can update the symptoms by entering what exercises and/or stretches improved the symptom and whether the symptom has worsened and what may have caused the declination. The application suggests videos with exercises and stretches from the video library that target the symptoms the user is experiencing. The users can generate a report containing their symptoms that they can then share with a healthcare provider, such as physical therapist.

PT for Athletes is designed for athletes and fitness enthusiasts that regularly train. This application is not meant to replace the users’ healthcare providers; rather, it is to supplement those who do not have a sports medicine team to support them or those that do not have the time and resources to educate themselves on the techniques needed to prevent and improve injury. PT for Athletes gives the users access to the knowledge of physical therapists without having to pay the high monetary costs. Additionally, users can be assured they are receiving accurate up-to-date information from someone with the credentials needed to give such information.

Mongoose (a Mongo DB modeling tool) was used to create schemas for Users, Symptoms, and Videos. Each schema maps to a Mongo DB collection (database table in SQL terms).

This application uses Express to implement HTTP requests and routes. These routes include get, put, post, and delete requests for Users, Symptoms, and Videos.

User authentication is implemented using JSON Web Tokens (JWT). The user is granted a JWT upon account registration or successful login. Each time a request is sent, the JWT is sent in the header and it is verified that it belongs to the specific user and that it is a valid token.

Front end implementation was done with React.js and CSS. This implementation includes the mapping of the anatomical diagrams using the <map/> tags, the search bar for searching through the videos, as well as recommending videos using JavaScript and JSX.

To test or use the site, visit https://ptforathletes.herokuapp.com/. Click the "Register" button to be redirected to the account registration form. Fill out a name, email (the email can be fake as long as it is in the name@domain.type format), password, and an answer to a security question. Upon submission, you will be logged in and redirected to the Symptoms view where you can enter new symptoms. You can click the Show Musculature Anatomy or the Show Skeletal Anatomy buttons to display anatomical diagrams. You can click areas of those pictures to add that particular area of anatomy to the Effected Anatomy text field.

After adding a symptoms or two, check out the Videos or Suggested Videos views to watch a physical therapist demonstrate an exercise or stretch for a particular area of the body.

Acknowledgements:
My mentors through the project: Dr. Farzana Rashid, Dr. Marietta Cameron, and Dr. Adam Whitley.
Wes Miller and Jeff Meadows of Antifragile Physical Therapy for allowing me to use their video property.