// convert-trivy-report.js
const fs = require('fs');
const path = require('path');

const inputFilePath = path.resolve(__dirname, 'trivy-results.json');
const outputFilePath = path.resolve(__dirname, 'trivy-report.html');

const trivyJson = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

if (!trivyJson.Results || !Array.isArray(trivyJson.Results) || trivyJson.Results.length === 0) {
  console.error('No results found in Trivy JSON report.');
  process.exit(1);
}

const vulnerabilities = trivyJson.Results[0].Vulnerabilities || [];

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Trivy Report</title>
  <style>
    body { font-family: Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Trivy Report</h1>
  <table>
    <tr>
      <th>Vulnerability ID</th>
      <th>Package</th>
      <th>Severity</th>
      <th>Description</th>
    </tr>
    ${vulnerabilities.map(vuln => `
      <tr>
        <td>${vuln.VulnerabilityID}</td>
        <td>${vuln.PkgName}</td>
        <td>${vuln.Severity}</td>
        <td>${vuln.Description}</td>
      </tr>
    `).join('')}
  </table>
</body>
</html>
`;

fs.writeFileSync(outputFilePath, htmlContent, 'utf-8');
console.log('Trivy report converted to HTML successfully.');
