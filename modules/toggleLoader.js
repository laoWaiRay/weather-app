const toggleLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader.style.display === '') {
    loader.style.display = 'none';
  } else {
    loader.style.display = '';
  }
}

export default toggleLoader