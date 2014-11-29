/* Global flag to track which quarter to put ENGR 1. */
var isEngr1Fall = true;

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

    /* Hide programming experience warning. */
    $('#coen10Warning').prop('hidden', true);

    isEngr1Fall = true;

    drawSchedule();
};

/* Called as soon as the sources have loaded and the DOM is ready. 
 * Initializes logic and UI components.
 */
$(document).ready(function() {
    /* Enable custom switch */
    $("[name='major-switch']").bootstrapSwitch();
    $("[name='major-switch']").on('switchChange.bootstrapSwitch', function(e) {
        if (major == MAJORS.COEN) {
            major = MAJORS.WEB_DESIGN;
        } else {
            major = MAJORS.COEN;
        }
        $('#major-title').html(major);
        var selector = major.toLowerCase().replace(' ', '-');

        $('.ap-test').parent().parent().prop('hidden', true);
        $('.ap-test.' + selector).parent().parent().prop('hidden', false);

        $('.credit').parent().prop('hidden', true);
        $('.credit.' + selector).parent().prop('hidden', false);

        reset();
    });

    /* Reset major. */
    $('input[name="major-switch"]').bootstrapSwitch('state', false, false);

    major = MAJORS.COEN;

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

    /* Focus accordion element when it is expanded. Useful for smaller devices. */
    $('#accordion').on('shown.bs.collapse', function (e) {
        $('html, body').animate({
            scrollTop: $(e.target.parentElement).offset().top
        }, 1000);
    })


    reset();
});
