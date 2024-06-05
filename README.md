<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">YourTurn</h3>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Create/Join Swarms](https://github.com/394-s24/YourTurn/assets/70890097/e0fcd287-ff3f-4a7d-bf00-3fa1037d2270)
![Swarm Timer](https://github.com/394-s24/YourTurn/assets/70890097/5b7966b0-6f57-4a04-9fc5-46ed9df2227c)

A swarm rotation timer and more!
* rotation timer alarm with two-minute warning
* can customize timer duration and pause/resume at will
* view queue to prepare in advance
* one-click rotation order generation to ensure fair "who's on first"

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Node][Node.js]][Node-url]
* [![Vite][Vite React Template]][vite-url]
* [![Firebase][Firebase]][Firebase-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

These are instructions on setting up our project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/394-s24/YourTurn.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add the firebase configuration to App.jsx
   ```sh
   const firebaseConfig = {
   apiKey: "firebase API key here",
   authDomain: "firebase domain here",
   projectId: "firebase project id",
   storageBucket: "firebase storage bucket",
   messagingSenderId: "firebase messaging sender id",
   appId: "firebase app id",
   measurementId: "firebase measurement id"
   };
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Firebase Configuration
1. Login to Firebase.
   ```sh
   firebase login
   ```
Follow the instructions in the browser and use your Google account credentials to sign in.
If you don't have a Google account, go to [Google Account](https://accounts.google.com/signup), fill in the required details such as First Name, Last Name, Username, and Password, and follow the prompts to verify your account.

2. Initialize Firebase.
   ```sh
   firebase init
   ```
* What Firebase features do you want? Pick
    - Database for the Realtime Database
    - Hosting if you want to deploy your web app onto the Firebase server
* What Firebase project to connect to? Pick the one you created. 
* What is your public directory? Enter dist. Do not accept the default value "public".
* Is this a single page webapp? Say Yes.
* Overwrite dist/index.html? Say No.
* Add Github Integration. Say No. 

No starting data has to be imported into the database. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Known Bugs
Currently, there are no known bugs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Start a swarm by entering your name and clicking 'Create New Swarm'. Alternatively, you can also enter a room code and click 'Join Swarm' to join an existing swarm. Once you're in, set the timer to your required duration and click 'Start'. You can then pause, resume and reset the timer at will. You can also enter the time at which you would like a warning for how many minutes are left in the rotation. View the queue right below the timer to see who's next. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Swarm Creation and Room Code Generation
    - [x] Join or Leave Existing Swarm
- [x] Set Timer Duration
- [x] Start/Pause the Timer
- [x] Set Time for Warning Notification
    - [x] Visual + Audio Notification
- [ ] Manually End a Swarm

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Team Orange - Anoushka, Joel, Carol, Hong, Rachel, Eric

Project Link: [https://github.com/394-s24/YourTurn](https://github.com/394-s24/YourTurn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/394-s24/YourTurn.svg?style=for-the-badge
[contributors-url]: https://github.com/394-s24/YourTurn/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/394-s24/YourTurn.svg?style=for-the-badge
[forks-url]: https://github.com/394-s24/YourTurn/network/members
[stars-shield]: https://img.shields.io/github/stars/394-s24/YourTurn.svg?style=for-the-badge
[stars-url]: https://github.com/394-s24/YourTurn/stargazers
[issues-shield]: https://img.shields.io/github/issues/394-s24/YourTurn.svg?style=for-the-badge
[issues-url]: https://github.com/394-s24/YourTurn/issues
[license-shield]: https://img.shields.io/github/license/394-s24/YourTurn.svg?style=for-the-badge
[license-url]: https://github.com/394-s24/YourTurn/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
[Vite React Template]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD400
[vite-url]: https://vitejs.dev/

