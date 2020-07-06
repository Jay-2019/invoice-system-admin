const calculateFee = values => {
    let totalFee =
        values.examinationFormFee + values.backPaper + values.otherCharges;
    return totalFee;
};
export { calculateFee };