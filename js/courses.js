/*
 * File: courses.js
 * Author: Rick Sullivan
 * Date: 30 November 2014
 *
 * This file contains configuration for Course objects. Courses are used
 * to populate the suggested schedule and color-coordinate it.
 */

var CORE = "University Core";
var ENGR_BUTTON_TEXT = "<button id='engr1-btn' class='btn btn-block btn-info'>ENGR 1 here</button>";

function Course(title, type) {
    this.title = title;
    this.type = type;
    var titleWords = title.split(' ');
    /* Id is the course department followed by the course number. E.g. 'math11'*/
    this.id = titleWords[0].toLowerCase() + titleWords[1];
}

var TYPES = {
    core: "warning",
    mathScience: "info",
    major: "success"
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

    coen10: new Course("COEN 10 - Intro. to Programming", TYPES.major),
    coen11: new Course("COEN 11 - Advanced Programming", TYPES.major),
    coen12: new Course("COEN 12 - Data Structures", TYPES.major),
    coen19: new Course("COEN 19 - Discrete Math", TYPES.major),
    coen20: new Course("COEN 20 - Intro. to Embedded Systems", TYPES.major),
    coen21: new Course("COEN 21 - Intro. to Logic Design", TYPES.major),
    coen60: new Course("COEN 60 - Intro. to Web Technologies", TYPES.major),

    chem11: new Course("CHEM 11 - Chemistry I", TYPES.mathScience),

    phys31: new Course("PHYS 31 - Physics I", TYPES.mathScience),
    phys32: new Course("PHYS 32 - Physics II", TYPES.mathScience),

    engr1: new Course("ENGR 1 - Intro. to Engineering", TYPES.major),

    ci: [ new Course("C&I 1 - Cultures & Ideas 1", TYPES.core),
           new Course("C&I 2 - Cultures & Ideas 2", TYPES.core)],

    ctw: [ new Course("CTW 1 - Critical Thinking & Writing I", TYPES.core),
           new Course("CTW 2 - Critical Thinking & Writing II", TYPES.core)],

    core: new Course("University Core", TYPES.core),

    natsci: new Course("Natural Science", TYPES.mathScience),

    comm2: new Course("COMM 2 - Intro. to Media Studies", TYPES.major),
    comm12: new Course("COMM 12 - Technology and Communication", TYPES.major),
    comm30: new Course("COMM 30 - Intro. to Digital Filmmaking", TYPES.major),

    soci49: new Course("SOCI 49 - Computers, the Internet, and Society", TYPES.major),
    soci149: new Course("SOCI 149 - Business, Technology, and Society", TYPES.major),

    rtc1: new Course("RTC 1 - Religion, Theology & Culture I", TYPES.core),

    engrButton: new Course(ENGR_BUTTON_TEXT, "") 
};


