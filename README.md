![bilde](https://github.com/bLangved/project-exam-2/assets/101604131/7fd1761e-5974-45d8-ba5f-f485d31eae63)

# Project Exam 2
This is my delivery for my "Project exam 2". The goal for the assigment was as follows:

"To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate’s general development capabilities, in addition to visual and technical skills."

Live link to site: https://bhlweb-holidaze.netlify.app/

## Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/5087b844-a286-4b0a-92b0-04d10ba8d56b/deploy-status)](https://app.netlify.com/sites/bhlweb-holidaze/deploys)

## Technologies Used

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Bootstrap](https://getbootstrap.com/)
- [SCSS / SASS](https://sass-lang.com/)
- [JavaScript](https://www.javascript.com/)
- [Prettier](https://prettier.io/)
- [EsLint](https://eslint.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [countries-list](https://www.npmjs.com/package/countries-list)

## Description

### Brief

A newly launched accommodation booking site called Holidaze has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues.

### User Stories

The client has specified the following requirements in the form of User Stories:

```
A user may view a list of Venues
A user may search for a specific Venue
A user may view a specific Venue page by id
A user may view a calendar with available dates for a Venue
A user with a stud.noroff.no email may register as a customer
A registered customer may create a booking at a Venue
A registered customer may view their upcoming bookings
A user with a stud.noroff.no email may register as a Venue manager
A registered Venue manager may create a Venue
A registered Venue manager may update a Venue they manage
A registered Venue manager may delete a Venue they manage
A registered Venue manager may view bookings for a Venue they manage
A registered user may login
A registered user may update their avatar
A registered user may logout
```


## Getting started

### Installing

To get project up and running, use the following terminal command(s). 

1. Clone the repo:

```
git clone git@github.com:bLangved/project-exam-2.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following command(s):

```
npm run dev
```


### API key
Many of the requests done to the API requires the use of an API-key. Information regarding how to create an API-key can be found in the API-docs here: https://docs.noroff.dev/docs/v2/auth/api-key. 

After the API-key is created, store this as a variable in a .env file at the root of the project directory. Since the project is setup with VITE, the default name for the API-key is used, which is "VITE_API_KEY". 
If you feel like changing the handling of the API-key, check the React hooks inside the "hooks"-folder under src at the root of the directory. 

## Contributing

As this project is a school assigment, it is not open for contributions, but feedback is allways appreciated!

## Contact

To get in contact with me regarding this or any project(s), please use one of the below options:

[My LinkedIn page](https://www.linkedin.com/in/bj%C3%B8rnar-heian-langved-23157b246/)
<br>
Discord: Langved

## Acknowledgments

[Noroff - School of technology and digital media](https://www.noroff.no/en)
