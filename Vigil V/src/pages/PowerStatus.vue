<template>
      <div class="container">
        <div v-if="!this.overload">
          <div class="wattLabel" >
          Power
          </div>
          <div class="wattIndicator" >
          {{this.power.toFixed(2)}} W
          </div>
          <div class="voltageLabel" >
          Voltage
          </div>
          <div class="voltageIndicator" >
          {{this.voltage.toFixed(2)}} V
          </div>

        </div>
        <div v-if="this.overload">
          <div class="countdownLabel">
            Stacco contatore in
          </div>
          <div class="countdown">
          {{this.countDown.toFixed(2)}} s
          </div>
          </div>
      </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { date } from 'quasar';
// destructuring to keep only what is needed
const { addToDate } = date;
import axios from 'axios';

const MAX_LOAD = 4200;
const SERVER_IP = 192.168.1.22;
const SERVER_PORT = 3333;

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) { factor = 0.5; }
  const result = color1.slice();
  for (let i = 0; i < 3; i += 1) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}
export default defineComponent({
  name: 'PowerStatus',

  /*
  components: {
    EssentialLink,
  },
  async mounted() {
  },
  */
  setup() {
    const overload = ref(false);
    const power = ref(0);
    const voltage = ref(0);
    const backgroundColor = ref('#dedede');
    const countDown = ref(0);
    let countDownInterval;
    let changeBackgroundColorInterval;
    let shutdownTIme;

    onMounted(() => {
      console.log('MOUNTED');
      setInterval(async () => {
        const { data } = await axios(`http://${SERVER_IP}:${SERVER_PORT}/status`);
        // console.log(data);
        power.value = data.power;
        voltage.value = data.voltage;

        const green = [0, 255, 0];
        const yellow = [255, 255, 0];
        const red = [255, 0, 0];
        let finalColor;
        const loadFactor = power.value / MAX_LOAD;
        if (loadFactor < 0.5) {
          finalColor = interpolateColor(
            green,
            yellow,
            loadFactor * 2, /* factor for interpolation must be between 0 and 1 */
          );
          if (overload.value === true) {
            overload.value = false;
            clearInterval(countDownInterval);
            clearInterval(changeBackgroundColorInterval);
          }
        } else if (loadFactor < 1) {
          finalColor = interpolateColor(
            yellow,
            red,
            (loadFactor * 2) - 1, /* factor for interpolation must be between 0 and 1 */
          );
          if (overload.value === true) {
            overload.value = false;
            clearInterval(countDownInterval);
            clearInterval(changeBackgroundColorInterval);
          }
        } else {
          finalColor = [255, 0, 0];
          if (overload.value === false) {
            overload.value = true;
            console.log('OVERLOAD');
            shutdownTIme = addToDate(new Date(), { minutes: 2 });
            countDownInterval = setInterval(() => {
              countDown.value = (shutdownTIme - new Date()) / 1000;
            }, 10);

            changeBackgroundColorInterval = setInterval(() => {
              const secondsLeft = Math.round((shutdownTIme - new Date()) / 100);
              if (secondsLeft % 10 === 0) {
                finalColor = [255, 0, 0];
              } else {
                finalColor = [20, 20, 20];
              }
              backgroundColor.value = `rgb(${finalColor[0]},${finalColor[1]}, ${finalColor[2]})`;
            }, 500);
          }
        }
        backgroundColor.value = `rgb(${finalColor[0]},${finalColor[1]}, ${finalColor[2]})`;
      }, 1000);
    });
    return {
      overload,
      countDown,
      backgroundColor,
      power,
      voltage,
    };
  },
});
</script>
<style scoped>
.container { /* or any other parent element */
  background: v-bind(backgroundColor);
  display: flex; /* flex behavior (displays children inline) */
  justify-content: center; /* horizontal centering */
  flex-direction: column;
  align-items: center; /* vertical centering */
  height: 100vh;
  margin: 0;
}

.wattIndicator {
  color: #ffffff;
  text-align: center;
  font-size: 30vh;
  white-space: nowrap;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}
.wattLabel {
  color: #ffffff;
  text-align: center;
  font-size: 15vh;
  white-space: nowrap;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}
.voltageIndicator {
  color: #ffffff;
  text-align: center;
  font-size: 10vh;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}
.voltageLabel {
  color: #ffffff;
  text-align: center;
  /* font-size:30px; */
  font-size:5vh;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}

.countdown {
  color: #ffffff;
  text-align: center;
  font-size: 300px;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}
.countdownLabel {
  color: #ffffff;
  text-align: center;
  font-size: 150px;
  /* comes in handy when resizing the browser width, if the text is long/big enough */
}
</style>
