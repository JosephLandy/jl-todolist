// @flow

export function indexOfElem(a: any[], elem: any): number {
  return a.findIndex((e) => e === elem);
}

// mutable!!
export function moveArrayElem(array: any[], oldIndex:number, newIndex:number): any[] {
  const newArray = array.slice();
  const [elem] = newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, elem);

  return newArray;
}