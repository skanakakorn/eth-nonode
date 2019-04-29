#!/bin/bash
geth --dev \
--datadir "/var/eth" \
--rpc --rpcaddr "0.0.0.0" \
--rpcport 8545 --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" $*
