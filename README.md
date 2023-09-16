# Vigil V (vigil-v)

Electrical consumption monitor. This app is composed of a Fastify NodeJS server which connects to a ShellyEM energy power meter using its HTTP APIs. Each second it downloads from the [ShellyEM]([url](https://www.shelly.com/en/products/shop/shelly-em-120a/shelly-em-50a)) the current electrical power being used.
The background color transitions from green to red reflecting the power being used.

## Why?

In Italy, if you have a standard 3kW contract, you can draw at maximum:
- up to 3.3 kW (3 kW + 10% tolerance, "available power") for an indefinite amount of time
- up to 4.2 kW (3 kW + 27%, "power limit") for 180 minutes
- up to 14 kW for 2 minutes (overload)
- >14 kW for 1-2 seconds (short circuit)

Source: https://www.asmb.it/export/sites/asmb2/.downloads/it/energia-elettrica/informazione/Il-contatore-elettronico.pdf

Often In my home we go over the 4.2 kW limit, especially in winter (like when a dishwasher is running and someone turns on an electric heater to take a shower).
This app allows us to monitor the electrical consumption and warn us if we are overloading the system,
giving us time to reduce the load before the counter trips.

Note: this code is really old, I think I wrote this app something like 2 years ago, I'm putting it here now just for backup. The app is still happily running on a Raspberry Pi model B 1.2 (!) with an ARMv6 1GHz processor. This is to say that few resources are required to run it.

## Setup for development
### Install server dependencies
```bash
cd vigil-server
yarn
# or
npm install
```

### Set the IP of your Shelly EM in the env file
```bash
cp .env-example .env
vim .env
# add the ip of your shellyEM to .env
```
### Start the server
```bash
# sorry no fancy npm scripts
node index.js
```

### Install client dependencies
```bash
cd ../
cd Vigil\ V
yarn
# or
npm install
```

### Set the IP of the node server
```bash
vim src/pages/PowerStatus.vue
# Modify the ip of the node fastify running that you started above
# Sorry for the hardcoding, too lazy to change it
# Also I don't actually think that someone other than me will use this application
# Lol if you really want to use this write me contact@dviero.eu
```
### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


## Deploy

### Build the app for production
```bash
quasar build
```

### Copy the built app to the server public/ folder
```bash
cp Vigil\ V/dist/spa/* vigil-server/public/
```

### Start the server
```bash
cd vigil-server
node server.js
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
