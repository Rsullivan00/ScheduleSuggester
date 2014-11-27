var QUARTERS = {
    fall: 0,
    winter: 1,
    spring: 2,
    all: [this.fall, this.winter, this.spring]
};

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
    if ($(selector).length) {
        if ($(selector).prop('type') == 'checkbox') { 
            if ($(selector).prop('checked')) {
                return skipCourse(course);
            } 
        } else  {
            /* Else it's a radio button */
            var radioSelector = 'input.credit:radio[name="' + $(selector).prop('name') + '"]:checked';
            if ($(radioSelector).val() >= $(selector).val()) 
                return skipCourse(course);
        }
    }

    if (equivCourseList) {
        /* Check equivalent checkboxes for replacement credit. */
        var equivCourses = equivCourseList.split(' ');
        for (var key in equivCourses) {
            var altSelector = '#' + equivCourses[key].toUpperCase();
             if ($(altSelector).prop('checked')) 
                return skipCourse(course);
        }
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

function insertCourse(schedule, course, quarters, prereq) {
    var prereqQuarter = -1;
    if (prereq) {
        for (var i = 0; i < 3; i++) {
            if ($.inArray(prereq, schedule[i]) != -1) {
                prereqQuarter = i;
                break;
            }
        }
    }
                
    for (var i = 0; i < quarters.length; i++) {
        var quarter = quarters[i];
        if (quarter <= prereqQuarter)
            continue;
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
            getCourse('natsci', 'chem11 envs21 chem12'), 
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

    insertENGR1(schedule);
    insertCourse(schedule, COURSES.coen60, [QUARTERS.fall]);

    insertCourse(schedule, COURSES.comm2, QUARTERS.all);
    insertCourse(schedule, COURSES.comm12, QUARTERS.all);
    insertCourse(schedule, COURSES.comm30, QUARTERS.all);
    insertCourse(schedule, COURSES.soci49, QUARTERS.all);

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

    insertCandI(schedule);
    insertENGR1(schedule);

    insertCourse(schedule, COURSES.coen20, [QUARTERS.spring], COURSES.coen12);

    return schedule;
};

/* Uses the COURSES and credits objects to return a matrix of Course objects. */
var getSchedule = function() { 
    /* Reset skipped courses. */
    $('#courses-skipped').html('');

    var schedule = SCHEDULES[major]();

    return schedule;
};


