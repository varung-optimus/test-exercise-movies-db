<a name="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  
  <!-- PROJECT SHIELDS -->
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]

  [![Yokoy][Yokoy.io]][Yokoy-url]
  
  <h3 align="center">Movies application</h3>

  <p align="center">
    Movies application made for Yokyo
    <br />
    <br />
    <a href="https://varung-optimus.github.io/test-exercise-movies-db/movies">View Demo</a>
    ·
    <a href="https://github.com/varung-optimus/test-exercise-movies-db/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/varung-optimus/test-exercise-movies-db/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
  **Note: Demo will only work if you have local api running using json-server**
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Yokyo Movie][product-screenshot]](https://varung-optimus.github.io/test-exercise-movies-db/movies)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

[![Angular][Angular.io]][Angular-url]
[![Typescript][Typescript.org]][Angular-url]
[![Sass][Sass-lang]][Sass-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started with the project, clone the repo and then follow below steps:

* Install the dependencies
  ```sh
  npm i
  ```

* Start the mock data server
  ```sh
  npm run start-server
  ```

* Preview angular app
  ```sh
  npm start
  ```

<!-- CHANGELOG -->
## Change log

Below are the main architectural changes done:

* Using lazy loaded modules for movies and actors.
* Pluggable theme architecture. All styles can be found in `themes/yokoy-design-system`.
* Generic error handler service.
* Using observables with rxJS operators like debounce instead of promises.
* Leveraging power of SCSS rather than CSS and using variables.
* Reactive form usage to implement validations and key change events.
* Used environment files rather than hardcoding urls in services.
* JSDoc conventions have been followed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap for architecture changes

- [ ] Theme to be deployed to its own private npm and used like `npm i yokoy/theme@1.0.0`.
- [ ] Core components can be moved to its own private npm and used like `npm i yokoy/design-system@1.0.0`.
- [ ] i18n support to be added to avoid hardcoding of text or can be connected to a CMS.
- [ ] CDN to be used to deliver fonts, icons.
- [ ] Unit tests and e2e automation can be implemented to support sanity test.
- [ ] Performance testing and reporting via Google page speed / GTMetrix.
- [ ] Using compodoc to generate technical documentation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Varun Goel - varungoel0806@gmail.com

Project Link: [https://github.com/varung-optimus/test-exercise-movies-db](https://github.com/varung-optimus/test-exercise-movies-db)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-url]: https://github.com/varung-optimus/test-exercise-movies-db//issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/varung-optimus/test-exercise-movies-db/blob/develop/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/varungoel0806/
[product-screenshot]: src/assets/images/screenshot.png
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://v16.angular.io/docs
[Typescript.org]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Yokoy.io]: https://public.onesto.de/wp-content/uploads/2023/07/yokoy.png
[Yokoy-url]: https://yokoy.io/
[Typescript-url]: https://www.typescriptlang.org/
[Sass-lang]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/
