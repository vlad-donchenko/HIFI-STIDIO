'use strict';

(function () {
    const fileChooseWrapper = document.querySelector('.file-chooser');

    if (fileChooseWrapper) {
      const fileChooserInput = fileChooseWrapper.querySelector('#support_file');
      const fileChooserListRoot = fileChooseWrapper.querySelector('#file_chooser_root');

      const getDownloadFileTemplate = (name, size) => {
        return (
          `<div class="file-chooser__item">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="27" viewBox="0 0 22 27" fill="none" class="file-chooser__item-icon">
              <path d="M21.8405 6.76959L15.388 0.317128C15.2857 0.214976 15.1473 0.157593 15.0029 0.157593H2.64669C1.18726 0.157593 0 1.34496 0 2.80439V24.1957C0 25.6551 1.18732 26.8424 2.64675 26.8424H19.3533C20.8127 26.8424 22 25.6551 22 24.1957V7.15469C21.9999 7.01027 21.9426 6.87174 21.8405 6.76959ZM15.5476 2.01714L20.1407 6.61015H17.1052C16.689 6.61015 16.2978 6.44812 16.0037 6.15396C15.7096 5.85985 15.5475 5.4687 15.5476 5.05264V2.01714ZM20.9108 24.1956C20.9108 25.0545 20.2121 25.7532 19.3533 25.7532H2.64669C1.78783 25.7532 1.08913 25.0545 1.08913 24.1956V2.80439C1.08918 1.94553 1.78788 1.24677 2.64669 1.24677H14.4584V5.05253C14.4583 5.75952 14.7336 6.42419 15.2335 6.92407C15.7334 7.42399 16.3981 7.69928 17.1051 7.69928H20.9107V24.1956H20.9108Z" fill="#252A37"></path>
              <path d="M11.9954 18.4769H11.7516C11.4509 18.4769 11.207 18.7207 11.207 19.0215C11.207 19.3223 11.4509 19.5661 11.7516 19.5661H11.9954C12.2962 19.5661 12.54 19.3223 12.54 19.0215C12.54 18.7207 12.2962 18.4769 11.9954 18.4769Z" fill="#252A37"></path>
              <path d="M9.98949 18.4769H4.69986C4.39914 18.4769 4.15527 18.7207 4.15527 19.0215C4.15527 19.3223 4.39914 19.5661 4.69986 19.5661H9.98949C10.2902 19.5661 10.5341 19.3223 10.5341 19.0215C10.5341 18.7207 10.2903 18.4769 9.98949 18.4769Z" fill="#252A37"></path>
              <path d="M17.3002 15.9885H4.69986C4.39914 15.9885 4.15527 16.2323 4.15527 16.5331C4.15527 16.8339 4.39914 17.0777 4.69986 17.0777H17.3002C17.601 17.0777 17.8448 16.8339 17.8448 16.5331C17.8448 16.2323 17.601 15.9885 17.3002 15.9885Z" fill="#252A37"></path>
              <path d="M17.3002 13.5H4.69986C4.39914 13.5 4.15527 13.7438 4.15527 14.0446C4.15527 14.3454 4.39914 14.5892 4.69986 14.5892H17.3002C17.601 14.5892 17.8448 14.3454 17.8448 14.0446C17.8448 13.7438 17.601 13.5 17.3002 13.5Z" fill="#252A37"></path>
              <path d="M17.3002 11.0116H4.69986C4.39914 11.0116 4.15527 11.2554 4.15527 11.5562C4.15527 11.857 4.39914 12.1008 4.69986 12.1008H17.3002C17.601 12.1008 17.8448 11.857 17.8448 11.5562C17.8448 11.2554 17.601 11.0116 17.3002 11.0116Z" fill="#252A37"></path>
            </svg>
            <div class="file-chooser__info">
              <p class="file-chooser__file-name">
                ${name}
              </span>
              </p>
              <p class="file-chooser__file-size">
                ${(size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>`
        )
      };

      const getDownloadFilesContainerTemplate = (loadedFileList) => {
        const downloadedItemMarkup = loadedFileList.map((loadedFileItem) => {
          const {name, size} = loadedFileItem;
          return getDownloadFileTemplate(name, size);
        }).join('\n');

        return (
          `<div class="file-chooser__list">
               ${downloadedItemMarkup}
           </div>`
        );
      };

      fileChooserInput.addEventListener('change', () => {
        console.log(fileChooserInput.files);
        const files = [...fileChooserInput.files];
        const downloadFilesContainerTemplate = getDownloadFilesContainerTemplate(files);
        fileChooserListRoot.innerHTML = '';
        fileChooserListRoot.insertAdjacentHTML('afterbegin', downloadFilesContainerTemplate);
      });
    }
})();
