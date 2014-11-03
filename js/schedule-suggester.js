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
    math9:  new Course("MATH 9 - Precalculus", TYPES.mathScience),
    math11: new Course("MATH 11 - Calculus I", TYPES.mathScience),
    math12: new Course("MATH 12 - Calculus II", TYPES.mathScience),
    math13: new Course("MATH 13 - Calculus III", TYPES.mathScience),
    math14: new Course("MATH 14 - Calculus IV", TYPES.mathScience),
    amth106: new Course("AMTH 106 - Differential Equations", TYPES.mathScience),
    amth108: new Course("AMTH 108 - Probability and Statistics", TYPES.mathScience),
    math53: new Course("MATH 53 - Linear Algebra", TYPES.mathScience),
    getMath: function(num) {
        var courses = ["math9", "math11", "math12", "math13", "math14", "amth106", "amth108", "math53", "core", "core", "core"];
        var filteredCourses = [];
        for (var key in courses) {
            var course = courses[key];
            if (!credits[course])
                filteredCourses.push(this[course]);
        }

        return filteredCourses[num];
    },
    
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

var credits;

var isEngr1Fall = true;

var getSchedule = function() { 
    function coreOrCourse(credit, course) {
        if (credit)
            return COURSES.core;
        
        return course;
    }
    var schedule = [
        [COURSES.ctw[0], 
            COURSES.getMath(0), 
            coreOrCourse(credits.chem11, COURSES.chem11), 
            coreOrCourse(credits.coen10, COURSES.coen10)
        ],
        [COURSES.ctw[1], 
            COURSES.getMath(1), 
            coreOrCourse(credits.phys31, COURSES.phys31),
            coreOrCourse(credits.coen11, COURSES.coen11)
        ],
        [coreOrCourse(credits.coen19, COURSES.coen19), 
            COURSES.getMath(2), 
            coreOrCourse(credits.phys32, COURSES.phys32),
            coreOrCourse(credits.coen12, COURSES.coen12)]
    ];

    /* If physics 31 and 32 are not present, put physics 33 into the first empty fall quarter slot. */
    if ($.inArray(COURSES.phys31, schedule[1]) == -1 &&
        $.inArray(COURSES.phys32, schedule[2]) == -1 &&
        !credits.phys33) {
        /* Find empty slot in fall */
        var index = $.inArray(COURSES.core, schedule[0]); 
        if (index > -1) {
            schedule[0][index] = COURSES.phys33;
        }
    }

    /* If we have two adjacent core slots, replace with C&I */
    if ($.inArray(COURSES.core, schedule[0]) != -1 && $.inArray(COURSES.core, schedule[1]) != -1) {
	/* Check that C&I is not already in the schedule */
	if ($.inArray(COURSES.ci[0], schedule[0]) == -1 && $.inArray(COURSES.ci[1])) {
	    var index = $.inArray(COURSES.core, schedule[0]);
	    schedule[0][index] = COURSES.ci[0];
	    index = $.inArray(COURSES.core, schedule[1]);
	    schedule[1][index] = COURSES.ci[1];
	}
    } else if ($.inArray(COURSES.core, schedule[1]) != -1 && $.inArray(COURSES.core, schedule[2]) != -1) {
	/* Check that C&I is not already in the schedule */
	if ($.inArray(COURSES.ci[0], schedule[1]) == -1 && $.inArray(COURSES.ci[2])) {
	    var index = $.inArray(COURSES.core, schedule[1]);
	    schedule[1][index] = COURSES.ci[0];
	    index = $.inArray(COURSES.core, schedule[2]);
	    schedule[2][index] = COURSES.ci[1];
	}
    }

    if (isEngr1Fall) {
        schedule[0].push(COURSES.engr1);
        schedule[1].push(COURSES.engrButton);
    } else {
        schedule[1].push(COURSES.engr1);
        schedule[0].push(COURSES.engrButton);
    }

    return schedule;
};

var setSchedule = function(schedule) {
    schedule = schedule;

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
            if ($('#calcBC').val() < 3 && $('input[name=math]:checked').val() < 1)
                credits.math11 = false;
        }
    },
    calcBC: function(score) { 
        var mathCredit = $('input[name=math]:checked').val();
        if (score == 3) {
            credits.math11 = true; 

            if (mathCredit < 2)
                credits.math12 = false; 
        } else if (score > 3) {
            credits.math11 = true; 
            credits.math12 = true; 
        } else {
            if ($('#calcAB').val() < 4 && mathCredit < 1)
                credits.math11 = false;
            else if (mathCredit < 2)
                credits.math12 = false;
        }
    },
    csci:   function(score) { 
        var coen11 = $('#COEN11').prop('checked');
        var experience = $('#progExperience').prop('checked');
        if (score < 3) {
            if (!experience)
                credits.coen10 = false;
            if (!coen11)
                credits.coen11 = false; 
        } else if (score == 3) {
            credits.coen10 = true;
            if (!coen11)
                credits.coen11 = false;
        } else if (score > 3) {
            credits.coen10 = true;
            credits.coen11 = true; 
        }
    },
    chem:   function(score) { 
        if (score > 2) {
            credits.chem11 = true; 
        } else {
            if (!$('#CHEM11').prop('checked'))
                credits.chem11 = false; 
        }
    },
    physM:  function(score) { 
        if (score > 3) {
            credits.phys31 = true; 
        } else {
            if (!$('#PHYS31').prop('checked'))
                credits.phys31 = false; 
        }
    },
    physEM: function(score) { 
        if (score > 3) {
            credits.phys33 = true; 
        } else {
            if (!$('#PHYS33').prop('checked'))
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
};

/* Handlers for changing equivalent credit switches */
var EQUIVALENT = {
    math53: function(checked) {
        credits.math53 = !credits.math53;
    },
   coen20: function(checked) {
        credits.coen20 = !credits.coen20;
    },
    elen50: function(checked) {
        credits.elen50 = !credits.elen50;
    },
    coen19: function(checked) {
        credits.coen19 = !credits.coen19;
    },
    amth106: function(checked) {
        credits.amth106 = !credits.amth106;
    },
    chem11: function(checked) {
        if ($('#chem').val() < 3)
            credits.chem11 = !credits.chem11;
    },
    phys31: function(checked) {
        if ($('#physM').val() < 4)
            credits.phys31 = !credits.phys31;
    },
    phys32: function(checked) {
        credits.phys32 = !credits.phys32;
    },
    phys33: function(checked) {
        if ($('#physEM').val() < 4)
            credits.phys33 = !credits.phys33;
    }
};

var reset = function() {
    credits = {
        math9: true,
        math11: false,
        math12: false,
        math13: false,
        math14: false,

        coen10: false,
        coen11: false,
        coen12: false,

        phys31: false,
        phys32: false,

        chem11: false
    };

    /* Uncheck all checkboxes */
    $("input:checkbox").prop('checked', false);

    /* Reset all select elements */
    $("select").val('0');

    /* Reset radio buttons */
    $("input:radio[value='0']").prop('checked', true);

    drawSchedule();
};

$(document).ready(function() {
    /* Enable custom switch */
    $("[name='major-switch']").bootstrapSwitch();
    /* Bind print button to window.print() */
    $("#print-btn").click(function() {
        window.print();
    });
    /* Reset button just calls the reset function */
    $("#reset-btn").click(function() {
        reset();
    });

    /* Bind select elements to updating functions defined in SELECTS */
    $.each(SELECTS, function(k) {
        $('#' + k).on('change', function () {selectChange($(this));});    
    });

    /* Skip COEN 10 if user has programming experience. */
    $('#progExperience').on('change', function(e) {
        if ($('#csci').val() < 3 && !credits.coen11)
            credits.coen10 = e.target.checked;

        drawSchedule(); 
    });

    /* Equivalent credit */
    $('input.credit:checkbox').on('change', function(e) {
        var id = e.target.id.toLowerCase();
        EQUIVALENT[id](e.target.checked);
        drawSchedule();
    });

    /* Handle math radio buttons value changing. */
    $('input.credit:radio[name="math"]').on('change', function(e) {
        var val = e.target.value;

        var calcAB = $('#calcAB').val();
        var calcBC = $('#calcBC').val();
        if (calcAB < 4 && calcBC < 3)
            credits.math11 = false;
        if (calcBC < 4)
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

    /* Handle coen radio buttons value changing. */
    $('input.credit:radio[name="coen"]').on('change', function(e) {
        var val = e.target.value;

        var csci = $('#csci').val();

        if (csci < 3 && !$('#progExperience').prop('checked'))
            credits.coen10 = false;
        if (csci < 4)
            credits.coen11 = false;

        credits.coen12 = false;

        if (val-- > 0)
            credits.coen10 = true;
        if (val-- > 0)
            credits.coen11 = true;
        if (val-- > 0)
            credits.coen12 = true;

        drawSchedule();
    });

    /* Calculus readiness exam */
    $('#calcReadiness').on('change', function() {
        if (!credits.math11) {
            credits.math9 = !credits.math9;
            drawSchedule();
        } else {
            $('#readinessWarning').fadeIn();
            setTimeout(function() {
                $('#readinessWarning').fadeOut();
            }, 5000);
            $('#calcReadiness').prop('checked', false);
        }
    });

    reset();
});
