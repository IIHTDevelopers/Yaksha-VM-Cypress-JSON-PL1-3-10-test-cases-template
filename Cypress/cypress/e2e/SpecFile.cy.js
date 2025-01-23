// Import the page object for interacting with elements
import LoginPage from "../PageObjects/Pages/LoginPage";
import SettingsPage from "../PageObjects/Pages/SettingsPage";
import DoctorPage from "../PageObjects/Pages/DoctorPage";
import SubstorePage from "../PageObjects/Pages/SubstorePage";
import PharmacyPage from "../PageObjects/Pages/PharmacyPage";
import RadiologyPage from "../PageObjects/Pages/RadiologyPage";
import MedicalRecordsPage from "../PageObjects/Pages/MedicalRecordPage";
import MaternityPage from "../PageObjects/Pages/MaternityPage";
import ADTPage from "../PageObjects/Pages/ADTPage";

describe("Automation Suite for Yaksha Application", () => {
  // Create instance of the classes
  const loginPage = new LoginPage();
  const doctorsPage = new DoctorPage();
  const settingsPage = new SettingsPage();
  const substorePage = new SubstorePage();
  const pharmacyPage = new PharmacyPage();
  const radiologyPage = new RadiologyPage();
  const medicalRecordsPage = new MedicalRecordsPage();
  const maternityPage = new MaternityPage();
  const adtPage = new ADTPage();

  // Set an acceptable load time in milliseconds
  const acceptableLoadTime = 1000;

  // Run before each test
  beforeEach(() => {
    cy.launchBrowser(); // Launch the browser
    cy.navigatingToBaseURL(); // Hit base URL

    // Login before each test
    loginPage.performLogin();
    cy.wait(3000);

    // Verify login was successful
    verifyUserIsLoggedin();
  });

  // Individual test cases
  it("TS-1 Handle Alert on Pharmacy Module", () => {
    pharmacyPage.handlingAlertOnRadiology();
    verifyUserIsOnCorrectURL("/Pharmacy/Order/GoodsReceiptList");
  });

  it("TS-2 Verify to get the validation message when Click on print receipt without filling any details", () => {
    pharmacyPage.verifyPrintReceipt();
    verifyUserIsOnCorrectURL("/Pharmacy/Order/GoodsReceiptList");
  });

  it("TS-3 Verify to data range by select Last 3 months option from drop down", () => {
    radiologyPage.verifyDataWithinLastThreeMonths();
    verifyUserIsOnCorrectURL("/Radiology/ImagingRequisitionList");
  });

  it("TS-4 Verify that entering a keyword matches existing records", () => {
    medicalRecordsPage.keywordMatching();
    verifyUserIsOnCorrectURL("/Medical-records/OutpatientList");
  });

  it("TS-5 Login with invalid credentials", () => {
    loginPage.performLoginWithInvalidCredentials();
    verifyUserIsNotLoggedin();
  });

  it("TS-6 Capture screenshot of Inventory Requisition section", async () => {
    substorePage.captureInventoryRequisitionScreenshot();
  });

  it("TS-7 Verify field-level error message appears when updating doctor without selection", async () => {
    adtPage.verifyFieldLevelErrorMessage();
    verifyErrorMessage();
  });

  it("TS-8 Verify Maternity Allowance Report is visible", () => {
    maternityPage.verifyMaternityAllowanceReport();
    verifyUserIsOnCorrectURL("/Maternity/Reports/MaternityAllowance");
  });

  it("TS-9 Verify Imaging and lab order add successfully", () => {
    doctorsPage.performInpatientImagingOrder();
    verifyActiveOrderIsPresent();
  });

  it("TS-10 Verify to filter the records by select X-RAY from Filter drop down", () => {
    radiologyPage.filterListRequestsByDateAndType();
    verifyUserIsOnCorrectURL("/Radiology/ImagingRequisitionList");
  });
});

/**
 * ------------------------------------------------------Helper Methods----------------------------------------------------
 */

function verifyUserIsLoggedin() {
  // Verify successful login by checking if 'admin' element is visible
  cy.xpath('//li[@class="dropdown dropdown-user"]', { timeout: 20000 })
    .should("be.visible")
    .then(() => {
      cy.log("User is successfully logged in.");
    });
}

function verifyUserIsOnCorrectURL(expectedURL) {
  cy.url().should("contain", expectedURL);
}

function verifyActiveOrderIsPresent() {
  cy.contains("span", "Active Orders").should("be.visible");
}

function verifyUserIsNotLoggedin() {
  cy.xpath('//div[contains(text(),"Invalid credentials !")]').should(
    "be.visible"
  );
}

function verifyErrorMessage() {
  cy.xpath('//span[text()="Select doctor from the list."]').should("be.visible");
}