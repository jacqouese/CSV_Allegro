# CSV Allegro
### PDF sales statement generator from Allegro CSV files


This program takes CSV files generated from Allegro and transforms it into an easily readible PDF

## Features include:
- The program prompts you to choose whether you want to include an element if it has a comment
- In the PDF, you get a section with every day's total, total without VAT and VAT value
- Customizable company name on top of the PDF

## Tech

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

## How to use

### Open the program <br />
![image](https://drive.google.com/uc?export=view&id=1EODTnwb6aXSr4QGD3Glhd0p-sZm32AHH)
<br />
<br />

### Input into text fields and drag and drop a CSV file (only Allegro sale statements will get accepted) <br />
![image](https://drive.google.com/uc?export=view&id=1cqDPkJAzKissKxjMgFx1WryAH7lxsPrq)
<br />
<br />

### Decide which ones to include (the entry needs to have a non-empty "SellerNotes" field to be shown in the prompt) <br />
![image](https://drive.google.com/uc?export=view&id=1oyb842aZP3IXI3DPtewMTp9YLKxZXIJ_)


