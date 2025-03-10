import img from "/public/11.png"
import img2 from "/public/12.png"
import img3 from "/public/13.png"
import img4 from "/public/14.png"
import img5 from "/public/15.png"
import img6 from "/public/16.png"
import img7 from "/public/17.png"
import img111 from "/public/111.jpg"

 import "./HomePages.css"
const Homepages = () => {
  return (
    <> 
    <div className="homepage1">
      <div className="homepage1txt">
        <h1>Welcome to DSA Visualizer</h1>
        <p>
          Your ultimate destination for understanding Data Structures and
          Algorithms like never before! Our website provides interactive and
          dynamic visualizations of all major algorithms and data structures,
          making complex concepts easy to grasp.
        </p>
      </div>
      <div>
        {/* Use absolute path since image is in 'public/img/' */}
        <img src={img111}/>
        </div>
    </div>
    <div className="homepage2">
      <div className="homepage2txt">
        <h1>Welcome to DSA Quiz</h1>
        <p>
          Test your knowledge of Data Structures and Algorithms with our interactive quiz! 
          Challenge yourself with a variety of questions designed to enhance your understanding 
          and improve your problem-solving skills.
        </p>
      </div>
      <div>
         <img src={img}/>
      </div>

</div>
<div className="homepage3">
      <div className="homepage3txt">
        <h1>Welcome to Debugging Challenge</h1>
        <p>
          Sharpen your debugging skills with our interactive challenges! 
          Identify and fix errors in code snippets to enhance your problem-solving 
          and analytical thinking abilities.
        </p>
      </div>
      <div>
        {/* Use absolute path since image is in 'public/img/' */}
        <img src={img2}/>
      </div>
</div>
<div className="homepage4">
      <div className="homepage4txt">
        <h1>Contact Us</h1>
        <p>
          Have questions or feedback? We'd love to hear from you! 
          Reach out to us for any queries, suggestions, or collaborations. 
          We're here to help you on your DSA learning journey.
        </p>
      </div>
      <div>
        {/* Use absolute path since image is in 'public/img/' */}
        <img src={img3}/>
      </div>
</div>

    </>
  );
};

export default Homepages;
