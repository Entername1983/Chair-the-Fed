

//Set chart, 24 months, 3 curves inflation rate, unemployment rate, interest rate

var xmonths = [...Array(24).keys()];
var xValues = xmonths;
var intrate = 0;
var unemrate = 5;
var inflrate = 2;
var currentM = 0;

const unemp = [5];
const infl = [2];
const intr = [0];


// increate interest rates
function incrate() {
    intrate = intrate + 0.25;
    document.querySelector("#intrate").innerHTML = intrate;
}

//decrease interest rates
function decrate() {
    intrate = intrate - 0.25;
    document.querySelector("#intrate").innerHTML = intrate;
}



// chart details
const chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: intr,
      borderColor: "red",
      label: "interest rate",
      fill: false
    }, { 
      data: infl,
      borderColor: "green",
      label: "inflation rate",
      fill: false
    }, { 
      data: unemp,
      borderColor: "blue",
      label: "unemployment rate",
      fill: false
    }]
  },
  options: 
  {
    legend: {display: true},
    title: {
      display: true,
      text: 'Impact of Exchange Rates on Inflation & Unemployment'
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'rate',
          labelString: 'test', 
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'rate'
        }
      }
    },


  }
});

// create new data points for unemployment rate, inflation rate and interest rate and add arrays
function execute() {
    unemrate = unemrate + intrate;
    inflrate = inflrate - intrate;
    infl.push(inflrate);
    unemp.push(unemrate);
    intr.push(intrate);
    currentM ++;
    document.querySelector("#currentm").innerHTML = currentM;
    document.querySelector("#currentrate").innerHTML = intrate;
    chart.update();
}

