
export function formatIconPath(str:string){
  return str.replace(/[A-Z]/g,'-$&').toLowerCase()
}
