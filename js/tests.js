/* Contains the constant score thresholds for AP credit. */
var THRESHOLDS = {
    calcAB: 3,
    calcBC: [3, 4],
    csci: [3, 4],
    chem: [3, 4],
    envs: 3,
    physM: [3, 4]
};

/* Takes a space-delimited list of courses to assign credit to. */
var updateCheckbox = function(courseNames, credit) {
    var courses = courseNames.split(' ');
    $.each(courses, function(index, course) {
        var selector = '#' + course.toUpperCase();
        var disabled = $(selector).prop('disabled');
        var checked = $(selector).prop('disabled');

        /* Don't undo credit that the user has checked manually. */
        if (checked && !disabled && !credit)
            return;

        credits[course] = credit;

        $(selector).prop('checked', credit);
        $(selector).prop('disabled', credit);
    });
};

/* Takes a space-delimited list of courses to assign credit to. */
var updateRadio = function(courseNames, credit) {
    var courses = courseNames.split(' ');
    /* Sort in ascending order for course sequences. */
    courses.sort();
    /* If adding credit, we want to access the most advanced course, so reverse the array. */
    if (credit)
        courses.reverse();

    var course = courses[0];
    var selector = '#' + course.toUpperCase();
    var radioSelector = 'input.credit:radio[name="' + course.substring(0, 4) + '"]';
    if (credit) {
        /* Adding credit. */
        $(selector).prop('checked', true);
        /* Iterate through previous values and disable them. */
    } else {
        /* Removing credit. */
        val = $(selector).val() - 1;
        if (val >= 0) {
            $(radioSelector).val(val);
        }
    }
};

var TESTS = {
    calcAB: function(score) { 
        if (score > THRESHOLDS.calcAB) {
            updateRadio('math11', true);
        } else {
            if ($('#calcBC').val() < THRESHOLDS.calcAB)
                updateRadio('math11', false);
        }
    },
    calcBC: function(score) { 
        var mathCredit = $('input[name="math"]:checked').val();
        if (score >= THRESHOLDS.calcBC[0] && score < THRESHOLDS.calcBC[1]) {
            updateRadio('math11', true);
            if (mathCredit < 2)
                updateRadio('math12', false);
        } else if (score >= THRESHOLDS.calcBC[1]) {
            updateRadio('math11 math12', true);
        } else {
            if ($('#calcAB').val() < THRESHOLDS.calcAB && mathCredit < 1)
                updateRadio('math11', false);
            else if (mathCredit < 2)
                updateRadio('math12', false);
        }
    },
    csci:   function(score) { 
        var coen = $('input.credit:radio[name="coen"]:checked').val();
        var experience = $('#progExperience').prop('checked');
        if (score >= THRESHOLDS.csci[0] && score < THRESHOLDS.csci[1]) {
            updateRadio('coen10', true);
            if (coen < 2)
                updateRadio('coen11', false);
        } else if (score >= THRESHOLDS.csci[1]) {
            updateRadio('coen10 coen11', true);
        } else {
            if (coen < 1 && !$('#progExperience').prop('checked'))
                updateRadio('coen10', false);
            if (coen < 2) /* COEN == 2 corresponds to credit for COEN11 */
                updateRadio('coen11', false);
        } 
    },
    chem:   function(score) { 
        if (score >= THRESHOLDS.chem[0] && score < THRESHOLDS.chem[1]) {
            updateCheckbox('chem11', true);
        } else if (score >= THRESHOLDS.chem[1]) {
            updateCheckbox('chem11 chem12', true);
        } else {
            updateCheckbox('chem11 chem12', false);
        }
    },
    envs:   function(score) { 
        if (score > THRESHOLDS.envs) {
            updateCheckbox('envs21', true);
        } else {
            updateCheckbox('envs21', false);
        }
    },
    physM:  function(score) { 
        if (score > THRESHOLDS.physM) {
            updateCheckbox('phys31', true);
        } else {
            updateCheckbox('phys31', false);
        }
    }
};

var selectChange = function(select) {
   var val = $(select).val();
    /* N/A selected corresponds to a score of 0 */
    if (val === "N/A") 
        val = 0;
    TESTS[$(select).attr('id')](val);
    drawSchedule();
};

/* Bind select elements to updating functions defined in TESTS*/
var bindSelects = function() {
    $.each(TESTS, function(k) {
        $('#' + k).on('change', function () {selectChange($(this));});    
    });
};


