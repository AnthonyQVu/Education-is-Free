import React, { useRef, useEffect, useState } from 'react';
import './reset.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Modal from "./Modal/Modal";
import useModal from "./Modal/useModal";

console.log("version", d3.version);


let array = [];
let curObj = {};
export {curObj};
let height;
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function ScrollToSubjects() {
  // Use height of gif to find where to scroll; scroll accordingly.
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, height);
  }, [pathname]);
  return null;
}



/* App */
function App() {

  const [dataArray, setData] = useState(null);

  if (dataArray == null) {
    console.log("reading csv file");
    d3.csv("./6-3-324pm.csv").then
    // convert data to usable form
    (function(data) {
      console.log("getting data");
      data.forEach(function(d) {
        d.subject = d['']
        d.video = d['YouTube video link.  Use a link to somewhere in the middle of the lecture, not the beginning, which is usually boring. ']
        d.thumbnail = d['Thumbnail link.']
        d.course = d['Course or Lecture Series name'];
        d.university = d['University '];
        d.professor = d['Professor or Speaker'];
        d.name = d['Your name'];
      });
      setData(data);
    });
  }

  array = dataArray;
  console.log("CSV Read into Array:");
  console.log(array);
  const routes = CreateSubjectRoute();
  return (
    <Router>
      <div>
        <Switch>
          {routes}  
        </Switch> 
      </div>  
    </Router>
  );
}


/* Home Page */
function Home() {
  let links = CreateSubjectLink();
  return(
    <div id='splashpage'>
      <div id='main'>
        <div id="splashgif-container">
          <img id = "gif" src="src/neonsign-home.gif"/>
          <div id = "homeText"> 
            <div id = "splashtext">
              <p>College is becoming ever more expensive, but it is also true that great college courses, for free, are just a click away...</p>
            </div>
            <div id = "scroll">
              <p>SCROLL DOWN TO EXPLORE</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
        </div>
        </div>
        <div id = "select">
          <p>SELECT A SUBJECT TO GET STARTED</p>
        </div>
        {links}
    </div>
  );
}


// Home Page user lands on after clicking something;
// this makes sure that when they return they're brought to the top of the subjects on
// their screen.
function AltHome() {
  // If they try to refresh, bring them back home
  try {
    document.getElementById('splashpage').style.display = "none";
  } catch(error) {
    return (<div><Redirect to="/" /></div>)
  }
  ScrollToSubjects();
  let links = CreateSubjectLink();
  return(
    <div>
      <div id='main'>
        <div id="splashgif-container">
          <img id = "gif" src="src/neonsign-home.gif"/>
          <div id = "homeText"> 
            <div id = "splashtext">
              <p>College is becoming ever more expensive, but it is also true that great college courses, for free, are just a click away...</p>
            </div>
            <div id = "scroll">
              <p>SCROLL DOWN TO EXPLORE</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
        </div>
        </div>
        <div id = "select">
          <p>SELECT A SUBJECT TO GET STARTED</p>
        </div>
        {links}
    </div>
  );
}

function Everything(inpsub) {
  // Makes sure splash page disappears when showing schools/subjects, workaround
  // bc dynamically adding routes messed things up :)
  // If the element is not there i.e. they refresh the page at any point that's not the home page, redirect them back.
  
  try {
    let gifheight = document.getElementById("gif").clientHeight;
    // Get pixel height of initial splash to find out how far to scroll when the user 
    // needs to go back to the splash.
    if(gifheight > 0) {
      height = gifheight;
    }
  } catch(error) {
    return (<div><Redirect to="/" /></div>)
  }
  try {
    document.getElementById('splashpage').style.display = "none";
  } catch(error) {
    return (<div><Redirect to="/" /></div>)
  }
  ScrollToTop();
  if(array == null) {
    return (<div> hi </div>);
  }

  let sub = [];
  for (let i = 0; i<array.length; i++){
    if(array[i].subject == inpsub) {
      console.log("getting courses");
      sub.push(array[i]);
    }
  }

  console.log("sub is");
  console.log(sub);
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < sub.length; i++) {
        let school = "school";
        school = school+(i+1);
        document.getElementById(school).textContent = sub[i].course;
        document.getElementById(school).style.fontSize = "19px";
      }
    }, 4000);

    const int = setInterval(() => {
      for (let i = 0; i < sub.length; i++) {
        let school = "school";
        school = school+(i+1);
        document.getElementById(school).textContent = sub[i].university;
        document.getElementById(school).style.fontSize = "30px";
      }      
    }, 8000);
    return () => {
      clearInterval(interval);
      clearInterval(int);
    }
  }, []);

  

  let schoolArray = [];
  for (let i = 0; i < sub.length; i++) {
    let school = "school";
    school = school+(i+1);
    schoolArray.push(<span id={school} class='schools' onClick={ () => setSchool(sub[i], school)}> {sub[i].university}</span>)
  } 

  function setSchool(obj, curSchool) {
    let s = "#" + curSchool;
    const sch = document.querySelector(s);
    let schstyle = getComputedStyle(sch);
    let curColor = schstyle.color;
    curObj = obj;
    curObj.color = curColor;
    toggleModal();
  }

  const {isVisible, toggleModal} = useModal()
  
  return(
  <div id="subjectcontainer"> 
    <header id="backcontainer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="backbtnsvg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
      <button><Link to="/Home" id ="backbtn">Back</Link></button>
    </header>

      <Modal isVisible={isVisible} hideModal={toggleModal} />
    {schoolArray}
  </div>
  );
}

function CreateSubjectLink() {
  if(array != null) {
  let subjects = [...new Set(array.map(x => x.subject))];
  const removeSpaces = str => str.replace(/\s/g, '');
  let subjectArray = [];
  for(let i = 1; i < subjects.length; i++) {
    let nows = removeSpaces(subjects[i])
    let subject = "subject";
    subject = subject+(i);
    subjectArray.push(
      <Link to={'/' + nows} style={{ textDecoration: 'none' }}>
        <span id={subject} class='subject'> {subjects[i]} </span>
      </Link>)
  }
  console.log("Subject array is ");
  console.log(subjectArray);
  return(
  <div>
    {subjectArray}
  </div>
  );
  } else {
    return(
      <div>
      Error: Could not read csv
      </div>
    )
  }
}

const CreateSubjectRoute = ()=>{
  if(array != null) {
    let subjects = [...new Set(array.map(x => x.subject))];
    let routeArray = [];
    routeArray.push(
      <Route path="/">
          <Home />
      </Route>
    )
    routeArray.push(
      <Route path="/Home">
          <AltHome />
      </Route>
    )
    const removeSpaces = str => str.replace(/\s/g, '');
    for(let i = 1; i < subjects.length; i++) {
        const CurFunc = ()=>{
          return(Everything(subjects[i]));
        }
        let nows = removeSpaces(subjects[i]);
        routeArray.push(
        <Route path={'/' + nows}>
          <CurFunc />
        </Route>
        );
    }
    console.log("Route array is");
    console.log(routeArray);
    return(
      <div>
        {routeArray}
      </div>   
    );
  }
}

export default App;
