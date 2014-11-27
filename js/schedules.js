function getMath(num) {
    var courses = ["math9", "math11", "math12", "math13", "math14", "amth106", "amth108", "math53"];
    if (major == MAJORS.WEB_DESIGN) {
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

function skipCourse(course) {
    var id = course.id;
    var skippedHTML = "<div id='" + id + "' class='skipped col-md-6'>" + course.title + "</div>";

    /* Don't add duplicates. */
    if ($('#' + id).length == 0)
        $('#courses-skipped').append(skippedHTML);

    return COURSES.core;
}

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

function insertCandI(schedule) {
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

    return schedule;
}

function insertENGR1(schedule) {
    /* Add the ENGR 1 course and the button to change its location */
    if (isEngr1Fall) {
        schedule[0].push(COURSES.engr1);
        schedule[1].push(COURSES.engrButton);
    } else {
        schedule[1].push(COURSES.engr1);
        schedule[0].push(COURSES.engrButton);
    }
}

function coreLocation(schedule, quarter) {
    return $.inArray(COURSES.core, schedule[quarter]);
}

function insertCourse(schedule, course, quarters) {
    for (var quarter in quarters) {
        var core = coreLocation(schedule, quarter);
        if (core != -1) {
            schedule[quarter][core] = course;
            return schedule;
        }
    }

    return false;
}

var SCHEDULES = {};

SCHEDULES[MAJORS.WEB_DESIGN] = function() {
    var schedule = [
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

    return schedule;
};

SCHEDULES[MAJORS.COEN] = function() {
    var schedule = [
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

    return schedule;
};
