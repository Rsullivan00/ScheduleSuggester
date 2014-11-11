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
    var val = $(selector).val();
    if (credit) {
        if (val < $(radioSelector + ":checked").val())
            return;
        /* Adding credit. */
        $(selector).prop('checked', true);
        /* Iterate through previous values and disable them. */
        $(radioSelector).each(function(index, element) {
            if (element.value < $(selector).val()) {
                element.checked = false;
                element.disabled = true;
            }
        });
    } else {
        if (val > $(radioSelector + ":checked").val())
            return;
        /* Removing credit. */
        val = val - 1;
        $(radioSelector).each(function(index, element) {
            if (element.value >= val) {
                element.disabled = false;
                element.checked = false;
            }
        });

        if (val <= -1) {
            $(radioSelector).prop('disabled', true);
            $(radioSelector).prop('checked', false);
        }
        $(radioSelector).val([val]);
    }
};

var TESTS = {
    calcAB: function(score) { 
        if (score > THRESHOLDS.calcAB) {
            updateRadio('math11', true);
        } else {
            if ($('#calcBC').val() < THRESHOLDS.calcBC[0])
                updateRadio('math11', false);
        }
    },
    calcBC: function(score) { 
        if (score >= THRESHOLDS.calcBC[0] && score < THRESHOLDS.calcBC[1]) {
            updateRadio('math11', true);
            updateRadio('math12', false);
        } else if (score >= THRESHOLDS.calcBC[1]) {
            updateRadio('math11 math12', true);
        } else {
            if ($('#calcAB').val() >= THRESHOLDS.calcAB)
                updateRadio('math12', false);
            else 
                updateRadio('math11 math12', false);
        }
    },
    csci:   function(score) { 
        var experience = $('#progExperience').prop('checked');
        if (score >= THRESHOLDS.csci[0] && score < THRESHOLDS.csci[1]) {
            updateRadio('coen10', true);
            updateRadio('coen11', false);
        } else if (score >= THRESHOLDS.csci[1]) {
            updateRadio('coen10 coen11', true);
        } else {
            updateRadio('coen11', false);
            if (!experience)
                updateRadio('coen10', false);
        } 
    },
    chem:   function(score) { 
        if (score >= THRESHOLDS.chem[0] && score < THRESHOLDS.chem[1]) {
            updateCheckbox('chem11', true);
            updateCheckbox('chem12', false);
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


