import { ListObjectsCommand, ListObjectsCommandInput } from "@aws-sdk/client-s3"

import s3 from "@/utils/s3-client"
import { AWS_S3_HOST, AWS_S3_BUCKET_NAME } from "@/constants"
import type { CommonExternalResult } from "@/type"

import type { S3FileItem } from "./types"

export const getFloderFiles = async (
  folderName: string
): Promise<CommonExternalResult<S3FileItem[]>> => {
  const input: ListObjectsCommandInput = {
    Prefix: encodeURIComponent(folderName) + "/",
    Bucket: AWS_S3_BUCKET_NAME,
  }

  try {
    const data = await s3.send(new ListObjectsCommand(input))
    if (data.Contents?.length === 1) {
      return { success: true, data: [] }
    } else {
      const bucketUrl = `${AWS_S3_HOST}${AWS_S3_BUCKET_NAME}/`
      const files: S3FileItem[] =
        data.Contents?.map(function (photo) {
          const assetKey = photo.Key ?? ""
          const assetUrl = bucketUrl + encodeURIComponent(assetKey)
          return { assetKey, assetUrl }
        }) ?? []

      return {
        success: true,
        data: files,
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
  }

  return { success: false, message: "unexpect_skip" }
}
