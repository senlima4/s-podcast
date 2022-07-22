import { ListObjectsCommand, ListObjectsCommandInput } from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import { AWS_S3_BUCKET_NAME } from "@/constants"
import type { CommonExternalResult } from "@/type"

export const getFolders = async (): Promise<CommonExternalResult<string[]>> => {
  const input: ListObjectsCommandInput = {
    Bucket: AWS_S3_BUCKET_NAME,
    Delimiter: "/",
  }

  try {
    const data = await s3.send(new ListObjectsCommand(input))
    if (typeof data.CommonPrefixes === "undefined") {
      return { success: true, data: [] }
    }
    const folders = data.CommonPrefixes.map((commonPrefix) => {
      const prefix = commonPrefix.Prefix ?? ""
      const folderName = decodeURIComponent(prefix.replace("/", ""))
      return folderName
    })

    console.log(folders)

    return {
      success: true,
      data: folders,
    }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
  }

  return { success: false, message: "unexpect_skip" }
}
