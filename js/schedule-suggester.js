var COEN = "COEN";
var WebDes = "Web Design and Engineering";
var major = COEN;

var CORE = "University Core";
var ENGR_BUTTON_TEXT = "<button id='engr1-btn' class='btn btn-block btn-info'>ENGR 1 here</button>";
function Course(title, type) {
    this.title = title;
    this.type = type;
}

var TYPES = {
    core: "warning",
    mathScience: "info",
    engr: "success"
};

var COURSES = {
    math: [new Course("MATH 11 - Calculus I", TYPES.mathScience),
           new Course("MATH 12 - Calculus II", TYPES.mathScience),
           new Course("MATH 13 - Calculus III", TYPES.mathScience),
           new Course("MATH 14 - Calculus IV", TYPES.mathScience),
           new Course("AMTH 106 - Differential Equations", TYPES.mathScience),
           new Course("AMTH 108 - Probability and Statistics", TYPES.mathScience),
           new Course("MATH 53 - Linear Algebra", TYPES.mathScience)],
    
    coen: [new Course("COEN 10 - Intro. to Programming", TYPES.engr),
           new Course("COEN 11 - Advanced Programming", TYPES.engr),
           new Course("COEN 12 - Data Structures", TYPES.engr),
           new Course("COEN 19 - Discrete Math", TYPES.engr),
           new Course("COEN 21 - Logic Design", TYPES.engr)],

    chem:  new Course("CHEM 11 - Chemistry I", TYPES.mathScience),

    phys: [new Course("PHYS 31 - Physics I", TYPES.mathScience),
           new Course("PHYS 32 - Physics II", TYPES.mathScience),
           new Course("PHYS 33 - Physics III", TYPES.mathScience)],

    engr1: new Course("ENGR 1 - Intro. to Engineering", TYPES.engr),

    candi: [ new Course("C&I 1 - Cultures & Ideas 1", TYPES.core),
           new Course("C&I 2 - Cultures & Ideas 2", TYPES.core)],

    ctw: [ new Course("CTW 1 - Critical Thinking & Writing I", TYPES.core),
           new Course("CTW 2 - Critical Thinking & Writing II", TYPES.core)],

    engrButton: new Course(ENGR_BUTTON_TEXT, "") 
};

var credits = {
    math: 0,
    setMath: function(score) {this.math = Math.max(this.math, score); },
    coen: 0,
    setCoen: function(score) {this.coen = Math.max(this.coen, score); },
    phys: 0,
    setPhys: function(score) {this.phys = Math.max(this.phys, score); },
    chem: 0,
    setChem: function(score) {this.chem = Math.max(this.chem, score); }
};

var gschedule;
var isEngr1Fall = true;

var getSchedule = function() { 
    gschedule = [
        [COURSES.ctw[0], 
            COURSES.math[credits.math], 
            COURSES.chem, 
            COURSES.coen[credits.coen], 
        ],
        [COURSES.ctw[1], 
            COURSES.math[credits.math + 1], 
            COURSES.phys[credits.phys], 
            COURSES.coen[credits.coen + 1],
        ],
        [COURSES.coen[credits.coen + 2], 
            COURSES.math[credits.math + 2], 
            COURSES.phys[credits.phys + 1], 
            COURSES.coen[credits.coen + 3]]
    ];

    if (isEngr1Fall) {
        gschedule[0].push(COURSES.engr1);
        gschedule[1].push(COURSES.engrButton);
    } else {
        gschedule[1].push(COURSES.engr1);
        gschedule[0].push(COURSES.engrButton);
    }

    return gschedule;
};

var setSchedule = function(schedule) {
    gschedule = schedule;

    drawSchedule();
};

var drawSchedule = function() {
    var schedule = getSchedule();
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 3; j++) {
            var course = schedule[j][i];
            if (course) {
                var e = $('#row' + i + ' > td').eq(j).html(course.title);
                e.attr("class", course.type);
            }
        }
    }

    $("#engr1-btn").click(switchEngr1);
};

var switchEngr1 = function() {
    isEngr1Fall = !isEngr1Fall;
    drawSchedule();
};

var SELECTS = {
    calcAB: function() { 
        credits.setMath(1); 
    },
    calcBC: function() { 
        credits.setMath(2); 
    },
    csci:   function() { 
        credits.setCoen(1); 
    },
    chem:   function() { 
        credits.setChem(1); 
    },
    physM:  function() { 
        credits.setPhys(1); 
    },
    /* TODO: Needs to be changed to account for skipping different classes */
    physEM: function() { 
        credits.setPhys(1); 
    }
};

var selectChange = function(select) {
    SELECTS[$(select).attr('id')]($(select).val());
    drawSchedule();
}

$(document).ready(function() {
    /* Enable custom switch */
    $("[name='major-switch']").bootstrapSwitch();
    /* Bind print button to window.print() */
    $("#print-btn").click(function() {window.print();});

    /* Bind select elements to updating functions defined in SELECTS */
    $.each(SELECTS, function(k) {
        $('#' + k).on('change', function () {selectChange($(this));});    
    });

    /* Need to account for deselecting (same for SELECT elements above) */
    $('#progExperience').on('change', function() {
        credits.setCoen(1);
        drawSchedule(); 
    });

    drawSchedule();
});
