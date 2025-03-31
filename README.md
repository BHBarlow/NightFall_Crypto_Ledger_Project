# NighChain Crypto Currency

## Images of the page, It includes a custom logo and live background
![image](https://github.com/user-attachments/assets/9f3309fb-8d20-4f32-aa03-3d42e2f7c4da)
![image](https://github.com/user-attachments/assets/9c08a169-805f-43a3-85a6-43738b96e479)

## Project Overview
NighChain is a simple cryptocurrency system built using JavaScript. The blockchain stores transaction data and provides a mechanism to mine new blocks with basic validation. This project includes a backend API to interact with the blockchain and a frontend to visualize and mine new blocks.

## File Structure

### `index.js`
This file contains the logic for the blockchain, including functions to:
- Create new blocks
- Ensure the validity of the chain by checking for hash collisions
- Handle transactions

### `server.js`
This file is the backend API server hosted on port 8000. It handles CRUD operations for the blockchain, including endpoints for fetching the blockchain and mining new blocks.

### `testNight.js`
A testing file used for development to ensure the backend logic works without the need for the front end.

### `web.html`
This is the frontend page that users interact with to mine new blocks and view the blockchain ledger.

### `blockchain.json`
A JSON file that persists the blockchain data, ensuring it is not lost between server restarts.

## Starting the Website

To start the project, follow these steps:

1. Install the dependencies:
    ```bash
    npm install
    ```

2. Start the backend API:
    ```bash
    node server.js
    ```

3. Start the frontend by opening `index.html` in your browser.

### API Endpoints

- `GET /blocks`: Returns the current blockchain.
- `POST /mine`: Mines a new block with the provided transaction data.

## Example Usage

1. **Mining a New Block**
   To mine a new block, send a `POST` request to `/mine` with the following JSON data:

   ```json
   {
     "amount": 100,
     "sender": "Alice",
     "recipient": "Bob"
   }
   
## Example with curl
- `curl -X POST http://localhost:8000/mine -H "Content-Type: application/json" -d '{"amount": 100, "sender": "Alice", "recipient": "Bob"}'`

## Viewing the Blockchain To view the blockchain, send a GET request to /blocks:
- `curl http://localhost:8000/blocks`

