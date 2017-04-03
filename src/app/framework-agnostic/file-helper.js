
function triggerFileDownload({ fileName, content, contentType = 'text/plain' }) {
  var element = document.createElement('a');

  element.setAttribute(
    'href',
    `data:${contentType};charset=utf-8,${window.encodeURIComponent(content)}`
  );

  element.setAttribute('download', fileName);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const fileHelper = {
  triggerFileDownload
}

export default fileHelper
