<h1 align="center">HMS :hospital: </h1>
<p align="center">Open source Hospital Management System (HMS) <p>

<p align="center">
<a href="https://travis-ci.com/ospic/webapp"><img alt="Deployment" src="https://github.com/ospic/webapp/actions/workflows/webapp.js.yml/badge.svg"></a><a href="https://github.com/ospic/actions" target="_blank"><img alt="GitHub Actions " src="https://github.com/ospic/webapp/workflows/Auto%20Assign%20to%20Project(s)/badge.svg"></a> <a href="https://sourceforge.net/p/ospic/"><img src="https://sourceforge.net/sflogo.php?type=11&group_id=3283394" alt="SourceForge"></a>
</p>

Ospic Web App is the renovated version of the Ospic applications, an effective hospital resource and patient management system and a default web application for its built on top of its own [platform](https://github.com/ospic/platform).

It is a simple SPA written in modern standard web technologies such as [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). It grasp the popular [VueJs](https://vuejs.org/) framework and [Nuxt](https://nuxtjs.org/), a free and open source web application framework for VueJs, NodeJs and Webpack
<a href="http://ospic.github.io/webapp/" target="_blank"><img src="https://github.com/ospic/webapp/blob/master/assets/images/screenshot.png?raw=true"/></a>

## Usefulness

Ospic seems the health system is one of essential socio-economic activities; therefore, it requires rational and effective management. Hospital management systems allows us the ability to optimize and digitize all the processes within the health institution, which will help to improve customer service, reduce process costs, streamline the search of medical records, bills, patients, doctors, etc.; thus, having a database of each module implemented. Having a hospital management system in place will benefit an organization with **Tract financials better**,**Secure your data i.e hospital and patient datas**,**Eradicate Errors (esp. Human Errors)**,**Make Diagnosis and Treatment Easier**,**Increase Patient Satisfaction**,**Improve Hospital Quality Ratings** and [More...](https://electronichealthreporter.com/importance-of-the-hospital-management-system/)

## Getting started using

- Live server [Click Here](http://app.ospicx.com/)
- Github pages: [Click Here](https://ospic.github.io/webapp/)

Login Credentials:

```
 Username: `demo`
 Password: `password`
```

## Getting started (Developing)

1. Ensure you have the following installed in your system:

   [`git`](https://git-scm.com/downloads), [`npm`](https://nodejs.org/en/download/)

2. Install [vuejs and vue-cli](https://vuejs.org/v2/guide/installation.html).

3. Clone the project

```
git clone https://github.com/ospic/webapp.git
```

4. `cd` into project root directory.

5. Install the dependencies.

```
npm install
```

6. To preview the app, run `npm run dev` and navigate to `http://localhost:8000` in your browser.
7. In your project go to `plugins/axios.js` and comment this line.

```javascript
api.setBaseURL(
  process.env.NODE_ENV === "production"
    ? process.env.baseUrl
    : process.env.localUrl
);
```

conversely remove comment from this line.

```javascript
/* api.setBaseURL(process.env.baseUrl); */
```

Refresh page and the application is using the development server with basic authentication by default. The credentials for the same are:

```
   Username - demo
   Password - password

```

## Api documentations

Platform api's are well written in Swagger and we improve this documentation daily. [Click to get started working with api's](https://ospicapi.herokuapp.com/api/swagger-ui.html#)
<a href="http://ospic.github.io/webapp/" target="_blank"><img src="https://github.com/ospic/webapp/blob/master/assets/images/swagger.png?raw=true"/></a>

## Open application in Gitpod

For quick start you can open this poroject in online IDE GitPod.io right away! [![Code Now! (Gitpod)](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ospic/webapp)

## Contribution Guidlines:

First of all, thank you for considering contributing to this Opsic HMS project. It takes a one good person like you to change the world and toward simplification of our own medical data na histories.

- For development, read our [contribution guidlines](https://github.com/ospic/webapp/blob/master/CONTRIBUTING.md)
- To report a bug use [bug reporting template](https://github.com/ospic/webapp/issues/new?assignees=&labels=enhancement&template=bug_report.md&title=)
- To request a new feature or chnages use [Feature request template](https://github.com/ospic/webapp/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Where can I get more help, if I need it?

You are welcome to discuss with us in discussion [channel](https://github.com/ospic/webapp/discussions)

## What you can contribute ?

We consider contribution as anything that may add value to application such as Bug reporting, Any idea of value and we have provided some more highlight in [here](https://github.com/ospic/webapp/blob/master/WOKFLOW.md)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/ospic) [![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=74129e2fe9bc&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
