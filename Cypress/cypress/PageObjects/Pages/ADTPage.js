export default class ADTPage {

    constructor() {
        this.ADT = {
            ADTLink: '',
            searchBar: "",
            admittedPatientsTab: '',
            moreOptionsButton: '',
            changeDoctorOption: '',
            changeDoctorModal: '',
            updateButton: '',
            fieldErrorMessage: '',
            counterItem: "",
        };
    }

    /**
     * @Test7
     * @description This test verifies that the error message "Select doctor from the list." is displayed 
     *              when the user attempts to update the doctor without selecting a value.
     * @expected The error message "Select doctor from the list." is shown near the field.
     */
    verifyFieldLevelErrorMessage() {
        // Write your logic here
    }
}