import React from "react";
import { Card } from "flowbite-react";

const CertificateGenerator = () => {
  const certificateData = {
    recipientName: "Rushabh Bhalgat",
    courseName: "CNC Programming",
    completionDate: "December 12, 2024",
    certificateId: "CERT-2024-001",
    verificationHash: "a1b2c3d4-e5f6-g7h8-i9j0",
    issuerName: "HireMe",
    issuerSignature: "Deepti Uppal",
    issuerTitle: "Mission Director",
  };

  const verificationUrl = `https://your-domain.com/verify/${certificateData.verificationHash}`;

  const generateQRCodeSVG = () => {
    return `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <rect x="10" y="10" width="80" height="80" fill="none" stroke="black" />
        <text x="50" y="50" text-anchor="middle" font-size="8">Scan to Verify</text>
        <text x="50" y="60" text-anchor="middle" font-size="6">${certificateData.verificationHash}</text>
      </svg>
    `;
  };

  const generatePDF = () => {
    const certificateContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              text-align: center;
              background-color: #f8f9fa;
            }
            .certificate {
              background-color: white;
              border: 20px solid #0066cc;
              padding: 40px;
              margin: 20px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              position: relative;
            }
            .title {
              font-size: 36px;
              color: #0066cc;
              margin-bottom: 20px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .content {
              font-size: 24px;
              line-height: 1.8;
              color: #333;
            }
            .signature-section {
              margin-top: 60px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              padding: 0 40px;
            }
            .signature {
              border-top: 2px solid #000;
              padding: 10px 40px;
              text-align: center;
            }
            .signature-name {
              font-weight: bold;
              margin-top: 5px;
            }
            .signature-title {
              font-size: 14px;
              color: #666;
            }
            .verification {
              position: absolute;
              bottom: 20px;
              right: 20px;
              text-align: right;
              font-size: 12px;
              color: #666;
            }
            .certificate-id {
              font-size: 14px;
              color: #666;
              position: absolute;
              top: 20px;
              right: 20px;
            }
            .qr-code {
              position: absolute;
              bottom: 20px;
              right: 20px;
              width: 100px;
              height: 100px;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 60px;
              opacity: 0.03;
              pointer-events: none;
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="watermark">${certificateData.issuerName}</div>
            <div class="certificate-id">ID: ${
              certificateData.certificateId
            }</div>
            <div class="title">Certificate of Achievement</div>
            <div class="content">
              This is to certify that<br/>
              <strong>${certificateData.recipientName}</strong><br/>
              has successfully completed<br/>
              <strong>${certificateData.courseName}</strong><br/>
              on ${certificateData.completionDate}
            </div>
            <div class="signature-section">
              <div class="signature">
                <div class="signature-name">${
                  certificateData.issuerSignature
                }</div>
                <div class="signature-title">${
                  certificateData.issuerTitle
                }</div>
              </div>
            </div>
            <div class="qr-code">
              ${generateQRCodeSVG()}
            </div>
            <div class="verification">
              Verify at: ${verificationUrl}<br/>
              Hash: ${certificateData.verificationHash}
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(certificateContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">Get verifiable Certificate</h2>
          <p className="text-sm text-gray-600">
            Get a verifiable certificate for {certificateData.recipientName}
          </p>
          <p className="text-xs text-gray-500">
            Certificate ID: {certificateData.certificateId}
          </p>
        </div>
        <button
          onClick={generatePDF}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Generate Verified Certificate
        </button>
      </div>
    </Card>
  );
};

export default CertificateGenerator;
