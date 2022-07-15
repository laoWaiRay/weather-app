const currentPage = (() => {

  let page = 'main';

  const getPage = () => {
    return page;
  }

  const setPage = (pageStr) => {
    page = pageStr;
  }

  return {
    getPage,
    setPage
  }
})()

export default currentPage
