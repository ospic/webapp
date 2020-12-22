# Ospic web application [![Build Status](https://travis-ci.com/ospic/webapp.svg?branch=master)](https://travis-ci.com/ospic/webapp) ![Auto Assign to Project(s)](<https://github.com/ospic/webapp/workflows/Auto%20Assign%20to%20Project(s)/badge.svg>)[![Netlify Status](https://api.netlify.com/api/v1/badges/0c2790ca-2220-4b39-90c5-791c769e744b/deploy-status)](https://app.netlify.com/sites/ospic/deploys) [![Download ospic](https://sourceforge.net/sflogo.php?type=11&group_id=3283394)](https://sourceforge.net/p/ospic/)

Ospic Web App is the renovated version of the Ospic applications, an effective hospital resource and patient management system and a default web application for its built on top of its own [platform](https://github.com/ospic/platform).

It is a simple Single-Page-Application(SPA) written in moderne standard web technologies such as [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). It grasp the popular [VueJs](https://vuejs.org/) framework and [Nuxt](https://nuxtjs.org/), a free and open source web application framework for VueJs, NodeJs and Webpack

## Usefulness (Why is this project useful?)

The health system is one of essential socio-economic activities; therefore, it requires rational and effective management. Hospital management systems allows us the ability to optimize and digitize all the processes within the institution, which will help to improve customer service, reduce process costs, streamline the search of medical records, bills, patients, doctors, etc.; thus, having a database of each module implemented. Having a hospital management system in place will benefit an organization with **Tract financials better**,**Secure your data i.e hospital and patient datas**,**Eradicate Errors (esp. Human Errors)**,**Make Diagnosis and Treatment Easier**,**Increase Patient Satisfaction**,**Improve Hospital Quality Ratings** and [More](https://electronichealthreporter.com/importance-of-the-hospital-management-system/)

## Getting started using

- Netlify: [Click Here](https://ospic.netlify.app/)
- Github pages: [Click Here](https://ospic.github.io/webapp/)

Login Credentials:

```
 Username: `demo`
 Password: `password`
```

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
27
   [`git`](https://git-scm.com/downloads)
28
​
29
   [`npm`](https://nodejs.org/en/download/)
30
​
31
2. Install [vuejs and vue-cli](https://vuejs.org/v2/guide/installation.html).
32
​
33
3. Clone th project
34
​
35
```
36
git clone https://github.com/ospic/webapp.git
37
```
38
​
39
4. `cd` into project root directory and make sure you are on the master branch.
40
​
41
5. Install the dependencies.
42
​
43
```
44
npm install
45
```
46
​
47
6. To preview the app, run `npm run dev` and navigate to `http://localhost:8000` in your browser.
48
7. In your project go to `plugins/axios.js` and un-comment this line.
49
​
50
```
51
/* api.setBaseURL(  process.env.baseUrl ); */
52
```
53
​
54
and comment this line.
55
​
56
```
57
  api.setBaseURL(process.env.NODE_ENV === "production" ? process.env.baseUrl : process.env.localUrl);
58
```
59
​
60
Refresh page and the application is using the development server with basic authentication by default. The credentials for the same are:
61
​
62
```
63
   Username - demo
64
   Password - password
65
```
66
​
67
## Build Setup
68
​
69
```bash
70
# install dependencies
71
$ npm install
72
​
73
# serve with hot reload at localhost:3000
74
$ npm run dev
75
​
76
# build for production and launch server
77
$ npm run build
78
$ npm run start
79
​
80
# generate static project
81
$ npm run generate
82
```
83
​
84
[![Code Now! (Gitpod)](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ospic/webapp)
85
to start contributing to this project in the online web-based IDE GitPod.io right away!
86
It's of course also possible to contribute with a "traditional" local development environment.
87
​
88
## Contribution Guidlines:
89
​
90
First of all, thank you for considering contributing to this Opsic HMS project. It takes a one good person like you to change the world and toward simplification of our own medical data na histories.
91
​
92
- For development, read our [contribution guidlines](https://github.com/ospic/webapp/blob/master/CONTRIBUTING.md)
93
- To report a bug use [bug reporting template](https://github.com/ospic/webapp/issues/new?assignees=&labels=enhancement&template=bug_report.md&title=)
94
- To request a new feature or chnages use [Feature request template](https://github.com/ospic/webapp/issues/new?assignees=&labels=&template=feature_request.md&title=)
95
​

It's of course also possible to contribute with a "traditional" local development environment.

## Contribution Guidlines:

First of all, thank you for considering contributing to this Opsic HMS project. It takes a one good person like you to change the world and toward simplification of our own medical data na histories.

- For development, read our [contribution guidlines](https://github.com/ospic/webapp/blob/master/CONTRIBUTING.md)
- To report a bug use [bug reporting template](https://github.com/ospic/webapp/issues/new?assignees=&labels=enhancement&template=bug_report.md&title=)
- To request a new feature or chnages use [Feature request template](https://github.com/ospic/webapp/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Where can I get more help, if I need it?

You are welcome to discuss with us in discussion [channel](https://github.com/ospic/webapp/discussions)

## What you can contribute

We have provided some highlight in [here](https://github.com/ospic/webapp/blob/master/WOKFLOW.md)
