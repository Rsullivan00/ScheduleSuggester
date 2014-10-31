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
    math: [new Course("MATH 9 - Precalculus", TYPES.mathScience),
           new Course("MATH 11 - Calculus I", TYPES.mathScience),
           new Course("MATH 12 - Calculus II", TYPES.mathScience),
           new Course("MATH 13 - Calculus III", TYPES.mathScience),
           new Course("MATH 14 - Calculus IV", TYPES.mathScience),
           new Course("AMTH 106 - Differential Equations", TYPES.mathScience),
           new Course("AMTH 108 - Probability and Statistics", TYPES.mathScience),
           new Course("MATH 53 - Linear Algebra", TYPES.mathScience)],
    
    coen10: new Course("COEN 10 - Intro. to Programming", TYPES.engr),
    coen11: new Course("COEN 11 - Advanced Programming", TYPES.engr),
    coen12: new Course("COEN 12 - Data Structures", TYPES.engr),
    coen19: new Course("COEN 19 - Discrete Math", TYPES.engr),
    coen21: new Course("COEN 21 - Logic Design", TYPES.engr),

    chem11: new Course("CHEM 11 - Chemistry I", TYPES.mathScience),

    phys31: new Course("PHYS 31 - Physics I", TYPES.mathScience),
    phys32: new Course("PHYS 32 - Physics II", TYPES.mathScience),
    phys33: new Course("PHYS 33 - Physics III", TYPES.mathScience),

    engr1: new Course("ENGR 1 - Intro. to Engineering", TYPES.engr),

    ci: [ new Course("C&I 1 - Cultures & Ideas 1", TYPES.core),
           new Course("C&I 2 - Cultures & Ideas 2", TYPES.core)],

    ctw: [ new Course("CTW 1 - Critical Thinking & Writing I", TYPES.core),
           new Course("CTW 2 - Critical Thinking & Writing II", TYPES.core)],

    core: new Course("University Core", TYPES.core),

    engrButton: new Course(ENGR_BUTTON_TEXT, "") 
};

var credits = {
   math: function() { 
        var creds = 0;
        if (this.math9) creds++;
        if (this.math11) creds++;
        if (this.math12) creds++;
        if (this.math13) creds++;
        if (this.math14) creds++;
        return creds; 
    },
    math9: true,
    math11: false,
    math12: false,
    math13: false,
    math14: false,
    coen: 0,
    coen10: false,
    coen11: false,
    coen12: false,
    phys: 0,
    phys31: false,
    phys32: false,
    chem: 0,
    chem11: false,
};

var gschedule;
var isEngr1Fall = true;

var getSchedule = function() { 
    function coreOrCourse(credit, course) {
	if (credit)
	    return COURSES.core;
	
	return course;
    }
    gschedule = [
        [COURSES.ctw[0], 
            COURSES.math[credits.math()], 
            coreOrCourse(credits.chem11, COURSES.chem11), 
            coreOrCourse(credits.coen10, COURSES.coen10)
        ],
        [COURSES.ctw[1], 
            COURSES.math[credits.math() + 1], 
            coreOrCourse(credits.phys31, COURSES.phys31),
            coreOrCourse(credits.coen11, COURSES.coen11)
        ],
        [coreOrCourse(credits.coen19, COURSES.coen19), 
            COURSES.math[credits.math() + 2], 
            coreOrCourse(credits.phys32, COURSES.phys32),
            coreOrCourse(credits.coen12, COURSES.coen12)]
    ];

    /* If we have two adjacent core slots, replace with C&I */
    if ($.inArray(COURSES.core, gschedule[0]) != -1 && $.inArray(COURSES.core, gschedule[1]) != -1) {
	/* Check that C&I is not already in the schedule */
	if ($.inArray(COURSES.ci[0], gschedule[0]) == -1 && $.inArray(COURSES.ci[1])) {
	    var index = $.inArray(COURSES.core, gschedule[0]);
	    gschedule[0][index] = COURSES.ci[0];
	    index = $.inArray(COURSES.core, gschedule[1]);
	    gschedule[1][index] = COURSES.ci[1];
	}
    } else if ($.inArray(COURSES.core, gschedule[1]) != -1 && $.inArray(COURSES.core, gschedule[2]) != -1) {
	/* Check that C&I is not already in the schedule */
	if ($.inArray(COURSES.ci[0], gschedule[1]) == -1 && $.inArray(COURSES.ci[2])) {
	    var index = $.inArray(COURSES.core, gschedule[1]);
	    gschedule[1][index] = COURSES.ci[0];
	    index = $.inArray(COURSES.core, gschedule[2]);
	    gschedule[2][index] = COURSES.ci[1];
	}
    }

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
    calcAB: function(score) { 
        if (score > 3) {
            credits.math11 = true;
        } else {
            credits.math11 = false;
        }
    },
    calcBC: function(score) { 
        /* TODO: Fix bug with calcAB and BC undoing */
        if (score == 3) {
            credits.math11 = true; 
        } else if (score > 3) {
            credits.math11 = true; 
            credits.math12 = true; 
        } else {
            credits.math11 = false;
            credits.math12 = false;
        }
    },
    csci:   function(score) { 
        if (score > 3) {
            credits.coen11 = true; 
        } else {
            credits.coen11 = false; 
        }
    },
    chem:   function(score) { 
        if (score > 2) {
            credits.chem11 = true; 
        } else {
            credits.chem11 = false; 
        }
    },
    physM:  function(score) { 
        if (score > 3) {
            credits.phys31 = true; 
        } else {
            credits.phys31 = false; 
        }
    },
    physEM: function(score) { 
        credits.setPhys(1); 
        if (score > 4) {
            credits.phys33 = true; 
        } else {
            credits.phys33 = false; 
        }
    }
};

var selectChange = function(select) {
   var val = $(select).val();
    /* N/A selected corresponds to a score of 0 */
    if (val === "N/A") 
	val = 0;
    SELECTS[$(select).attr('id')](val);
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

    $('#progExperience').on('change', function() {
        credits.coen10 = !credits.coen10;
        drawSchedule(); 
    });

    /* Equivalent credit */
    $('input.credit:checkbox').on('change', function(e) {
        var id = e.target.id.toLowerCase();
        credits[id] = !credits[id];
        drawSchedule();
    });

    /* This function is some awful code. Everyone close your eyes before it burns you. */
    $('input.credit:radio').on('change', function(e) {
        var val = e.target.value;

        credits.math11 = false;
        credits.math12 = false;
        credits.math13 = false;
        credits.math14 = false;

        if (val-- > 0)
            credits.math11 = true;
        if (val-- > 0)
            credits.math12 = true;
        if (val-- > 0)
            credits.math13 = true;
        if (val-- > 0)
            credits.math14 = true;

        drawSchedule();
    });

    /* Calculus readiness exam */
    $('#calcReadiness').on('change', function() {
        credits.math9 = !credits.math9;
        drawSchedule();
    });

    drawSchedule();
});
