# CUT ORDER

## About
This project is a web application to receive glass-cutting order from customer. The purpose of using this application is to reduce the error cause by misunderstanding handwriting and oral communication.

## Features
The site has 3 pages.
1. The first page is a page to receive customer infomation
2. The second page is a page to receive orders from customer. Customer can add, edit and delete their order in this page.
3. The last page is a page to summarize all data received from previous pages, and a button to submit order.
After customer submitted their order, data will be sent to Line Notify API and Line bot will notify and show the received order to related department to take action further on.

## Tech used
The application is built using Node.js and Handlebars, styled using vanilla CSS.

## Get started
To get start run the following command in CLI
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
