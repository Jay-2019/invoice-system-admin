// //DB -> courseFeeDueDate(collection) -> documentID
// map Year With CourseFeeType(collection) DocumentId
const mapYearWithId = year => {
    let id;
    switch (year) {
        case "First Year":
            id = "5ec13f8678ea5a2e0c1a6bfe";
            break;
        case "Second Year":
            id = "5ec13ffc78ea5a2e0c1a6bff";
            break;
        case "Third Year":
            id = "5ec1401078ea5a2e0c1a6c00";
            break;
        case "Fourth Year":
            id = "5ec1402178ea5a2e0c1a6c01";
            break;
        default:
            return null;
    }
    return id;
};

const calculateFee = values => {
    let totalFee =
        values.studyTripFee +
        values.tuitionFee +
        values.laboratory +
        values.securityFee +
        values.hostelFee +
        values.otherCharges +
        values.entranceFees +
        values.centralLibraryFee +
        values.studentSmartCardFee +
        values.sportsAndCulturalProgramFee +
        values.studentWelfareFee +
        values.developmentFee +
        values.studentAcademicGuide +
        values.examinationFee +
        values.energyCharges +
        values.internetFee;
    return totalFee;
};


export { mapYearWithId, calculateFee };


