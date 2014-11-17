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
            updateRadio('chem11', true);
            updateRadio('chem12', false);
        } else if (score >= THRESHOLDS.chem[1]) {
            updateRadio('chem11 chem12', true);
        } else {
            updateRadio('chem11 chem12', false);
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


