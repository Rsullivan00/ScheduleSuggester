/*
 * File: update-ui.js
 * Author: Rick Sullivan
 * Date: 30 November 2014
 *
 * Handles updating of input elements, namely checkboxes and radio buttons.
 *
 * Inputs work on a hierarchy; certain inputs will override other inputs.
 *
 * From highest control to lowest:
 * Calculus readiness -> AP Tests -> Equivalent Credit -> Programming Experience
 */

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
    var checkedVal = $(radioSelector + ":checked").val();
    if (credit) {
        if (val < checkedVal)
            return;
        /* Adding credit. */
        $(selector).prop('checked', true);
        /* Iterate through previous values and disable them. */
        $(radioSelector).each(function(index, element) {
            if (element.value < $(selector).val()) {
                //element.checked = false;
                element.disabled = true;
            } else {
                element.disabled = false;
            }
        });
    } else {
        if (val > checkedVal)
            return;

        /* Removing credit. */
        val = val - 1;
        $(radioSelector).each(function(index, element) {
            if (element.value >= val) {
                element.disabled = false;
                element.checked = false;
            } else {
                element.disabled = true;
            }
        });

        if (val <= -1) {
            $(radioSelector).prop('disabled', true);
            $(radioSelector).prop('checked', false);
        }
        $(radioSelector).val([val]);
    }
};


