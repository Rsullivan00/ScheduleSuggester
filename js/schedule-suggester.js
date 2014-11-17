var COEN = "COEN";
var WEB_DESIGN = "Web Design and Engineering";
var major = COEN;

/* Global flag to track which quarter to put ENGR 1. */
var isEngr1Fall = true;

var skipCourse = function(course) {
    var id = course.id;
    var skippedHTML = "<div id='" + id + "' class='skipped col-md-6'>" + course.title + "</div>";

    /* Don't add duplicates. */
    if ($('#' + id).length == 0)
        $('#courses-skipped').append(skippedHTML);

    return COURSES.core;
}

/* Uses the COURSES and credits objects to return a matrix of Course objects. */
var getSchedule = function() { 
    /* Used to insert a core course if the user already has credit for the course given as a parameter. */
    function getCourse(courseName, equivCourseList) {
        var selector = '#' + courseName.toUpperCase();
        var course = COURSES[courseName];
        if ($(selector).prop('type') == 'checkbox') { 
            if ($(selector).prop('checked')) {
                return skipCourse(course);
            } else if (equivCourseList) {
                /* Check equivalent checkboxes for replacement credit. */
                var equivCourses = equivCourseList.split(' ');
                for (var key in equivCourses) {
                    var altSelector = '#' + equivCourses[key].toUpperCase();
                     if ($(altSelector).prop('checked')) 
                        return skipCourse(course);
                }
            }
        } else  {
            /* Else it's a radio button */
            var radioSelector = 'input.credit:radio[name="' + $(selector).prop('name') + '"]:checked';
            if ($(radioSelector).val() >= $(selector).val()) 
                return skipCourse(course);
        }
        
        return course;
    }

    function getMath(num) {
        var courses = ["math9", "math11", "math12", "math13", "math14", "amth106", "amth108", "math53"];
        if (major == WEB_DESIGN) {
            courses.splice(courses.indexOf("amth106"), 1);
            courses.splice(courses.indexOf("math53"), 1);
        }
        var filteredCourses = [];
        for (var key in courses) {
            var course = courses[key];
            var equiv = "";
            if (course == "amth106")
                equiv = "chem12 envs21";
            course = getCourse(course, equiv);
            if (course != COURSES.core)
                filteredCourses.push(course);
        }

        filteredCourses.push(COURSES.core, COURSES.core, COURSES.core);

        return filteredCourses[num];
    }
    
    /* Reset skipped courses. */
    $('#courses-skipped').html('');

    var schedule;
    if (major == WEB_DESIGN) {
        schedule = [
            [COURSES.ctw[0], 
                getMath(0), 
                getCourse('natsci', 'chem11 envs21'), 
                getCourse('coen10')
            ],
            [COURSES.ctw[1], 
                getMath(1), 
                COURSES.core,
                getCourse('coen11')
            ],
            [getCourse('coen19'), 
                getMath(2), 
                COURSES.core,
                getCourse('coen12')]
        ];
    } else {
        /* COEN major */
        schedule = [
            [COURSES.ctw[0], 
                getMath(0), 
                getCourse('chem11', 'chem12 envs21'), 
                getCourse('coen10')
            ],
            [COURSES.ctw[1], 
                getMath(1), 
                getCourse('phys31'),
                getCourse('coen11')
            ],
            [getCourse('coen19'), 
                getMath(2), 
                getCourse('phys32'),
                getCourse('coen12')]
        ];
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

    /* Add the ENGR 1 course and the button to change its location */
    if (isEngr1Fall) {
        schedule[0].push(COURSES.engr1);
        schedule[1].push(COURSES.engrButton);
    } else {
        schedule[1].push(COURSES.engr1);
        schedule[0].push(COURSES.engrButton);
    }

    return schedule;
};

/* Gets the up-to-date schedule and draws it to the screen. */
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

/* Moves the ENGR 1 location and button by setting global flag. */
var switchEngr1 = function() {
    isEngr1Fall = !isEngr1Fall;
    drawSchedule();
};

/* Resets all credits and UI components to initial states. */
var reset = function() {
    /* Enable all inputs */
    $("input").prop('disabled', false);
    $("select").prop('disabled', false);

    /* Uncheck all checkboxes */
    $("input:checkbox").prop('checked', false);

    /* Reset all select elements */
    $("select").val('0');

    /* Reset radio buttons */
    $("input:radio[value='0']").prop('checked', true);

    /* Hide calc readiness warning. */
    $('#calcReadinessWarning').prop('hidden', true);

    drawSchedule();
};

/* Called as soon as the sources have loaded and the DOM is ready. 
 * Initializes logic and UI components.
 */
$(document).ready(function() {
    /* Enable custom switch */
    $("[name='major-switch']").bootstrapSwitch();
    $("[name='major-switch']").on('switchChange.bootstrapSwitch', function(e) {
        if (major == COEN) {
            major = WEB_DESIGN;
        } else {
            major = COEN;
        }

        drawSchedule();
    });

    /* Bind print button to window.print() */
    $("#print-btn").click(function() {
        window.print();
    });

    /* Reset button just calls the reset function */
    $("#reset-btn").click(function() {
        reset();
    });

    bindSelects();

    /* Bind equivalent credit checkboxes and radio buttons */
    $('input.credit').on('change', function(e) {
        drawSchedule();
    });

    /* Skip COEN 10 if user has programming experience. */
    $('#progExperience').on('change', function(e) {
        if ($('#csci').val() < THRESHOLDS.csci)
            updateRadio('coen10', e.target.checked);

        drawSchedule(); 
    });

    /* Show user that they can't choose to skip COEN 10 if they already have credit for it. */
    $('#collapseFour').on('show.bs.collapse', function() {
        var hasCredit = $('input.credit:radio[name="coen"]:checked').val() > 0;
        $('#progExperience').prop('disabled', hasCredit);
        $('#coen10Warning').prop('hidden', !hasCredit);
    });

    /* Calculus readiness exam */
    $('#calcReadiness').on('change', function(e) {
        if (e.target.checked) {
            updateRadio('math9', false);
            $('#calcAB').prop('disabled', true);
            $('#calcBC').prop('disabled', true);
        } else {
            /* Check the select values to reset schedule. */
            $('#calcAB').prop('disabled', false);
            $('#calcBC').prop('disabled', false);

            $('#calcAB').change();
            $('#calcBC').change();
        }
        $('#calcReadinessWarning').prop('hidden', !e.target.checked);
        drawSchedule();
    });

    reset();
});
