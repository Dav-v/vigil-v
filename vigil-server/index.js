const fastify = require('fastify')({ logger: true })
const static = require('fastify-static');
const cors = require('fastify-cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

let power = 0, voltage = 0;

fastify.register(cors, { 
  origin: true
});

fastify.register(static, {
  root: path.join(__dirname, 'public'),
});

fastify.get('/status', async (request, reply) => {
  return { power, voltage }
})

setInterval(async () => {
  try {
    const { data } = await axios(`${process.env.SHELLY_EM_IP}/status`);
    power = data.emeters[0].power;
    voltage = data.emeters[0].voltage;
  }
  catch(err) {
    console.log(err);
  }
}, 1000);


const start = async () => {
  try {
    await fastify.listen(3333, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
