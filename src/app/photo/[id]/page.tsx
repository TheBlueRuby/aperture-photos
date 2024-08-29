import PhotoDisplay from "@/app/components/PhotoDisplay";

export default function Page({
  params,
}: {
  params: { id: string };
}) {

  return (
    <>
      <PhotoDisplay imageId={params.id} />
    </>
  );
}
