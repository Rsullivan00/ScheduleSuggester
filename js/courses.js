var CORE = "University Core";
var ENGR_BUTTON_TEXT = "<button id='engr1-btn' class='btn btn-block btn-info'>ENGR 1 here</button>";

var __next_objid=1;
function objectId(obj) {
    if (obj==null) 
        return null;
    if (obj.__obj_id==null) 
        obj.__obj_id=__next_objid++;
    return obj.__obj_id;
}

function Course(title, type) {
    this.title = title;
    this.type = type;
    this.id = objectId(this);
}

var TYPES = {
    core: "warning",
    mathScience: "info",
    engr: "success"
};

var COURSES = {
    math9:  new Course("MATH 9 - Precalculus", TYPES.mathScience),
    math11: new Course("MATH 11 - Calculus I", TYPES.mathScience),
    math12: new Course("MATH 12 - Calculus II", TYPES.mathScience),
    math13: new Course("MATH 13 - Calculus III", TYPES.mathScience),
    math14: new Course("MATH 14 - Calculus IV", TYPES.mathScience),
    amth106: new Course("AMTH 106 - Differential Equations", TYPES.mathScience),
    amth108: new Course("AMTH 108 - Probability and Statistics", TYPES.mathScience),
    math53: new Course("MATH 53 - Linear Algebra", TYPES.mathScience),

    coen10: new Course("COEN 10 - Intro. to Programming", TYPES.engr),
    coen11: new Course("COEN 11 - Advanced Programming", TYPES.engr),
    coen12: new Course("COEN 12 - Data Structures", TYPES.engr),
    coen19: new Course("COEN 19 - Discrete Math", TYPES.engr),
    coen21: new Course("COEN 21 - Logic Design", TYPES.engr),

    chem11: new Course("CHEM 11 - Chemistry I", TYPES.mathScience),

    phys31: new Course("PHYS 31 - Physics I", TYPES.mathScience),
    phys32: new Course("PHYS 32 - Physics II", TYPES.mathScience),

    engr1: new Course("ENGR 1 - Intro. to Engineering", TYPES.engr),

    ci: [ new Course("C&I 1 - Cultures & Ideas 1", TYPES.core),
           new Course("C&I 2 - Cultures & Ideas 2", TYPES.core)],

    ctw: [ new Course("CTW 1 - Critical Thinking & Writing I", TYPES.core),
           new Course("CTW 2 - Critical Thinking & Writing II", TYPES.core)],

    core: new Course("University Core", TYPES.core),

    engrButton: new Course(ENGR_BUTTON_TEXT, "") 
};


