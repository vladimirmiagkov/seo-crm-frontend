declare let jQuery: any;

export class UtilService {
  public static findIndexById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        return i;
      }
    }
    return null;
  }

  public static cloneObject(obj) {
    return jQuery.extend(true, {}, obj);
  }
}