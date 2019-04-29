# Installing Ethereum

```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

# Installing nodeJS and npm

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

This will install nodeJS 8. For other versions, you can use nodeJS 8 to install [n](https://github.com/tj/n), or follow instructions on the [official website](https://nodejs.org/en/download/).

# Alternative: Use docker

You can use docker and docker compose to start the ethereum backend instead. 
Navigate to the folder `dev-docker` and run `docker-compose up`.
The compose file exposes the ports by default, you can run `geth attach http://localhost:8545` in your host machine
to access the console.
