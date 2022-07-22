import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import { AWS_S3_BUCKET_NAME } from "@/constants"
import type { CommonExternalResult } from "@/type"

export const createFolder = async (
  folderName: string
): Promise<CommonExternalResult> => {
  folderName = folderName.trim()
  if (!folderName) {
    return { success: false, message: "folder_name_not_exist" }
  }
  if (folderName.indexOf("/") !== -1) {
    return { success: false, message: "invalid_folder_name" }
  }
  const folderKey = encodeURIComponent(folderName) + "/"

  const input: PutObjectCommandInput = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: folderKey,
  }

  try {
    await s3.send(new PutObjectCommand(input))
    return { success: true }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
  }

  return { success: false, message: "unexpect_skip" }
}
