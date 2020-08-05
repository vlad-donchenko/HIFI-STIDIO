'use strict';

(function () {
    const fileChooseWrapper = document.querySelector('.file-chooser');

    if (fileChooseWrapper) {
      const dropArea = fileChooseWrapper.querySelector('.file-chooser__label');

      const uploadFiles = (files) => {
        [...files].forEach(() => {

        });
      };

      const dropAreaFocused = (evt) => {
        evt.preventDefault();
        fileChooseWrapper.classList.add('file-chooser--focused');
      };

      const dropAreaUnFocused = (evt) => {
        evt.preventDefault();
        const {files} = evt.dataTransfer;

        uploadFiles(files);

        fileChooseWrapper.classList.remove('file-chooser--focused');
      };

      dropArea.addEventListener('dragenter', dropAreaFocused);
      dropArea.addEventListener('dragover', dropAreaFocused);

      dropArea.addEventListener('dragleave', dropAreaUnFocused);
      dropArea.addEventListener('drop', dropAreaUnFocused);
    }
})();
