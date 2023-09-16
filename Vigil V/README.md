# Vigil V (vigil-v)

Electric consumption monitor. This app is composed of a Fastify NodeJS server which connects to a ShellyEM
energy power meter using its HTTP APIs. Each seconds it downloads from the ShellyEM the current electrical power being used.
The background color transitions from green to red reflecting the power being used.

## Why?

In Italy, if you have a standard 3kW contract, you can draw at maximum:
- up to 3,3 kW (3 kW + 10% tolerance, "available power") for an indefinite amount of time
- up to 4,2 kW (3 kW + 27%, "power limit") for 180 minutes
- up to 14 kW for 2 minutes (overload)
- >14 kW for 1-2 seconds (short circuit)

Source: https://www.asmb.it/export/sites/asmb2/.downloads/it/energia-elettrica/informazione/Il-contatore-elettronico.pdf

Often In my home we go over the 4,2 kW limit, especially in winter (like a dish-washer is running and
someone turns on an electric heater to take a shower).
This apps allow us to monitor the electrical consumption and warn us if we are overloading the system,
giving us time to reduce the load before the counter trips.

Note: this code is really old, I think I wrote this app something like 2 years ago,
I'm putting it here now just for backup. The app is still happily running on a raspberry pi model B 1.2 (!)
with an ARMv6 1GHz processor. This is to say that few resources are required to run it.

## Install
### Install server dependencies
```bash
yarn
# or
npm install
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



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
