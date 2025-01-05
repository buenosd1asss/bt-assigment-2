import { onCLS, onFCP, onFID, onLCP } from 'web-vitals';

// Function to log the metrics
const reportWebVitals = (metric) => {
  console.log(metric);
};

// Use the web-vitals functions to track metrics
onCLS(reportWebVitals); // Cumulative Layout Shift
onFCP(reportWebVitals); // First Contentful Paint
onFID(reportWebVitals); // First Input Delay
onLCP(reportWebVitals); // Largest Contentful Paint

export default reportWebVitals;
