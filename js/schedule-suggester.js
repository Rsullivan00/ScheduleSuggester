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
    
<<<<<<< HEAD
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
=======
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
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
           new Course("C&I 2 - Cultures & Ideas 2", TYPES.core)],

    ctw: [ new Course("CTW 1 - Critical Thinking & Writing I", TYPES.core),
           new Course("CTW 2 - Critical Thinking & Writing II", TYPES.core)],
<<<<<<< HEAD
=======
    core: new Course("University Core", TYPES.core),
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f

    engrButton: new Course(ENGR_BUTTON_TEXT, "") 
};

var credits = {
<<<<<<< HEAD
    math: 0,
    setMath: function(score) {this.math = Math.max(this.math, score); },
    coen: 0,
    setCoen: function(score) {this.coen = Math.max(this.coen, score); },
    phys: 0,
    setPhys: function(score) {this.phys = Math.max(this.phys, score); },
    chem: 0,
    setChem: function(score) {this.chem = Math.max(this.chem, score); }
=======
    math: function() { 
	var creds = 0;
	if (this.math11) creds++;
	if (this.math12) creds++;
	if (this.math13) creds++;
	if (this.math14) creds++;
	return creds; 
    },
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
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
};

var gschedule;
var isEngr1Fall = true;

var getSchedule = function() { 
<<<<<<< HEAD
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

=======
    function coreOrCourse(credit, course) {
	if (credit)
	    return COURSES.core;
	
	return course;
    }
    gschedule = [
        [COURSES.ctw[0], 
            COURSES.math[credits.math()], 
            coreOrCourse(credits.chem11, COURSES.chem11), 
            coreOrCourse(credits.coen11, COURSES.coen11)
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

>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
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
<<<<<<< HEAD
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
=======
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
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
    }
};

var selectChange = function(select) {
<<<<<<< HEAD
    SELECTS[$(select).attr('id')]($(select).val());
=======
    var val = $(select).val();
    /* N/A selected corresponds to a score of 0 */
    if (val === "N/A") 
	val = 0;
    SELECTS[$(select).attr('id')](val);
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
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
<<<<<<< HEAD
        credits.setCoen(1);
=======
        credits.coen11 = true;
>>>>>>> fb6a3cc77e62c09d30a31469b79ac230ba4afd0f
        drawSchedule(); 
    });

    drawSchedule();
});
