/**
 * Google Apps Script for Form Submissions
 * Handles: Welcome Popup, Contact Form, and Proven Results
 */

// Configuration
const SHEET_NAME = 'Form Submissions';
const PROVEN_RESULTS_SHEET = 'Proven Results';

/**
 * Main POST handler - processes form submissions
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    if (formType === 'Proven Results') {
      return handleProvenResults(sheet, data);
    } else if (formType === 'Welcome Popup') {
      return handleWelcomePopup(sheet, data);
    } else if (formType === 'Contact Form') {
      return handleContactForm(sheet, data);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Unknown form type' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET handler - retrieves proven results data
 */
function doGet(e) {
  try {
    const params = e.parameter;
    
    if (params.type === 'provenResults') {
      return getProvenResults(params.id);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'active', message: 'Apps Script is running' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle Welcome Popup submissions
 */
function handleWelcomePopup(sheet, data) {
  let formSheet = sheet.getSheetByName(SHEET_NAME);
  
  if (!formSheet) {
    formSheet = sheet.insertSheet(SHEET_NAME);
  }
  
  if (formSheet.getLastRow() === 0) {
    formSheet.appendRow(['Timestamp', 'Form Type', 'Full Name', 'Email', 'Phone', 'City', 'Company']);
  }
  
  formSheet.appendRow([
    new Date(),
    'Welcome Popup',
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.city || '',
    data.company || ''
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success', message: 'Welcome popup data saved' })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle Contact Form submissions
 */
function handleContactForm(sheet, data) {
  let formSheet = sheet.getSheetByName(SHEET_NAME);
  
  if (!formSheet) {
    formSheet = sheet.insertSheet(SHEET_NAME);
  }
  
  if (formSheet.getLastRow() === 0) {
    formSheet.appendRow(['Timestamp', 'Form Type', 'Name', 'Email', 'Phone', 'Subject', 'Message']);
  }
  
  formSheet.appendRow([
    new Date(),
    'Contact Form',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.subject || '',
    data.message || ''
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success', message: 'Contact form data saved' })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle Proven Results submissions from admin
 */
function handleProvenResults(sheet, data) {
  let resultsSheet = sheet.getSheetByName(PROVEN_RESULTS_SHEET);
  
  if (!resultsSheet) {
    resultsSheet = sheet.insertSheet(PROVEN_RESULTS_SHEET);
  }
  
  if (resultsSheet.getLastRow() === 0) {
    resultsSheet.appendRow([
      'ID',
      'Timestamp',
      'Heading',
      'Subheading',
      'Card Title 1',
      'Value 1',
      'Card Title 2',
      'Value 2',
      'Card Title 3',
      'Value 3',
      'Content (JSON)'
    ]);
  }
  
  // Generate unique ID
  const id = resultsSheet.getLastRow().toString();
  
  // Parse and validate content JSON
  let contentJson = '';
  try {
    if (data.content) {
      const parsed = JSON.parse(data.content);
      contentJson = JSON.stringify(parsed);
    }
  } catch (e) {
    Logger.log('Error parsing content JSON: ' + e.toString());
    contentJson = data.content || '';
  }

  resultsSheet.appendRow([
    id,
    new Date(),
    data.heading || '',
    data.subheading || '',
    data.cardTitle1 || '',
    data.value1 || '',
    data.cardTitle2 || '',
    data.value2 || '',
    data.cardTitle3 || '',
    data.value3 || '',
    contentJson
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success', message: 'Proven result saved', id: id })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get proven results (all or by ID)
 */
function getProvenResults(id) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const resultsSheet = sheet.getSheetByName(PROVEN_RESULTS_SHEET);
    
    if (!resultsSheet || resultsSheet.getLastRow() <= 1) {
      return ContentService.createTextOutput(
        JSON.stringify({ results: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = resultsSheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    const results = rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.toLowerCase().replace(/ /g, '')] = row[index];
      });
      return obj;
    });
    
    if (id) {
      const result = results.find(r => r.id === id);
      return ContentService.createTextOutput(
        JSON.stringify({ result: result || null })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ results: results })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in getProvenResults: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this to test the script
 */
function testSubmissions() {
  // Test Welcome Popup
  const welcomeTest = {
    postData: {
      contents: JSON.stringify({
        formType: 'Welcome Popup',
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        city: 'Mumbai',
        company: 'Test Company'
      })
    }
  };
  
  // Test Contact Form
  const contactTest = {
    postData: {
      contents: JSON.stringify({
        formType: 'Contact Form',
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        subject: 'Test Subject',
        message: 'Test message content'
      })
    }
  };
  
  // Test Proven Results
  const provenResultTest = {
    postData: {
      contents: JSON.stringify({
        formType: 'Proven Results',
        heading: 'Test Case',
        subheading: 'Test description',
        cardTitle1: 'Recovered',
        value1: '₹10Cr',
        cardTitle2: 'Duration',
        value2: '6 Months',
        cardTitle3: 'Success',
        value3: '100%',
        content: JSON.stringify({
          sections: [
            { heading: 'Overview', content: 'Test overview content' },
            { heading: 'Outcome', content: 'Test outcome content' }
          ]
        })
      })
    }
  };
  
  Logger.log('Welcome Popup Test: ' + doPost(welcomeTest).getContent());
  Logger.log('Contact Form Test: ' + doPost(contactTest).getContent());
  Logger.log('Proven Results Test: ' + doPost(provenResultTest).getContent());
}
