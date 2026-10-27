/**
 * Google Apps Script for Lexian & Jurian Form Data Collection
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create a new blank spreadsheet
 *    - Name it "Lexian & Jurian - Form Submissions"
 * 
 * 2. Set up the script:
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any existing code
 *    - Paste this entire script
 *    - Save the project (File > Save or Ctrl+S)
 *    - Name it "Form Data Handler"
 * 
 * 3. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click the gear icon next to "Select type" and choose "Web app"
 *    - Fill in the details:
 *      - Description: "Form submission handler"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL - you'll need this in your website code
 * 
 * 4. Authorize the script:
 *    - Click "Authorize access"
 *    - Choose your Google account
 *    - Click "Advanced" > "Go to [Project name] (unsafe)"
 *    - Click "Allow"
 * 
 * 5. Update your website:
 *    - Replace the form submission URLs in your code with the Web App URL
 *    - The URL should look like: https://script.google.com/macros/s/[SCRIPT_ID]/exec
 * 
 * IMPORTANT NOTES:
 * - Keep the Web App URL confidential
 * - The sheet will automatically create headers on first submission
 * - Two forms are collected: Welcome Popup and Contact Form
 * - Data is appended chronologically with timestamps
 */

/**
 * Handles POST requests from form submissions
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Form Type',
        'Full Name',
        'Email',
        'Phone',
        'City',
        'Company',
        'Dispute Type',
        'Case Details'
      ];
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#001d51');
      headerRange.setFontColor('#ffffff');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    // Prepare row data with all possible fields
    // Welcome Popup fields: fullName, email, phone, city, company
    // Contact Form fields: fullName, phone, email, city, company, disputeType, caseDetails
    const rowData = [
      timestamp,
      data.formType || 'Contact Form',
      data.fullName || data.name || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.company || '',
      data.disputeType || '',
      data.caseDetails || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Form data submitted successfully',
      'timestamp': timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'active',
    'message': 'Lexian & Jurian Form Handler is running',
    'version': '1.0'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 * Run this from the Apps Script editor to test
 */
function testSubmission() {
  // Test Welcome Popup data
  const testWelcomePopup = {
    postData: {
      contents: JSON.stringify({
        formType: 'Welcome Popup',
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 12345 67890',
        city: 'Mumbai',
        company: 'Test Company'
      })
    }
  };
  
  // Test Contact Form data
  const testContactForm = {
    postData: {
      contents: JSON.stringify({
        formType: 'Contact Form',
        fullName: 'John Doe',
        phone: '+91 98765 43210',
        email: 'john@example.com',
        city: 'Mumbai',
        company: 'ABC Corp',
        disputeType: 'Contract Breach',
        caseDetails: 'Sample case details here...'
      })
    }
  };
  
  Logger.log('Testing Welcome Popup:');
  Logger.log(doPost(testWelcomePopup).getContent());
  
  Logger.log('Testing Contact Form:');
  Logger.log(doPost(testContactForm).getContent());
}
