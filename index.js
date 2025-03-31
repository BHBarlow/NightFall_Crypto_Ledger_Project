import sha256 from 'sha256'; // sha256 Hashing function
import fs from 'fs'; // File system module

const blockchainFile = './blockchain.json'; // Path to the JSON file

// Load the blockchain from the file or initialize it with the genesis block
const loadBlockchain = () => {
    if (fs.existsSync(blockchainFile)) {
        const data = fs.readFileSync(blockchainFile, 'utf-8');
        return JSON.parse(data);
    } else {
        return [
            {
                index: 0,
                time: Date.now(),
                transaction: {},
                nonce: 0,
                data: 'Genesis Block',
                hash: "000hash",
                previousHash: "000prevhash"
            }
        ];
    }
};

// Save the blockchain to the file
const saveBlockchain = (chain) => {
    fs.writeFileSync(blockchainFile, JSON.stringify(chain, null, 4), 'utf-8');
    console.log("Block added to chain");
};

const objNightChain = {
    chain: loadBlockchain(),

getLastBlock: () => {
    return objNightChain.chain[objNightChain.chain.length - 1];
},

generateHash: (strPreviousHash, datStartTime, objNewTransaction) => {
    let strLocalHash = "";
    let intNonce = 0;

    while (strLocalHash.substring(0, 3) != "000") {
        intNonce++;
        strLocalHash = sha256(`${strPreviousHash}${datStartTime}${objNewTransaction}${intNonce}`);
    }
    return { strLocalHash, intNonce };
},

createNewBlock: (decTransAmt, strTransSender, strTransRecipient) => {
    const objNewTransaction = { decTransAmt, strTransSender, strTransRecipient };
    const objprevBlock = objNightChain.getLastBlock();
    const datInitialTime = Date.now();
    const newCoinHash = objNightChain.generateHash(objprevBlock.hash, datInitialTime, objNewTransaction);

    // Check if hash already exists in the chain
    const isDuplicate = objNightChain.chain.some(block => block.hash === newCoinHash.strLocalHash);
    if (isDuplicate) {
        console.log("Duplicate hash found! Mining a new hash...");
        return objNightChain.createNewBlock(decTransAmt, strTransSender, strTransRecipient); // Retry with new nonce
    }else{
        console.log("No duplicate hash found.");
    }
    // Create the new block

    const newBlock = {
        index: objprevBlock.index + 1,
        time: datInitialTime,
        transaction: objNewTransaction,
        nonce: newCoinHash.intNonce,
        data: 'New Block',
        hash: newCoinHash.strLocalHash,
        previousHash: objprevBlock.hash
    };

    objNightChain.chain.push(newBlock);
    saveBlockchain(objNightChain.chain);
    return newBlock;
},


printChain: () => {
    console.log(objNightChain.chain);
}
};

export { objNightChain };