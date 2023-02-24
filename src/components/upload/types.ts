

import {ExtractPropTypes} from "vue"

export const Props  = {
  name:String
}  as const;




export type UploadProps = ExtractPropTypes<typeof Props >