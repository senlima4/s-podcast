import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import { AWS_S3_BUCKET_NAME } from "@/constants"
import type { CommonExternalResult } from "@/type"

export const uploadSingleAsset = async (
  folderName: string,
  files: File[]
): Promise<CommonExternalResult> => {
  const prefix = encodeURIComponent(folderName) + "/"
  const file = files[0]

  const input: PutObjectCommandInput = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: prefix + file.name,
    Body: file,
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
