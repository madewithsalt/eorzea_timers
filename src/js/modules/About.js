import React from 'react'
import {connect} from 'react-redux';


const googleSheetsLink = "https://docs.google.com/spreadsheets/d/1pqaKo0TM2rJghWWXqOQIqCueJvFV2dPuZUQnNrsRmt8/edit?usp=sharing";

const About = () => (
  <div className="container">
      <div className="col-md-12">
        <h2>Eorzea Timers - An Open Source Project.</h2>
        <h3 className="bordered-header">Version: {VERSION} (<a target="_blank" href="https://github.com/tnbKristi/eorzea_timers/releases">release notes</a>)</h3>

        <p>Please report bugs and data errors at the Github repository <a target="_blank" href="https://github.com/tnbKristi/eorzea_timers">here</a>, or contribute to the code via pull request. <br/> Keep in mind I am a real human with a job, and disrespectful comments &amp; angry demands will be ignored.</p>

        <p>Thanks for your kind support and appreciation for this project.</p>

        <h2>Contribution and Corrections of Data</h2>
        <p>Data used in this app is now managed via a public Google Spreadsheet.</p>
        <p><a href="{googleSheetsLink}" target="_blank">You can view and request additons and corrections here</a></p>

        <h3 className="bordered-header">App Features</h3>
        <ul>
            <li>Uses LocalStorage to save your preferences and watch lists.</li>
            <li>Add your own custom timers! Saved via LocalStorage until you remove them.</li>
            <li>Slots, and x/y coordinates included with all known unspoiled node locations.</li>
            <li>Incredibly easy to update and contribute! <a target="_blank" href="https://github.com/tnbKristi/eorzea_timers">Learn more here.</a></li>
        </ul>

        <h3 className="bordered-header">New for 2.0+!</h3>
        <ul>
          <li>Completely re-written for speed and stability.</li>
          <li>Create and Manage <b>Watch Lists</b> - collections of your most commonly watched sets of nodes.</li>
          <li>More fine-grained control over notifications, down to the node level.</li>
          <li>More data provided for each node.</li>
          <li>Ready to update for 4.0's level 70 nodes!</li>
        </ul>

        <h3 className="bordered-header">F.A.Q</h3>

        <h4>The time seems off by ~3 Eorzean minutes. What's up with that?</h4>
        <p>Eorzean time is calculated from Epoch time -- one hour is 2 minutes, 55 seconds Earth time. Because of this, sometimes the math that rounds the time up or down can be off by about 30 seconds.</p>
        <p>If your time is off by much more than 3 minutes, your computer/phone's time may be off. Check out <a href="http://time.is/" target="_blank">http://time.is/</a> to see if it's a time sync issue.</p>

        <h4>There's a bunch of other timers out there. Why make another one?</h4>
        <p>A few reasons, actually!</p>
        <ul>
          <li>I'm a web developer + huge gathering crazie. I wanted to build something that was exactly what I wanted as I spend a LOT of time gathering and staring at this timer screen. :)</li>
          <li>There isn't an open-source project for timers. I'd rather share my work and hope others help make it better.</li>
          <li>I frankly didn't like the look/feel or features of what exists currently!</li>
        </ul>
        <p>I think it's great that there are lots of options, and I encourage you to <i>not</i> use mine if it doesn't work for you. :) </p>

        <h4>Can you add [insert feature here]?</h4>

        <p>Probably! Please make an suggestion as an issue on the github repo <a target="_blank" href="https://github.com/tnbKristi/eorzea_timers">here</a>!</p>
      </div>
  </div>
);


export default About;
