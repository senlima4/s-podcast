import {
  ListObjectsCommand,
  DeleteObjectsCommand,
  ListObjectsCommandInput,
  DeleteObjectsCommandInput,
} from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import { AWS_S3_BUCKET_NAME } from "@/constants"
import type { CommonExternalResult } from "@/type"

export const deleteFolder = async (
  folderName: string
): Promise<CommonExternalResult> => {
  const listInput: ListObjectsCommandInput = {
    Bucket: AWS_S3_BUCKET_NAME,
    Prefix: folderName,
  }

  try {
    const data = await s3.send(new ListObjectsCommand(listInput))
    const objs = data.Contents?.map((obj) => ({ Key: obj.Key }))

    const deleteInput: DeleteObjectsCommandInput = {
      Bucket: AWS_S3_BUCKET_NAME,
      Delete: { Objects: objs },
    }

    await s3.send(new DeleteObjectsCommand(deleteInput))
    return { success: true }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
  }
  return { success: false, message: "unexpect_skip" }
}
