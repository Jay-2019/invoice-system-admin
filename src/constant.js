const arrayOfSecurityQuestions = [
    "What Is Your 1st Achievement",
    "What Is Your 2st Achievement",
    "What primary school did you attend",
    "In what town or city was your first full time job",
    "What was your dream job as a child",
    "What are the last five digits of your driver's license number",
    "In what town or city did you meet your spouse or partner",
    "What sports team do you love to see lose"

];

const arrayOfSubjectType = [
    "Theory",
    "Lab"
];

const arrayOfCaste = [
    "SC",
    "ST",
    "OBC",
    "UR"
];

const year = {
    firstYear: "First Year",
    secondYear: "Second Year",
    thirdYear: "Third Year",
    fourthYear: "Fourth Year",
};

const arrayOfYear = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year"];

const arrayOfBranch = [
    "B.Tech I.T.",
    "B.Tech F.T.",
    "B.Tech A.G.",
    "B.Tech CIVIL"
];

const arrayOfSemester = [
    "First Semester",
    "Second Semester",
    "Third Semester",
    "Fourth Semester",
    "Fifth Semester",
    "Sixth Semester",
    "Seventh Semester",
    "Eighth Semester"
];



const backFeeType = {
    examinationFormFee: "Examination Form Fee",
    backPaper: "Back Paper",
    delayFee: "Delay Fee",
    otherCharges: "Other Charges",
    totalFee: "Total Fee"
};

const courseFeeType = {
    studyTripFee: "Study Trip Fee",
    tuitionFee: "Tuition Free",
    laboratory: " Laboratory/computer Fee",
    delayFee: "Delay Fee",
    securityFee: "Security Fee",
    hostelFee: "Hostel Fee",
    otherCharges: "Other Charges",
    entranceFees: "Entrance Fees",
    centralLibraryFee: "Central Library Fee",
    studentSmartCardFee: "Student Smart Card Fee",
    sportsAndCulturalProgramFee: "Sports and Cultural Program Fee",
    studentWelfareFee: "Student Welfare Fee",
    developmentFee: "Development Fee",
    studentAcademicGuide: "Student Academic Guide",
    examinationFee: "Examination Fee",
    energyCharges: "Energy Charges",
    internetFee: "Internet Fee",
    totalFee: "Total Fee"

};

//  const courseFeeType = {
//     "Study Trip Fee": "अध्ययन यात्रा शुल्क ",
//     "Tuition Free": "शिक्षण शुल्क",
//     "Laboratory / computer fee": "प्रयोगशाला / कंप्यूटर शुल्क",
//     "Delay": "विलंब",
//     "Security Fee": "सुरक्षा शुल्क",
//     "Hostel Fee": "छात्रावास का शुल्क",
//     "Other Charges": "अन्य शुल्क",
//     "Entrance Fees": "प्रवेश शुल्क",
//     "Central Library Fee": "केंद्रीय पुस्तकालय शुल्क",
//     "Student Smart Card Fee": "छात्र स्मार्ट कार्ड शुल्क",
//     "Sports and Cultural Program Fee": "खेल और सांस्कृतिक कार्यक्रम शुल्क",
//     "Student Welfare Fee": "छात्र कल्याण शुल्क",
//     "Development Fee": "विकास शुल्क ",
//     "Student Academic Guide": "छात्र एकेडमिक गाइड",
//     "Examination Fee": "परीक्षा शुल्क",
//     "Energy Charges": "ऊर्जा शुल्क",
//     "Internet Fee": "इंटरनेट शुल्क"

// }

const adminAuthToken = localStorage.getItem("adminAuthToken");
//DB -> courseFeeDueDate(collection) -> documentID

const courseFeeDueDateDocumentId = {
    "SC": "5f382eb0ab87c722707adfe3",
    "ST": "5f382f68ab87c722707adfe4",
    "OBC": "5f382f6cab87c722707adfe5",
    "UR": "5f382f7aab87c722707adfe6"
};

//DB -> backFeeDueDate(collection) -> documentID
const backFeeDueDateDocumentId = "5ec3822919bba72e54e8651d";


export {
    adminAuthToken,
    courseFeeDueDateDocumentId,
    backFeeDueDateDocumentId,
    courseFeeType,
    backFeeType,
    arrayOfSemester,
    arrayOfBranch,
    arrayOfYear,
    year,
    arrayOfCaste,
    arrayOfSecurityQuestions,
    arrayOfSubjectType,
};