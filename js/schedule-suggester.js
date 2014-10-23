var COEN = "COEN";
var WebDes = "Web Design and Engineering";
var major = COEN;

var CORE = "University Core";
var ENGR_BUTTON = "<button id='engr1-btn' class='btn btn-block btn-info'>ENGR 1 here</button>";

var COURSES = {
    math: ["MATH 11 - Calculus I",
           "MATH 12 - Calculus II",
           "MATH 13 - Calculus III",
           "MATH 14 - Calculus IV",
           "AMTH 106 - Differential Equations",
           "AMTH 108 - Probability and Statistics",
           "MATH 53 - Linear Algebra"],
    
    coen: ["COEN 10 - Intro. to Programming",
           "COEN 11 - Advanced Programming",
           "COEN 12 - Data Structures",
           "COEN 19 - Discrete Math",
           "COEN 21 - Logic Design"],

    chem: "CHEM 11 - Chemistry I",

    phys: ["PHYS 31 - Physics I",
           "PHYS 32 - Physics II",
           "PHYS 33 - Physics III"],

    engr1: "ENGR 1 - Introduction to Engineering",

    ctw: ["CTW 1 - Critical Thinking & Writing I",
          "CTW 2 - Critical Thinking & Writing II"]
};

var credits = {
    math: 0,
    coen: 0,
    phys: 0
};

var schedule = [
    [COURSES.ctw[0], 
        COURSES.math[credits.math], 
        COURSES.chem, 
        COURSES.coen[credits.coen], 
        COURSES.engr1],
    [COURSES.ctw[1], 
        COURSES.math[credits.math + 1], 
        COURSES.phys[credits.phys], 
        COURSES.coen[credits.coen + 1],
        ENGR_BUTTON],
    [COURSES.coen[credits.coen + 2], 
        COURSES.math[credits.math + 2], 
        COURSES.phys[credits.phys + 1], 
        COURSES.coen[credits.coen + 3]]
];


var updateSchedule = function() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 3; j++) {
            var e = $('#row' + i + ' > td').eq(j).html(schedule[j][i]);
        }
    }

    $("#engr1-btn").click(switchEngr1);
};

var switchEngr1 = function() {
    if (schedule[0][4] === ENGR_BUTTON) {
        schedule[0].pop();
        schedule[0].push(COURSES.engr1);
        schedule[1].pop();
        schedule[1].push(ENGR_BUTTON);
    } else if (schedule[1][4] === ENGR_BUTTON) {
        schedule[1].pop();
        schedule[1].push(COURSES.engr1);
        schedule[0].pop();
        schedule[0].push(ENGR_BUTTON);
    }

    updateSchedule();
};

$(document).ready(function() {
    $("[name='major-switch']").bootstrapSwitch();
    $("#print-btn").click(function() {window.print();});

    updateSchedule();
});
