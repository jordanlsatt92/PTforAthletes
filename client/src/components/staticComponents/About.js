/**
 * @author Jordan Satterfield
 * @description renders information about the site.
 */
import React from "react";
import Symptom_Tutorial from "../../img/Symptom_Tutorial.JPG";

/**
 * @description Renders information regarding the site. This information includes a brief description
 * of the site including the symptoms, video library, and suggested videos and offers a brief tutorial of
 * how to use the site.
 * @returns a rendering of the site information.
 */
const About = () => {
  return <div className="container">
      <h1 className="large text-primary">About Us</h1>
      Thank you for checking out PT for Athletes - your virtual physical therapist!
      <br/><br/>PT for athletes combines video content of exercises and stretches with 
      a symptom tracker to keep you engaged in your recovery. We are not here to
      replace your non-virtual physical therapist; rather, we are here to aid in and
      speed up your recovery!
      <br/><br/>
      Do you have to be an athlete to benefit from PT for Athletes? Of course not! Athletes
      and non-athletes alike experience overuse injuries. Whether you are gearing up for 
      your next ultra marathon or spending fourty hours per week at a desk, we are here to
      help!<br/><br/>
      <div className="large text-primary">Symptom Tracker</div>
      <img src={Symptom_Tutorial} alt="Symptom Tutorial" width="auto" height="auto" className="images"/>
      Create and update your symptoms with our symptom tracker. After creating an account, create a symptom by giving
      the symptom a name, a comma-separated list of body parts that you can pick on a anatomical 
      diagram or just type the names in yourself, then write a description of the problem 
      you are having - be as detailed as you want to be. Then click submit!
      <br/><br/>
      Alternatively, you can click on the "Musculature Anatomy" or "Skeletal Anatomy" buttons and click
      on the areas you wanted to add to the effected anatomy!
      <br/><br/>
      Now
      that you have your first symptom, click on the Updates button. You can then update your
      symptom as it gets better (or worse). <br/><br/>Planning a trip to your physical therapist? 
      Scroll to the bottom of the symptom page and click the Download Symptoms button. You can 
      then bring the downloaded PDF to your physical therapist so they can see an accurate timeline
      of the problem you are having (Hint: this is why it can be helpful to be detailed in your 
      symptoms).
      <br/><br/>
      Worried about your data? Don't be! We believe in privacy. Your health related issues are yours
      to share with whomever you choose. Your data will never be sold or distributed.
      <br/><br/>
      <div className="large text-primary">Video Library</div>
      Scroll or search through the video library of exercises and stretches! You never know when new 
      videos will be added. Once you find a video you would like to watch, click the video and hit play! 
      Follow along with the physical therapist as they guide you through a exercises and stretches. Looking
      for something in particular? Use the search bar to find videos related to a specific body part like "hamstring" 
      or "neck."
      <br/><br/>
      <div className="large text-primary">Suggested Videos</div>
      Not sure what videos to watch? Click the Suggested Videos section in the navigation bar to be directed 
      to a compilation of videos made just for you! This video compilation is based on the symptoms you have 
      in the symptom tracker.
  </div>;
};

export default About;
