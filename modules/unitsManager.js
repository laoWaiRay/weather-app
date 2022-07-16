const unitsManager = (() => {
  let units = 'Celsius';

  const getUnits = () => units;

  const setUnits = (unitStr) => {
    units = unitStr;
  }

  return{
    getUnits,
    setUnits
  }
})()

export default unitsManager