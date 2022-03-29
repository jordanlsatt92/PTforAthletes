import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSymptom } from "../../actions/symptom";
import MuscleAnatomy from "../../img/MusculatureAnatomy.jpg";
import SkeletalAnatomy from "../../img/SkeletalAnatomy.jpg";
import { setAlert } from "../../actions/alert";

const SymptomForm = ({ addSymptom, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    effected_parts: "",
    description: "",
  });

  const { name, effected_parts, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [showMusculatureAnatomy, setshowMusculatureAnatomy] = useState(false);

  const showMusculatureAnatomyHandler = () => {
    if (!showMusculatureAnatomy) setshowMusculatureAnatomy(true);
    else setshowMusculatureAnatomy(false);
  };

  const [showSkeletalAnatomy, setShowSkeletalAnatomy] = useState(false);

  const showSkeletalAnatomyHandler = () => {
    if (!showSkeletalAnatomy) setShowSkeletalAnatomy(true);
    else setShowSkeletalAnatomy(false);
  };
  const addAnatomy = (str) => {
    if (formData.effected_parts.toLowerCase().includes(str.toLowerCase())) {
      setAlert(
        "You have already added " + str + " to the effected anatomy",
        "danger"
      );
      return;
    }
    if (
      formData.effected_parts.length === 0 ||
      formData.effected_parts.trim().length === 0
    ) {
      setFormData({ ...formData, effected_parts: str });
    } else if (
      formData.effected_parts.substring(
        formData.effected_parts.length - 1,
        formData.effected_parts.length
      ) === ","
    ) {
      setFormData({
        ...formData,
        effected_parts: effected_parts.concat(" ", str),
      });
    } else if (
      formData.effected_parts.substring(
        formData.effected_parts.length - 2,
        formData.effected_parts.length
      ) === ", "
    ) {
      setFormData({
        ...formData,
        effected_parts: effected_parts.concat("", str),
      });
    } else if (
      formData.effected_parts.substring(
        formData.effected_parts.length - 1,
        formData.effected_parts.length
      ) !== ","
    ) {
      setFormData({
        ...formData,
        effected_parts: effected_parts.concat(", ", str),
      });
    } else {
      setFormData({
        ...formData,
        effected_parts: effected_parts.concat("", str),
      });
    }
    setAlert(str + " group has been added", "success");
  };

  // const MusculatureAnatomy = () => {
  //   return (
  //     <div>
  //       <img
  //         className="anatomy-picture"
  //         src={MuscleAnatomy}
  //         alt="Musculature Anatomy"
  //         useMap="#image-map"
  //       />
  //       <map name="image-map">
  //         <area
  //           onClick={addAnatomy('chest')}
  //           alt="chest"
  //           title="chest"
  //           coords="126,222,165,181,250,181,290,222,265,266,142,266"
  //           shape="poly"
  //         />
  //         <area
  //           onClick={() => {
  //             console.log("abdominals clicked");
  //           }}
  //           alt="abdominals"
  //           title="abdominals"
  //           coords="132,268,278,268,267,395,198,481,135,388"
  //           shape="poly"
  //         />
  //         <area
  //           onClick={() => {
  //             console.log("biceps clicked");
  //           }}
  //           alt="biceps"
  //           title="biceps"
  //           coords={[
  //             "119,222,94,258,83,322,121,322,127,286",
  //             "289,230,315,262,319,315,293,318,285,286",
  //             "874,242,885,282,874,342,857,291",
  //           ]}
  //           shape="poly"
  //         />
  //       </map>
  //     </div>
  //   );
  // };

  return (
    <div className="symptom-form">
      <div className="bg-primary p">
        <h3>Add a new symptom</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addSymptom({ name, effected_parts, description });
          setFormData({
            name: "",
            effected_parts: "",
            description: "",
          });
        }}
      >
        <textarea
          name="name"
          cols="30"
          rows="1"
          placeholder="Name of symptom"
          value={name}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <textarea
          name="effected_parts"
          cols="30"
          rows="1"
          placeholder="Effected body parts"
          value={effected_parts}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <small className="form-text">
          Please input the body parts that are effected separated by commas.
          e.g. calf, shin, foot
        </small>
        <textarea
          name="description"
          cols="30"
          rows="3"
          placeholder="Symptom description"
          value={description}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
        <button
          className="btn btn-dark my-1"
          onClick={showMusculatureAnatomyHandler}
        >
          {showMusculatureAnatomy ? (
            <div>Hide Musculature Anatomy</div>
          ) : (
            <div>Musculature Anatomy</div>
          )}
        </button>
        <button
          className="btn btn-dark my-1"
          onClick={showSkeletalAnatomyHandler}
        >
          {showSkeletalAnatomy ? (
            <div>Hide Skeletal Anatomy</div>
          ) : (
            <div>Skeletal Anatomy</div>
          )}
        </button>
        {showMusculatureAnatomy && (
          <div>
            <img
              className="anatomy-picture"
              src={MuscleAnatomy}
              alt="Musculature Anatomy"
              useMap="#image-map"
            />
            <map name="image-map">
              <area
                onClick={() => addAnatomy("Chest")}
                alt="chest"
                title="chest"
                coords="126,222,165,181,250,181,290,222,265,266,142,266"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Abdominals")}
                alt="abdominals"
                title="abdominals"
                coords="132,268,278,268,267,395,198,481,135,388"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Abdominals")}
                alt="abdominals"
                title="abdominals"
                coords="886,275,922,271,928,326,931,405,882,382"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Biceps")}
                alt="biceps"
                title="biceps"
                coords="119,222,94,258,83,322,121,322,127,286"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Biceps")}
                alt="biceps"
                title="biceps"
                coords="289,230,315,262,319,315,293,318,285,286"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Biceps")}
                alt="biceps"
                title="biceps"
                coords="874,242,885,282,874,342,857,291"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hip Flexors")}
                alt="Hip Flexors"
                title="Hip Flexors"
                coords={["146,403,198,481,258,409,209,585,194,585"]}
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Quads")}
                alt="Quadriceps"
                title="Quadriceps"
                coords="146,432,197,604,195,628,142,628,118,511"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Quads")}
                alt="Quadriceps"
                title="Quadriceps"
                coords="255,439,209,596,207,637,262,627,282,519"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Quads")}
                alt="Quadriceps"
                title="Quadriceps"
                coords="924,465,900,523,880,636,898,620,927,527"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Tibialis")}
                alt="Tibialis"
                title="Tibialis"
                coords="151,652,189,807,185,807,154,730,147,674"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Tibialis")}
                alt="Tibialis"
                title="Tibialis"
                coords="253,662,222,811,227,814,254,735,258,683"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hand")}
                alt="Hand"
                title="Hand"
                coords="70,445,101,449,98,524,66,542,47,529,34,486"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hand")}
                alt="Hand"
                title="Hand"
                coords="298,458,298,530,327,549,346,538,363,492,330,454"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hand")}
                alt="Hand"
                title="Hand"
                coords="470,460,469,525,441,545,422,532,406,489,434,456"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hand")}
                alt="Hand"
                title="Hand"
                coords="666,482,669,522,699,540,718,525,730,481,701,449"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Forearm")}
                alt="Forearm"
                title="Forearm"
                coords="71,435,78,333,127,343,120,372,102,436"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Forearm")}
                alt="Forearm"
                title="Forearm"
                coords="328,443,330,341,280,345,284,385,298,440"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Forearm")}
                alt="Forearm"
                title="Forearm"
                coords="488,360,471,444,440,445,443,405,439,356"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Forearm")}
                alt="Forearm"
                title="Forearm"
                coords="667,441,644,357,692,355,692,397,696,439"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Forearm")}
                alt="Forearm"
                title="Forearm"
                coords="836,347,874,344,883,379,884,440,859,449"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="95,249,92,216,111,184,127,180,158,182,122,204"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="247,182,290,209,318,256,320,225,312,201,294,185"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="511,201,471,185,454,204,448,226,451,250,479,210"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="615,196,634,189,648,178,674,204,676,249,646,212"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="807,197,840,182,866,184,879,201,867,249,838,249"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Neck")}
                alt="Neck"
                title="Neck"
                coords="179,139,204,154,236,134,235,179,180,178"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Neck")}
                alt="Neck"
                title="Neck"
                coords="532,122,560,107,588,127,590,146,532,146"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Neck")}
                alt="Neck"
                title="Neck"
                coords="831,138,858,174,882,179,879,147,836,113"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Traps")}
                alt="Traps"
                title="Traps"
                coords="160,177,170,155,136,173"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Traps")}
                alt="Traps"
                title="Traps"
                coords="252,181,244,155,280,178"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Traps")}
                alt="Traps"
                title="Traps"
                coords="476,183,532,150,592,150,639,177,606,197,600,265,564,319,526,261,515,197"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Traps")}
                alt="Traps"
                title="Traps"
                coords="794,189,855,174,826,134"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Lats")}
                alt="Lats"
                title="Lats"
                coords="495,268,522,266,555,322,518,398,499,326"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Lats")}
                alt="Lats"
                title="Lats"
                coords="631,264,606,263,576,323,611,387,630,322"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Scapular Muscles")}
                alt="Scapular Muscles"
                title="Scapular Muscles"
                coords="514,206,522,262,492,263,482,214"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Scapular Muscles")}
                alt="Scapular Muscles"
                title="Scapular Muscles"
                coords="610,202,607,259,632,260,643,216"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Triceps")}
                alt="Triceps"
                title="Triceps"
                coords="475,230,451,255,451,289,456,327,486,349,494,286,482,234"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Triceps")}
                alt="Triceps"
                title="Triceps"
                coords="654,225,675,251,674,323,643,337,632,286,644,230"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Triceps")}
                alt="Triceps"
                title="Triceps"
                coords="826,241,839,253,835,331,820,267"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Lower Back")}
                alt="Lower Back"
                title="Lower Back"
                coords="531,398,539,346,563,334,593,358,600,397,570,410"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Glutes")}
                alt="Glutes"
                title="Glutes"
                coords="506,394,571,429,627,389,636,429,632,473,616,490,519,495,402,466,502,431"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Glutes")}
                alt="Glutes"
                title="Glutes"
                coords="819,491,844,493,858,450,842,398,818,406,808,455"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hamstrings")}
                alt="Hamstrings"
                title="Hamstrings"
                coords="510,500,626,494,635,532,628,616,580,656,568,524,551,600,507,633,502,528"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hamstrings")}
                alt="Hamstrings"
                title="Hamstrings"
                coords="822,497,848,505,862,553,859,633,823,632,818,561"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Calves")}
                alt="Calves"
                title="Calves"
                coords="531,647,554,674,560,726,548,830,536,831,528,784,503,726,507,660"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Calves")}
                alt="Calves"
                title="Calves"
                coords="604,647,580,668,574,718,582,830,592,830,663,778,628,724,626,663"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Calves")}
                alt="Calves"
                title="Calves"
                coords="815,779,858,674,847,633,816,648,795,719,804,774"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Foot")}
                alt="Foot"
                title="Foot"
                coords="155,888,155,874,166,839,246,842,259,888"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Foot")}
                alt="Foot"
                title="Foot"
                coords="525,856,602,855,615,886,509,884,511,866"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("TFL")}
                alt="TFL"
                title="TFL"
                coords="907,392,923,407,925,447,914,480,895,452,906,421"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("IT band")}
                alt="IT band"
                title="IT band"
                coords="881,540,893,553,881,611,878,632,870,632,874,604,881,563"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Foot")}
                alt="Foot"
                title="Foot"
                coords="797,851,855,832,929,867,929,884,798,880"
                shape="poly"
              />
            </map>
          </div>
        )}
        {showSkeletalAnatomy && (
          <div>
            <img
              className="skeletal-picture"
              src={SkeletalAnatomy}
              alt="Skeletal Anatomy"
              useMap="#image-map1"
            />
            <map name="image-map1">
              <area
                onClick={() => addAnatomy("Neck")}
                alt="Neck"
                title="Neck"
                coords="263,187,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Neck")}
                alt="Neck"
                title="Neck"
                coords="603,177,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="329,221,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="195,221,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="527,221,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Shoulder")}
                alt="Shoulder"
                title="Shoulder"
                coords="677,221,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Elbow")}
                alt="Elbow"
                title="Elbow"
                coords="715,378,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Elbow")}
                alt="Elbow"
                title="Elbow"
                coords="163,375,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Elbow")}
                alt="Elbow"
                title="Elbow"
                coords="375,374,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Elbow")}
                alt="Elbow"
                title="Elbow"
                coords="499,372,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Wrist")}
                alt="Wrist"
                title="Wrist"
                coords="131,506,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Wrist")}
                alt="Wrist"
                title="Wrist"
                coords="397,514,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Wrist")}
                alt="Wrist"
                title="Wrist"
                coords="475,510,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Wrist")}
                alt="Wrist"
                title="Wrist"
                coords="747,506,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Knee")}
                alt="Knee"
                title="Knee"
                coords="223,707,20"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Knee")}
                alt="Knee"
                title="Knee"
                coords="301,711,20"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Knee")}
                alt="Knee"
                title="Knee"
                coords="561,709,20"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Knee")}
                alt="Knee"
                title="Knee"
                coords="643,707,20"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Ankle")}
                alt="Ankle"
                title="Ankle"
                coords="231,917,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Ankle")}
                alt="Ankle"
                title="Ankle"
                coords="295,919,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Ankle")}
                alt="Ankle"
                title="Ankle"
                coords="569,911,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Ankle")}
                alt="Ankle"
                title="Ankle"
                coords="633,913,17"
                shape="circle"
              />
              <area
                onClick={() => addAnatomy("Spine")}
                alt="Spine"
                title="Spine"
                coords="591,205,579,403,625,403,613,205"
                shape="poly"
              />
              <area
                onClick={() => addAnatomy("Hip")}
                alt="Hip"
                title="Hip"
                coords="191,537,337,419"
                shape="rect"
              />
              <area
                onClick={() => addAnatomy("Hip")}
                alt="Hip"
                title="Hip"
                coords="529,537,673,421"
                shape="rect"
              />
            </map>
          </div>
        )}
      </form>
    </div>
  );
};

SymptomForm.propTypes = {
  addSymptom: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addSymptom, setAlert })(SymptomForm);
