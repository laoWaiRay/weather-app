const conversion = (() => {
  const KtoC = (degreesK) => {
    return parseInt((degreesK - 273.15));
  }
  
  const KtoF = (degreesK) => {
    return parseInt(((degreesK * 9 / 5) - 459.67));
  }

  return {
    KtoC,
    KtoF
  }
})();

export default conversion;
