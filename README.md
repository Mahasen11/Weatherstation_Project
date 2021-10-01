# Weatherstation MKA

## The Task at Hand
This project is part of the precollege course "yoth2engineers" organized by the ZHAW School of Engineering from Winterthur. The idea is to familiarize the candidates in current web technologies such as HTML/CSS, programming, webhosting, databases etc. Depending on what they have chosen to study later on the participants get assigned to different projects. Ours was a weatherstation fom which we had a one month time to complete. 

## The Goal
There are many weatherstations out there in this wide world we live in. And many of those have a website displaying the current weather conditions. Our goal was to create a website where on one hand the average person can have a quick glance at the current climactic situation in Winterthur and continue on with their day, on the other hand the professional data analyst can also get some use out of it by having a custom range selector with all the data being displayed in a graph for a clean overview and in a table for precise lookup.

## The Planning
The planning phase was relatively short; we've decided fairly quickly that we wanted to use node.js in conjunction with express as our server, a postgres database as our data storage technology, a raspberry pi as our measuring station and heroku as a cloud hosting service. We planned the website to have at least two different webpages: One for the everyday person who takes a quick glance at the current weather and another where the professional user can select a range to receive data from and be able to download it in different file formats.

## The Technology
For the front-end we didn't use any fancy technology, traditional HTML/CSS/JS was perfectly adequate for us.

Since everything would be written in `TypeScript` `node.js` together with `express` was the obvious choice for the server technology. In addition, `handlebars` was our server-side rendering engine of choice. The cloud hosting service was `heroku` and the database (which would also be managed by heroku) was a `postgres` one. The measurements would be carried out by a Raspberry Pi.

As far as developer technology is concerned, we chose git/github as our version control system in conjunction with visual studio code as our editing tool.


## The Execution
We have decided to take a very modular approach. We began development with the Raspberry Pi first First, we'd create small dummy functions that simply printed to the console with simple text files as the place holders for the database. The server was of course executed locally onto localhost and was later migrated onto heroku. After two days, our instructor introduced us to branching via git which supercharged our productivity and lead to us adopting it as the primary method for development. Everyone would be working on their own branch and whenever someone would be finished, they'd merge with the main branch.

# Successes
- We managed to bring the website online and fully functional in addition to implementing about 90% of all the goals we had set for ourselves
- Our database is fully functional
- We also managed to create a visual representataion of our data
- We could coordinate ourselves very good as a team and were overall very well integrated
- git branches has got to be the best thing in software engineering since the invention of the C programming language

# Failiures
- We have planned a download feature but unfortunately due to time constraints we could not implement it
- We didn't make as much use of the card system at the stand-up meetings as we could have especially at the end of the project

# What we've learnt
- The usefulness of git branches
- The importance of coordination
- How to interconnect and make the technologies work together
- Programming in TypeScript

# Outlook/Future Plans
The first thing we'd do is implement the download functionality with at least two data formats: JSON and CSV. Later on we could expand the Raspberry Pi with further sensors such as windspeed and precipitation leading to more accurate descriptions of the climate. A webcam could also be added for a more interesting user experience.
