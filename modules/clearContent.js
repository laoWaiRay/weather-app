const clearContent = () => {
  const content = document.querySelector('.content');
  while (content.firstChild) {
    content.firstChild.remove();
  }
}

export default clearContent