# Ospic web application [![Build Status](https://travis-ci.com/ospic/webapp.svg?branch=master)](https://travis-ci.com/ospic/webapp) ![Auto Assign to Project(s)](<https://github.com/ospic/webapp/workflows/Auto%20Assign%20to%20Project(s)/badge.svg>)[![Netlify Status](https://api.netlify.com/api/v1/badges/0c2790ca-2220-4b39-90c5-791c769e744b/deploy-status)](https://app.netlify.com/sites/ospic/deploys) [![Download ospic](https://sourceforge.net/sflogo.php?type=11&group_id=3283394)](https://sourceforge.net/p/ospic/)

Ospic Web App is the renovated version of the Ospic applications, an effective hospital resource and patient management system and a default web application for its built on top of its own [platform](https://github.com/ospic/platform).

It is a simple Single-Page-Application(SPA) written in moderne standard web technologies such as [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). It grasp the popular [VueJs](https://vuejs.org/) framework and [Nuxt](https://nuxtjs.org/), a free and open source web application framework for VueJs, NodeJs and Webpack

## Usefulness (Why is this project useful?)

---

The health system is one of essential socio-economic activities; therefore, it requires rational and effective management. Hospital management systems allows us the ability to optimize and digitize all the processes within the institution, which will help to improve customer service, reduce process costs, streamline the search of medical records, bills, patients, doctors, etc.; thus, having a database of each module implemented. Having a hospital management system in place will benefit an organization with <b>Tract financials better</b>,<b>Secure your data i.e hospital and patient datas</b>,<b>Eradicate Errors (esp. Human Errors)</b>,<b>Make Diagnosis and Treatment Easier</b>,<b>Increase Patient Satisfaction</b>,<b>Improve Hospital Quality Ratings</b> and [More](https://electronichealthreporter.com/importance-of-the-hospital-management-system/)

---

## Getting started using

- Netlify: [Click Here](https://ospic.netlify.app/)
- Github pages: [Click Here](https://ospic.github.io/webapp/)

Login Credentials:

```
 Username: `demo`
 Password: `password`
```

---

## Getting started (Developing)

1. Ensure you have the following installed in your system:

   [`git`](https://git-scm.com/downloads)

   [`npm`](https://nodejs.org/en/download/)

2. Install [vuejs and vue-cli](https://vuejs.org/v2/guide/installation.html).

3. Clone th project

```
git clone https://github.com/ospic/webapp.git
```

4. `cd` into project root directory and make sure you are on the master branch.

5. Install the dependencies.

```
npm install
```

6. To preview the app, run `npm run dev` and navigate to `http://localhost:8000` in your browser.
7. In your project go to `plugins/axios.js` and un-comment this line.

```
/* api.setBaseURL(  process.env.baseUrl ); */
```

and comment this line.

```
  api.setBaseURL(process.env.NODE_ENV === "production" ? process.env.baseUrl : process.env.localUrl);
```

Refresh page and the application is using the development server with basic authentication by default. The credentials for the same are:

```
   Username - demo
   Password - password
```

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

[![Code Now! (Gitpod)](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ospic/webapp)
to start contributing to this project in the online web-based IDE GitPod.io right away!
It's of course also possible to contribute with a "traditional" local development environment.

---

## Contribution Guidlines:

First of all, thank you for considering contributing to this Opsic HMS project. It takes a one good person like you to change the world and toward simplification of our own medical data na histories.

- For development, read our [contribution guidlines](https://github.com/ospic/webapp/blob/master/CONTRIBUTING.md)
- To report a bug use [bug reporting template](https://github.com/ospic/webapp/issues/new?assignees=&labels=enhancement&template=bug_report.md&title=)
- To request a new feature or chnages use [Feature request template](https://github.com/ospic/webapp/issues/new?assignees=&labels=&template=feature_request.md&title=)

---

## Where can I get more help, if I need it?

You are welcome to discuss with us in discussion [channel](https://github.com/ospic/webapp/discussions)
