/* Handlers for changing equivalent credit switches */
var EQUIVALENT = {
    math53: function(checked) {
        credits.math53 = checked;
    },
   coen20: function(checked) {
        credits.coen20 = checked;
    },
    elen50: function(checked) {
        credits.elen50 = checked;
    },
    coen19: function(checked) {
        credits.coen19 = checked;
    },
    amth106: function(checked) {
        credits.amth106 = checked;
    },
    chem11: function(checked) {
        credits.chem11 = checked || ($('#chem').val() >= THRESHOLDS.chem[0]);
    },
    chem12: function(checked) {
        credits.chem12 = checked || ($('#chem').val() >= THRESHOLDS.chem[1]);
    },
    phys31: function(checked) {
        credits.phys31 = checked || ($('#physM').val() >= THRESHOLDS.physM);
    },
    phys32: function(checked) {
        credits.phys32 = checked;
    },
    envs21: function(checked) {
        credits.envs21 = checked || ($('#envs').val() >= THRESHOLDS.envs);
    }
};

var bindEquivalentCredit = function() {
    /* Equivalent credit checkboxes */
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
        if (calcAB < THRESHOLDS.calcAB && calcBC < THRESHOLDS.calcBC[0])
            credits.math11 = false;
        if (calcBC < THRESHOLDS.calcBC[1])
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

        if (csci < THRESHOLDS.csci[0] && !$('#progExperience').prop('checked'))
            credits.coen10 = false;
        if (csci < THRESHOLDS.csci[1])
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

};
