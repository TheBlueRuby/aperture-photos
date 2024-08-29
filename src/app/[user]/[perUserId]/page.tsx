import PhotoDisplay from "@/app/components/PhotoDisplay";
import getImageId from "@/getImageId";

export default function Page({
  params,
}: {
  params: { user: string; perUserId: string };
}) {
  let imageId = getImageId(params.user, params.perUserId);

  return (
    <>
      <PhotoDisplay imageId={imageId} />
    </>
  );
}
