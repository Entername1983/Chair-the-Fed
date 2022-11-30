

//Set chart, 24 months, 3 curves inflation rate, unemployment rate, interest rate

//duration
const dur = 47

var xmonths = [...Array(dur+2).keys()];
var xValues = xmonths;
var intrate = 2;
var unemrate = 5;
var inflrate = 2;
var currentM = 0;
var GDP = 1000;

// used for less than 3 months in int rate
var pr = 4;

const unemp = [5];
const infl = [2];
const intr = [2];

//create objects for random events impactA represents impact on unemployment, B on inflation, values between -10 and 10
const events = [
    {ref: 1, title: "Trade War!", 
    message: "The elescation of protectionist policies such as tariffs and quotas has lead to a trade war between you and one of your major trading partners.", 
    impactA: 1.2, impactB: 1.4, img: 'images/tradewar.jpg', 
    info: `"Trade wars can have many impacts on the economy, they can reduce the availability of imports and make it harder for your exports to reach customers abroad, read more about them <a href="https://www.investopedia.com/terms/t/trade-war.asp" target="_blank">here</a>"`}, 
    {ref: 2, title: "Oil shock",
     message: "OPEC's decision to restrict it's supply has sent prices skyrocketing.", 
     impactA: 1.2, impactB: 1.5, img: 'images/oil.jpg', 
     info:`"Oil shocks, such as was <a href="https://www.investopedia.com/1973-energy-crisis-definition-5222090#:~:text=The%201973%20energy%20crisis%20was,sell%20crude%20to%20the%20U.S." target="_blank">experienced in the 1970s</a>, are diffult for central banks to manage as they cause inflationary pressure without the low levels of unemployed experienced when the economy is overheating."`}, 
    {ref: 3, title: "World recession!",
     message: "The world economy has entered a deep recession.", impactA: 1.5, impactB: 0.4, img: 'images/recession.jpg', 
     info:`"A common definition of a <a href="https://www.investopedia.com/terms/r/recession.asp" target="_blank">recession</a> is two consecutive quarters (6 months) of negative GDP growth.  It also usually consists of a decrease in unemployment, a decrease in inflation (and possibly even deflation) as well as a decrease in stock valuations."`},
    {ref: 4, title: "New energy breakthrough!", 
    message: "A recent succesful experiment at ITER is expected to finally lead to the fusion power.", 
    impactA: 0.8, impactB: 0.8, img: 'images/fusion.jpg', 
    info:`"They say fusion power is always 50 years away; for us, lets imagine it arrives today.  What would be the consequneces of having virtually unlimited, almost free energy?  This would be one of the most significant innovations the world as ever seen and would surely dramatically impact <a href="https://www.investopedia.com/terms/p/productivity.asp" target="_blank">productivity</a>."`},
    {ref: 5, title: "Pandemic!", 
    message: "A very contagious strain of Ebola has been detected on all major continents.", 
    impactA: 1.2, impactB: 1.5, img: 'images/pandemic.jpg', 
    info: `"The covid pandemic surprised us all, especially economists.  One thing is for sure it is that they lead to serious  <a href="https://www.investopedia.com/terms/e/economic-shock.asp#:~:text=Demand%20shocks%20happen%20when%20there,or%20investment%20spending%20from%20businesses." target="_blank">shocks</a> to the economy"`},
    {ref: 6, title: "Increase in retirees", 
    message: "This month has seen the largest ever increase in the retired population, our dependency ratio is now at an all time high.", impactA: 0.7, impactB: 1.2, img: 'images/retirees.jpg', 
    info: `"It's finally arrived, with the retirement of baby boomers our <a href="https://www.investopedia.com/terms/d/dependencyratio.asp" target="_blank">dependency ratio</a> has taken a turn for the worse.   How will this affect your choice of monetary policy?"` },
    {ref: 7, title: "Crypto bubble",
     message: "Crypto mania has once again swept the nation!  We're all gonna be rich bro!", 
     impactA: 0.7, impactB: 1.3, img: 'images/dogecoin.jpg', 
     info: `"Exhuberence can sweep through economy and it can feel like the good times will never end, could it actually be the case this time or is this the mother of all  <a href="https://www.investopedia.com/terms/b/bubble.asp" target="_blank">bubbles</a>"`},
    {ref: 8, title: "Free spending politican elected",
     message: "A new president has just been elected on promises of a free lunch for everyone!", 
     impactA: 0.5, impactB: 2, img: 'images/freespending.jpg', 
     info:`"Politicians sometimes get elected by overpromising to their electorate, once they get elected they can be incentivized to use their power to reward the segments of the population that voted for them and ensure they get re-elected.  This can lead to the government spending more than it can afford.  In the most extreme situations, when there is no strong seperation between the central bank and the government, it can even lead to printing money to fund this expenditure with catastrophic results"`},
    {ref: 9, title: "Austerity is back in fashion", 
    message: "Time to tighten your belt!  Empty plates are back on the menu boys!  Can the government really be fiscally responsible?", impactA: 1.4, impactB: 0.7, img: 'images/austerity.jpg', 
    info: `"<a href="https://www.investopedia.com/terms/a/austerity.asp" target="_blank">Austerity</a> tends to be popular with creditors but not the general population of a country.  Ideally governments would be fiscally responsible during the good times and spend beyond their means during recessiosn, unfortunately human nature usually means the opposite happens."`},
    {ref: 10, title: "Climate disaster", 
    message: "Hurricanes, tornadoes, droughts and floods all at the same time.", 
    impactA: 1.1, impactB: 1.4, img: 'images/climate.jpg', 
    info: `"Climate change and its economic impacts carry a lot of uncertainty.  There will be winners and there will be losers, but one thing is certain: <a href="https://climate.nasa.gov/solutions/adaptation-mitigation/" target="_blank">adaption and mitigation</a> have an economic cost"`},
]

const quotes = [
    `"Little else is requisite to carry a state to the highest degree of opulence from the lowest barbarism but peace, easy taxes, and a tolerable administration of justice." - Adam Smith`,
    `"The first lesson of economics is scarcity: there is never enough of anything to fully satisfy all those who want it. The first lesson of politics is to disregard the first lesson of economics." - Thomas Sowell`,
    `"Markets can remain irrational longer than you can remain solvent." - John Maynard Keynes`,
    `"The ideas of economists and political philosophers, both when they are right and when they are wrong are more powerful than is commonly understood. Indeed, the world is ruled by little else. Practical men, who believe themselves to be quite exempt from any intellectual influences, are usually slaves of some defunct economist." - John Maynard Keynes`,
    `"When the facts change, I change my mind - what do you do, sir?" - John Maynard Keynes`,
    `"It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest. We address ourselves, not to their humanity but to their self-love, and never talk to them of our necessities but of their advantages." - Adam Smith`,
    `"If you put the federal government in charge of the Sahara Desert, in 5 years there'd be a shortage of sand." - Milton Friedman`,
    `"Inflation is the one form of taxation that can be imposed without legislation."  - Milton Friedman`,
    `"When government - in pursuit of good intentions - tries to rearrange the economy, legislate morality, or help special interests, the cost come in inefficiency, lack of motivation, and loss of freedom. Government should be a referee, not an active player." - Milton Friedman`,
    `"When people begin anticipating inflation, it doesn't do you any good anymore, because any benefit of inflation comes from the fact that you do better than you thought you were going to do." - Paul Volcker`,
    `"Rather than justice for all, we are evolving into a system of justice for those who can afford it. We have banks that are not only too big to fail, but too big to be held accountable.” “Development is about transforming the lives of people, not just transforming economies.” - Joseph Stiglitz`,
    `"Even the striving for equality by means of a directed economy can result only in an officially enforced inequality - an authoritarian determination of the status of each individual in the new hierarchical order." - Friedrich August von Hayek`,
    `"An economist is an expert who will know tomorrow why the things he predicted yesterday didn't happen today.” - Laurence J. Peter`,
    `"Under a system of perfectly free commerce, [] each country naturally devotes its capital and labour to such employments as are most beneficial to each. This pursuit of individual advantage is admirably connected with the universal good of the whole. By stimulating industry, by rewarding ingenuity, and by using most efficaciously the peculiar powers bestowed by nature, it distributes labour most effectively and most economically: while, by increasing the general mass of productions"  - David Ricardo`,
    `"The quantity theory of money thus rests, ultimately, upon the fundamental peculiarity which money alone of all human goods possesses - the fact that it has no power to satisfy human wants except a power to purchase things which do have such power." - Irving Fisher`,
    `"The vast differences in power contributed to faulty social theories of these differences that are still with us today. When a society is economically dominant, it is easy for its members to assume that such dominance reflects a deeper superiority--whether religious, racial, genetic, cultural, or institutional--rather than an accident of timing or geography." - Jeffrey D. Sachs, The End of Poverty`,
    `"Most economic fallacies derive from the tendency to assume that there is a fixed pie, that one party can gain only at the expense of another."  - Milton Friedman`,
    `"The ultimate purpose of economics, of course, is to understand and promote the enhancement of well-being." - Ben Bernanke`,
    `"I think that it's more important for an economist to be wise and sophisticated in scientific method than it is for a physicist because with controlled laboratory experiments possible, they practically guide you; you couldn't go astray. Whereas in economics, by dogma and misunderstanding, you can go very sadly astray." - Paul Samuelson.`,
    `"All taxes discourage something. Why not discourage bad things like pollution rather than good things like working?"
    - Lawrence Summers`,]


//create record of events
const recmonth = [
    {month: 0, intr: 2, unemp: 5, infl: 2, GDP: 0,}
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
        borderColor: "#E07A5F",
        label: "interest rate",
        fill: true
      }, { 
        data: infl,
        borderColor: "#3D405B",
        label: "inflation rate",
        fill: true
      }, { 
        data: unemp,
        borderColor: "#81B29A",
        label: "unemployment rate",
        fill: true
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
        x: {
            title: {
                text: "Month",
                display: true,
            },
            suggestedMin: 0,
            suggestedMax: 12,
            ticks: {
              stepSize: 3
            }},
          y: {
            title: {
                text: "Rate",
                display: true,
            },
            suggestedMin: 0,
            suggestedMax: 30,
            ticks: {
              stepSize: 5
            }
          }
        },
    }
  });

// create new data points for unemployment rate, inflation rate and interest rate and add arrays
function execute() 
{
    //check if reached the of the game
    console.log(currentM)
    console.log(dur)
    if (currentM <= dur)
    {

        
        //check for random events
        let A = 1;
        let B = 1;
        let x = Math.floor((Math.random() * 100));
        let c = 0;
        
            if (x < 10 && c < 7)
                {
                    document.querySelector("#mtitle").innerHTML = events[x].title
                    document.querySelector("#message").innerHTML = events[x].message
                    document.querySelector("#help").innerHTML = events[x].info
                    document.getElementById('image').src = events[x].img
                    unemrate = unemrate + events[x].impactA
                    A = events[x].impactA
                    B = events[x].impactB
                    c ++

                }
        
        //determine new unemployment & inflation rates
        currentM ++;

        //effective interest rate = 30% current rate, 70% rate of 3 months ago (if less than 3 months use pr value)
        if (currentM <= 3)  
            {
            var rr = (0.5 * intrate) + (0.5 * pr)
            }
        else
            {
            var rr = (0.5 * intrate) + (0.5 * recmonth[currentM - 3].intr)
            }
        //compare intrate to inflation rate
        var ii = inflrate - rr
        var ui = rr - unemrate

        //unemployment rate accelerator
        let uc = 1 + ui/20
        // inflation rate accelerator
        let ic = 1 + ii/20
        // impacts ot not
        if (x<10)
            {
            A = events[x].impactA;
            B = events[x].impactB;
            }
        else
            {
                A = 1;
                B = 1;
            }
        //calc new inflation rate and unemployment rate
        unemrate = ((unemrate + rr/2 + (unemrate * uc))/2) * A
        inflrate = (inflrate + ((3 - rr)*ic)) * B


        if (unemrate < 1)
        {
            unemrate = 1
        }
        //update chart
        infl.push(inflrate);
        unemp.push(unemrate);
        intr.push(intrate);
        
        //display messages for non special event months
        if (x >= 10)
            {
                let y = Math.floor((Math.random() * 20));
                document.querySelector("#mtitle").innerHTML = `Month: ${currentM}`
                document.querySelector("#message").innerHTML = quotes[y]
                if (unemrate > 8 && inflrate > 4)
                    {
                        document.querySelector("#help").innerHTML = `"Your rates of unemployment and inflation are getting very high."`
                    }
                else if (unemrate > 8 && inflrate <= 4 && inflrate > 0) 
                    {
                        document.querySelector("#help").innerHTML = `"Your unemployment rate is getting quite high, consider lowering your target interest rate."`
                    }
                else if (unemrate <= 8 && inflrate > 4) 
                    {
                        document.querySelector("#help").innerHTML = `"Prices are increasing fast!  Consider increasing your target interest rate."`
                    }
                else if (unemrate < 8 && inflrate <= 4 && inflrate > 0) 
                    {
                        document.querySelector("#help").innerHTML = `"You are doing well"`
                    }
                else if (inflrate <= 0)
                    {
                        document.querySelector("#help").innerHTML = `"You risk entering a deflationary spiral, I would sugggest decreasing interest rates"`
                    }
            }

        //scoring
        if (inflrate < 3 && inflrate > 1)
            GDP = GDP + 1
        if (unemrate < 6)
            GDP = GDP + 1
        if (inflrate > 10)
            GDP = GDP -5
        if (inflrate > 20)
            GDP = GDP -10
        if (unemrate > 10)
            GDP = GDP -10

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
        var row = table.insertRow(1);
        

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

        if (currentM === (48))
            {
                    
                    let tintrate = 0;
                    let tunemrate = 0;
                    let tinflrate = 0;

                    for (let i = 0; i < recmonth.length; i++)
                        {
                            tintrate = tintrate + recmonth[i].intr
                            tunemrate = tunemrate + recmonth[i].unemp
                            tinflrate = tinflrate + recmonth[i].infl
                            tintrate = tintrate
                            tunemrate = tunemrate
                            tinflrate = tinflrate

                        }
                    tintrate = (tintrate / dur).toFixed(2)
                    tunemrate = (tunemrate / dur).toFixed(2)
                    tinflrate = (tinflrate / dur).toFixed(2)



                    var endtitle = 'Game Over';
                    var end = `Congratulations, you have finished your first four years as Chairman of the Federal Reserve!  During your tenure the average target interest rate was ${tintrate}, your average unemployment rate was ${tunemrate} and the average inflation rate was ${tinflrate}, your final score is ${GDP}.  If you would like to play again refresh this page.`;
                    var endm = `"If you would like to learn more about monetary policy consider visiting the links I shared throughout the simulation.  <a href="https://www.investopedia.com" target="_blank">Investopedia</a> is a wonderful resource!  You can also visit <a href="https://www.federalreserve.gov/" target="_blank">the Federal Reserve's website</a> to see their latest anouncements."`
                    document.querySelector("#message").innerHTML = end
                    document.querySelector("#mtitle").innerHTML = endtitle
                    document.querySelector("#help").innerHTML = endm
                    document.addEventListener("DOMContentLoaded", function () {
                        document.getElementById("#submit").style.display = "none";
                    });
    
            }


    }

}


//seperate responses for current month 3 above and lesss
//if currentM =< 3
//if currentM >3