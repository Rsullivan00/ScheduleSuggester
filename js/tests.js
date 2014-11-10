/* Contains the constant score thresholds for AP credit. */
var THRESHOLDS = {
    calcAB: 3,
    calcBC: [3, 4],
    csci: [3, 4],
    chem: [3, 4],
    envs: 3,
    physM: [3, 4]
};

var TESTS = {
    calcAB: function(score) { 
        if (score > THRESHOLDS.calcAB) {
            credits.math11 = true;
        } else {
            if ($('#calcBC').val() < THRESHOLDS.calcAB && $('input[name="math"]:checked').val() < 1)
                credits.math11 = false;
        }
    },
    calcBC: function(score) { 
        var mathCredit = $('input[name="math"]:checked').val();
        if (score >= THRESHOLDS.calcBC[0] && score < THRESHOLDS.calcBC[1]) {
            credits.math11 = true; 
            if (mathCredit < 2)
                credits.math12 = false; 
        } else if (score >= THRESHOLDS.calcBC[1]) {
            credits.math11 = true; 
            credits.math12 = true; 
        } else {
            if ($('#calcAB').val() < THRESHOLDS.calcAB && mathCredit < 1)
                credits.math11 = false;
            else if (mathCredit < 2)
                credits.math12 = false;
        }
    },
    csci:   function(score) { 
        var coen = $('input.credit:radio[name="coen"]:checked').val();
        var experience = $('#progExperience').prop('checked');
        if (score >= THRESHOLDS.csci[0] && score < THRESHOLDS.csci[1]) {
            credits.coen10 = true;
            if (coen < 2)
                credits.coen11 = false;
        } else if (score >= THRESHOLDS.csci[1]) {
            credits.coen10 = true;
            credits.coen11 = true; 
        } else {
            if (coen < 1 && !$('#progExperience').prop('checked'))
                credits.coen10 = false;
            if (coen < 2) /* COEN == 2 corresponds to credit for COEN11 */
                credits.coen11 = false; 
        } 
    },
    chem:   function(score) { 
        if (score >= THRESHOLDS.chem[0] && score < THRESHOLDS.chem[1]) {
            credits.chem11 = true;
        } else if (score >= THRESHOLDS.chem[1]) {
            credits.chem11 = true; 
            credits.amth106 = true;
        } else {
            if (!($('#envs').val() > THRESHOLDS.envs))
                credits.chem11 = $('#CHEM11').prop('checked') || $('#ENVS21').prop('checked');
        }
    },
    envs:   function(score) { 
        if (score > THRESHOLDS.envs) {
            if (!credits.chem11)
                credits.chem11 = true; 
            else
                credits.amth106 = true;
        } else {
            if (credits.chem11 && credits.amth106) {
                if ($('#AMTH106').prop('checked'))
                    credits.chem11 = false
                else
                    credits.amth106 = false;
            }

        }
    },
    physM:  function(score) { 
        if (score > THRESHOLDS.physM) {
            credits.phys31 = true; 
        } else {
            if (!$('#PHYS31').prop('checked'))
                credits.phys31 = false; 
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


