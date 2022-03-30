import { useState, useCallback } from "react";

const useDeleteFile = async (
  cloudStorageId,
  databaseId,
  url,
  postSlug,
  Token
) => {
  const [DeleteLoading, setDeleteLoading] = useState(false);
  setDeleteLoading(true);
  const resp = useCallback(
    await fetch(`${process.env.APP_URL}/posts/delete-file`, {
      method: "DELETE",
      body: JSON.stringify({
        cloudStorageId,
        databaseId,
        url,
        postSlug,
        Token,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }),
    []
  );
  const data = await resp.json();
  setDeleteLoading(false);
  return { DeleteLoading, data };
};

export default useDeleteFile;
