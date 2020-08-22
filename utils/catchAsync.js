module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    /*  
      This is what I am used to using...
      Going to see if this other one above works 
    */
    // Promise.resolve(fn(req, res, next)).catch(next);
  };
};
