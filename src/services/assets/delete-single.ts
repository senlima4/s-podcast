import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import type { CommonExternalResult } from "@/type"

export const deleteSingleAsset = async (
  folderName: string,
  assetKey: string
): Promise<CommonExternalResult> => {
  const input: DeleteObjectCommandInput = {
    Bucket: folderName,
    Key: assetKey,
  }

  try {
    await s3.send(new DeleteObjectCommand(input))
    return { success: true }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
  }
  return { success: false, message: "unexpect_skip" }
}
