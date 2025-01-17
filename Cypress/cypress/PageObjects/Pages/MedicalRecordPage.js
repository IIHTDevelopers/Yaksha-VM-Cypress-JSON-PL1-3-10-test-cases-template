export default class MedicalRecordsPage {

  constructor() {
    this.medicalRecord = {
      medicalRecordsLink: '',
      mrOutpatientList: '',
      okButton: '',
      searchBar: "",
      fromDate: ``,
      doctorFilter: '',
    };
  }

  /**
   * @Test4
   * @description This method verifies patient records in the Dispensary module by applying a date filter
   * and searching for a specific patient by gender. It validates the search results by checking if the
   * gender appears in the filtered records.
   */
  keywordMatching() {
    // Write your logic here
  }

  /**
   * @Test5
   * @description This method verifies the presence of the doctor filter functionality in the medical records module.
   * It applies the filter by selecting a specific doctor and a date range, and validates that the search results
   * correctly display records associated with the selected doctor.
   */
  presenceOfDoctorFilter() {
    // Write your logic here
  }
}
