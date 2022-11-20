

//Set chart, 24 months, 3 curves inflation rate, unemployment rate, interest rate

var xmonths = [...Array(25).keys()];
var xValues = xmonths;
var intrate = 0;
var unemrate = 5;
var inflrate = 2;
var currentM = 0;
var GDP = 1000;

const unemp = [5];
const infl = [2];
const intr = [0];

//create objects for random events impactA represents impact on unemployment, B on inflation, values between -10 and 10
const events = [
    {ref: 1, title: "Trade War!", message: "The elescation of protectionist policies such as tariffs and quotas has lead to a trade war between you and one of your major trading partners.", impactA: 2, impactB: 2}, 
    {ref: 2, title: "Oil shock", message: "OPEC's decision to restrict it's supply has sent prices skyrocketing.", impactA: 1, impactB: 4}, 
    {ref: 3, title: "World recession!", message: "The world economy has entered a deep recession", impactA: 5, impactB: -5},
    {ref: 4, title: "New energy breakthrough!", message: "A recent succesful experiment at ITER is expected to finally lead to the fusion power", impactA: -1, impactB: -2},
    {ref: 5, title: "Pandemic!", message: "A very contagious strain of Ebola has been detected on all major continents", impactA: 1, impactB: 2},
    {ref: 6, title: "Increase in retirees", message: "This month has seen the largest ever increase in the retired population, our dependency ratio is now at an all time high.", impactA: -5, impactB: 2},
    {ref: 7, title: "Crypto bubble", message: "Crypto mania has once again swept the nation!  We're all gonna be rich bro!", impactA: -1, impactB: 2},
    {ref: 8, title: "Free spending politican elected", message: "A new president has just been elected on promises of a free lunch for everyone!", impactA: -5, impactB: 8},
    {ref: 9, title: "Austerity is back in fashion", message: "Time to tighten your belt!  Austerity is back in fashion.  Can the government really be fiscally responsible?", impactA: 4, impactB: -2},
    {ref: 10, title: "Climate disaster", message: "Hurricanes, tornadoes, droughts and floods all at the same time", impactA: 2, impactB: 2},
]

//create record of events
const recmonth = [
    {month: 0, intr: 0, unemp: 5, infl: 2, GDP: 0,}
]



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
    layout: {
        padding: 15
    },
    legend: {display: true},
    title: {
      display: true,
      text: 'Impact of Exchange Rates on Inflation & Unemployment'
    },
    scales:{
        xAxes: [
          {
             scaleLabel: {
               display: true,
                labelString: 'Month'
             }
           }
        ],
        yAxes: [
          {
             scaleLabel: {
               display: true,
                labelString: 'Rate'
             }
           }
        ]
       }


  }
});

// create new data points for unemployment rate, inflation rate and interest rate and add arrays
function execute() {
    //check for random events
    let x = Math.floor((Math.random() * 100) + 1);
    console.log(x);
    
        if (x < 10)
        {
            document.querySelector("#mtitle").innerHTML = events[x].title
            document.querySelector("#message").innerHTML = events[x].message
            unemrate = unemrate + events[x].impactA
            if (unemrate < 0)
                unemrate = 0
            inflrate = inflrate + events[x].impactB
        }

    //determine new unemployment & inflation rates
    unemrate = Math.sqrt(unemrate) + (intrate * 0.5);
    inflrate = inflrate +2 - (intrate);
    currentM ++;

    //update chart
    infl.push(inflrate);
    unemp.push(unemrate);
    intr.push(intrate);
    

    //formula for GDP
    GDP = GDP + GDP * (currentM/100)- GDP * ((unemrate-5)/100)-((Math.sqrt(inflrate*inflrate))/100);

    //add current month data to record
    obj = {month: currentM, intr: intrate, unemp: unemrate, infl: inflrate, GDP: GDP,}
    recmonth.push(obj);


    //update tables
    document.querySelector("#currentm").innerHTML = currentM;
    document.querySelector("#currentrate").innerHTML = intrate;
    document.querySelector("#score").innerHTML = recmonth[currentM].GDP.toFixed();
    
    // Find a <table> element with id="myTable":
    var table = document.getElementById("table0");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(currentM+1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    // Add some text to the new cells:
    cell1.innerHTML = recmonth[currentM].month;
    cell2.innerHTML = recmonth[currentM].intr;
    cell3.innerHTML = recmonth[currentM].unemp.toFixed();
    cell4.innerHTML = recmonth[currentM].infl.toFixed();
    cell5.innerHTML = recmonth[currentM].GDP.toFixed();

    chart.update();
}


