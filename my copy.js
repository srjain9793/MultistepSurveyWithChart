var questJson = {
    "AWARENESS": [
        { q1: "In my team we are comfortable when individuals request their difference to be acknowledged and/or accommodated", ans: null },
        { q1: "In my team we make a conscious effort to test our own assumptions about those who are different to us", ans: null },
        { q1: "In my team we treat others as individuals, not just as members of the group to which they are perceived to belong", ans: null },
    ],
    "LEARNING MINDSET": [
        { q1: "In my team we are driven by the opportunity to learn", ans: null },
        { q1: "In my team we apply what we have learned from past experiences", ans: null },
        { q1: "In my team we adapt under the pressure of change", ans: null }
    ],
    "ENGAGING WITH DIFFRENCE": [
        { q1: "In my team we are willing to accommodate one another’s working and communication style differences", ans: null },
        { q1: "In my team we listen to the diverse perspectives of all team members, regardless of who they are", ans: null },
        { q1: "In my team we make time to get to know each other, including those who are very different to ourselves", ans: null },
    ],
    "VALUING DIVERSITY": [
        { q1: "In my team we actively create opportunities to leverage diverse perspectives and ideas", ans: null },
        { q1: "In my team we highlight it when diverse contributions have led to team success", ans: null },
        { q1: "In my team we emphasise the value of diversity in better serving our customers / clients", ans: null },
    ],
    "EMBEDDING PSYCVHOLOGICAL SAFETY": [
        { q1: "In my team we make sure everyone’s voice is heard, even if the majority doesn’t agree with them", ans: null },
        { q1: "In my team we take time to reflect on new ways of doing things, without losing focus on timely execution", ans: null },
        { q1: "In my team we are interested in learning from each other, including from new or junior members", ans: null },
    ],
    "OPENNESS TO NEW IDEAS": [
        { q1: "In my team we welcome differences of opinion", ans: null },
        { q1: "In my team it is safe to openly acknowledge mistakes", ans: null },
        { q1: "In my team it is safe for people to experiment and fail in the interest of innovation or continuous improvement", ans: null },
    ],
    "BOUNDARY SPANNING": [
        { q1: "In my team we use various ways to connect with others in different locations and functions", ans: null },
        { q1: "In my team we quickly communicate new knowledge and approaches to those outside the team", ans: null },
        { q1: "In my team we seek out new ideas and approaches from outside the organisation", ans: null },
    ],
    "D&I CHAMPION ": [
        { q1: "In my team we take action to support fairness in all areas", ans: null },
        { q1: "In my team we make considered decisions to bring about a more diverse and inclusive workplace", ans: null },
        { q1: "In my team we notice and respond when those in marginal groups feel excluded", ans: null },
    ],
    "hsForm": []
}


var currentTab = 0;

function createPage() {
    var myDiv = '';

    document.getElementById("intro").style.display = 'none';
    document.getElementById("btnDiv").style.display = 'block';

    var surveyDiv = document.getElementById("surveyDiv");
    surveyDiv.style.display = 'block';
    var questKeys = Object.keys(questJson);
    var stepDots = '';
    for (var i = 0; i < questKeys.length; i++) {
        stepDots += '<span class="step"></span>';
        if (questKeys[i] == 'hsForm') {
            myDiv += `<div class="tab">
            </div>`;
        } else {
            var opts = '';
            for (var j = 0; j < questJson[questKeys[i]].length; j++) {
                var quest = questJson[questKeys[i]][j];
                opts += `${questKeys[i][0] + (j + 1) + ": " + quest.q1}
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Never<input type="radio" name="${questKeys[i] + j}" value="1">
                    Sometimes<input type="radio" name="${questKeys[i] + j}" value="2">
                    Frequently<input type="radio" name="${questKeys[i] + j}" value="3">
                    Very Frequently<input type="radio" name="${questKeys[i] + j}" value="4">
                    Always<input type="radio" name="${questKeys[i] + j}" value="5">
                    <br>`;
            }
            myDiv += `<div class="tab"><h1>${questKeys[i]}</h1>
                ${opts}
                </div>`;
        }
    }
    surveyDiv.innerHTML = (myDiv);

    document.getElementById("step_div").innerHTML = stepDots;
    showTab(currentTab); // Display the current tab

}
var avgJson = {
    "Inclusion Overall ": {
        ans: [],
        avg: 0
    }
};
function getValues() {
    // console.log("currentTab == ", currentTab);

    var questKeys = Object.keys(questJson);
    for (var i = 0; i < questKeys.length; i++) {

        if (i == currentTab && questKeys[i] != 'hsForm') {

            var questAvg = 0;
            avgJson[questKeys[i]] = {
                ans: []
            };

            for (var j = 0; j < questJson[questKeys[i]].length; j++) {
                // console.log("==", questKeys[i] + j, document.querySelector(`input[name="${questKeys[i] + j}"]`));
                var v = document.querySelector(`input[name="${questKeys[i] + j}"]:checked`);
                if (v) {
                    avgJson[questKeys[i]].ans.push(v.value);
                    questAvg += parseFloat(v.value)
                } else {
                    return true;
                };
            }
            questAvg = (questAvg / 3).toFixed(2);
            avgJson[questKeys[i]].avg = questAvg;
            avgJson["Inclusion Overall "].ans.push(questAvg);

            var totolAvg = 0;
            for (var j = 0; j < avgJson["Inclusion Overall "].ans.length; j++) {
                totolAvg += avgJson["Inclusion Overall "].ans[j];
            }
            totolAvg = totolAvg / avgJson["Inclusion Overall "].ans.length;
            avgJson["Inclusion Overall "].avg = totolAvg;
        }
    }
    // console.log("questAvg == ", avgJson);
    return true;
}



function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    // console.log("nextPrev called", n);

    var x = document.getElementsByClassName("tab");
    if (n == 1 && !getValues()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("surveyDiv").style.display = "none";
        document.getElementById("btnDiv").style.display = "none";
        document.getElementById("graphContainer").style.display = "block";
        drawGraph();
        return false;
    }
    else if (currentTab == x.length - 1) {
        document.getElementById("surveyDiv").style.display = "none";
        document.getElementById("btnDiv").style.display = "none";
        document.getElementsByClassName('hbspt-form')[0].style.display = 'block';
    }
    showTab(currentTab);
}

function validateForm() {
    // console.log("validate called");
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        // console.log("validate called", y[i].checked);
        if (y[i].checked) {
            valid = true;
        } else {
            console.log("validation failed");
            y[i].className += " invalid";
            valid = true;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}
drawGraph()
function drawGraph() {
    // console.log("drawGraph called");
    anychart.onDocumentReady(function () {
        var graphJson = [];
        avgJson = { "AWARENESS": { "ans": ["3", "4", "4"], "avg": 3.6666666666666665 }, "LEARNING MINDSET": { "ans": ["4", "4", "4"], "avg": 6 }, "ENGAGING WITH DIFFRENCE": { "ans": [], "avg": 0 }, "VALUING DIVERSITY": { "ans": ["2", "3", "3"], "avg": 2.6666666666666665 }, "EMBEDDING PSYCVHOLOGICAL SAFETY": { "ans": ["4", "5", "3"], "avg": 4 }, "OPENNESS TO NEW IDEAS": { "ans": ["1", "2", "2"], "avg": 1.6666666666666667 }, "BOUNDARY SPANNING": { "ans": ["2", "3", "2"], "avg": 2.3333333333333335 }, "D&I CHAMPION ": { "ans": ["3", "3", "1"], "avg": 2.3333333333333335 } };
        var keys = Object.keys(avgJson);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (k != 'hsForm') {
                graphJson.push(
                    {
                        x: k,
                        value: avgJson[k].avg - 4,
                        normal: {
                            fill: (avgJson[k].avg - 4 < 0 ? 'rgb(158,1,64)' : 'rgb(32,90,104)'),
                            stroke: null,
                            label: { enabled: true },
                            tooltip: "tt"
                        }
                    }
                );
            }
        }

        // set the data
        var data = {
            // header: ["Name", "Your Avg."],
            rows: graphJson
        };

        // create the chart
        var chart = anychart.bar();

        chart.animation(true);

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("Your Inclusion Results vs Top Quartile Global Benchmark");

        var tooltip = chart.tooltip();
        tooltip.format(function () {
            /* code of your function */
            return "Your Avg: " + (4 + this.value);
        });

        // chart.tooltip().useHtml(true);

        // tooltip settings
        // var tooltip = chart.tooltip();
        // tooltip.positionMode("point");
        // tooltip.format("Your Avg: {%value}</b>");


        // draw
        chart.container("scoreGraph");
        chart.draw();
    });
}