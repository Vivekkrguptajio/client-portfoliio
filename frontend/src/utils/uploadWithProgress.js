export const uploadWithProgress = (url, formData, token, method = 'POST', onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        if (onProgress) onProgress(percentComplete);
      }
    };
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else if (xhr.status === 401) {
        reject({ status: 401, message: 'Unauthorized' });
      } else if (xhr.status === 404) {
        reject({ status: 404, message: 'Not found' });
      } else {
        try {
          reject(JSON.parse(xhr.responseText));
        } catch (e) {
          reject({ message: xhr.responseText || `Upload failed with status ${xhr.status}` });
        }
      }
    };
    
    xhr.onerror = () => reject({ message: 'Network error occurred during upload' });
    xhr.send(formData);
  });
};
