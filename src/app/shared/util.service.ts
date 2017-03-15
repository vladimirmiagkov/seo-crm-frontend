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

  public static numberOfDaysBetweenTwoDates(date1: Date, date2: Date) {
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000)));
  }
}