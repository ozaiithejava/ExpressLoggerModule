// fileLogger.js

const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logRequest = (format) => {
  return (req, res, next) => {
    const logData = {
      method: req.method,
      url: req.url,
      timestamp: moment().format(),
    };

    const logString = format === 'json'
      ? JSON.stringify(logData, null, 2)
      : format === 'xml'
        ? objectToXml(logData)
        : `${logData.timestamp} - ${logData.method} ${logData.url}`;

    const logFileName = `requestLog_${moment().format('YYYYMMDD')}.${format}`;
    const logFilePath = path.join(__dirname, 'logs', logFileName);

    fs.appendFile(logFilePath, logString + '\n', (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err.message}`);
      }
    });

    next();
  };
};

// Helper function to convert object to XML string
const objectToXml = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => `<${key}>${value}</${key}>`)
    .join('\n');
};

module.exports = logRequest;
