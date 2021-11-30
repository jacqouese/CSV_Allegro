# CSV Allegro
### PDF sales statement generator from Allegro CSV files


This program takes CSV files generated from Allegro and transforms it into a easily readible pdf

## Features include:
- The program prompts you to choose whether you want to include an element if it has a comment
- In the PDF, you get a section with every day's total, total without VAT and VAT value
- Customizable company name on top of the PDF

## Tech Stack

- Calculations made in Python
- GUI made in Electron with React
- Node runs Python scripts with python-shell and passes data to React front-end using Electron IPC


## Installation

Navigate to the project directory and install the dependencies

```sh
npm i
```

Run Node and Electron

```sh
npm start
npm run e
```
