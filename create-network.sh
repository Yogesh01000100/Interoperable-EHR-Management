#!/bin/bash

# Navigate to the test network directory(Only home directory)
cd fabric-samples/test-network

# Bring down any existing network
./network.sh down

# Start the network with CA
./network.sh up -ca

# Set up channel between org1 and org2 "mychannel"
./network.sh createChannel

# Package the smart contract (JavaScript version)
cd ..
cd asset-transfer-basic/chaincode-javascript
npm install
cd ../../test-network
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

peer lifecycle chaincode package basic.tar.gz --path ../asset-transfer-basic/chaincode-javascript/ --lang node --label basic_1.0

# Install the chaincode on Org1 and Org2 peers
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:8001
peer lifecycle chaincode install basic.tar.gz

export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:10004
peer lifecycle chaincode install basic.tar.gz

# Query installed chaincode to get package ID
peer lifecycle chaincode queryinstalled >&log.txt
PACKAGE_ID=$(sed -n "/Package ID: basic_1.0/{s/^Package ID: basic_1.0://; s/, Label:.*$//; p;}" log.txt)
echo "Chaincode Package ID: $PACKAGE_ID"
rm log.txt

# Export the chaincode package ID
export CC_PACKAGE_ID={$PACKAGE_ID}

sleep 5

peer lifecycle chaincode approveformyorg -o localhost:8000 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

# Approve the chaincode definition for Org1
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:8001

# peer lifecycle chaincode approveformyorg
peer lifecycle chaincode approveformyorg -o localhost:8000 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

sleep 5 
# Committing the chaincode definition to the channel
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --output json

echo "peer lifecycle chaincode commit command to be executed !"
# wait for 10 secs
sleep 10

# peer lifecycle chaincode commit command
peer lifecycle chaincode commit -o localhost:8000 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:10004 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"

echo "lifecycle chaincode querycommitted will be executed !"
# wait for 10 secs
sleep 10

# peer lifecycle chaincode querycommitted command
peer lifecycle chaincode querycommitted --channelID mychannel --name basic --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

echo "chaincode to be invoked !"
# wait for 10 secs
sleep 10

# Invoke the chaincode
peer chaincode invoke -o localhost:8000 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:10004 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

sleep 4
echo "GetAllPatientRecords chaincode function to be executed!"
# wait for 10 secs
sleep 10

# Query the chaincode
peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllPatientRecords"]}'
