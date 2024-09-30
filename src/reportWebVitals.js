const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
// This function reports web vitals metrics using the 'web-vitals' library
// It takes a callback function 'onPerfEntry' as an argument
// The function checks if 'onPerfEntry' is provided and is a valid function
// If so, it dynamically imports the 'web-vitals' library and calls its metric functions
// Each metric function (getCLS, getFID, getFCP, getLCP, getTTFB) is called with 'onPerfEntry'
// These functions measure different aspects of web performance:
// - CLS: Cumulative Layout Shift
// - FID: First Input Delay
// - FCP: First Contentful Paint
// - LCP: Largest Contentful Paint
// - TTFB: Time to First Byte
