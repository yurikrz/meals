import { utilsFirebase } from '../../config/plugins/firebase.plugin.js';

export class UploadFile {
  static async uploadToFirebase(path, data) {
    const imgRef = utilsFirebase.ref(utilsFirebase.storage, path);
    await utilsFirebase.uploadBytes(imgRef, data);
    return await utilsFirebase.getDownloadURL(imgRef);
  }

  static async deleteFromFirebase(path) {
    const url_token = path.split('?');
    const url = url_token[0].split('/');
    const pathFileToDelete = url[url.length - 1].replaceAll('%2F', '/');

    const imgRef = utilsFirebase.ref(utilsFirebase.storage, pathFileToDelete);
    return await utilsFirebase.deleteObject(imgRef);
  }
}
