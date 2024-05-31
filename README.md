# Alex Wang Technical Challenge
This technical challenge involves implementing a settlement process between two parties, Party A and Party B. The system should handle iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The process should ensure that all changes and responses are reflected on Party A's and Party B's interface.
## How to RUN
Project includes 2 folders - Backend and Frontend.

Need to run Backend first and Frontend next.
### Backend
Backend is built using **Node Express + Web Socket + SQlite**
* npm install
* npm start 

*.env* contains port for running
### Frontend
Frontend is built using **React + Typescript + Tailwind + Vite**
* npm install
* npm start

*.env* contains url for backend

## How to USE
After running the frontend, you can see "Part A" and "Part B" on top-right of screen which redirect you to the pages.

### Part A
The Page contains "Response Status" which is Part B's response.

You can click "SUBMIT" after input "Request Amount"

The system check Part B's response before "SUBMIT", and update the "Response Status" if any.

### Part B
The Page contains "Request Amount" which is requested amount from Part A.

You can click "DISPUTE" or "AGREE" to response.

"Request Amount" is automatically updated with Party A's request