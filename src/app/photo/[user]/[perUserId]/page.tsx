import Image from "next/image";
import getImageId from "@/getImageId";
import getImageData from "@/getImageData";

export default async function Page({ params }: { params: { user: string, perUserId: string } }) {
  let imageId = getImageId(params.user, params.perUserId);
  let imagePath = imageId + ".jpg";

  let imgData = await getImageData(imageId);

  let tags: string[] = [];
  let photoName = "Test";
  let altText = "Photo including " + tags;

  return (
    <>
      <h1>{photoName}</h1>
      <div>
        <Image src={imagePath} height={1080} width={1620} alt={altText} />
      </div>
	  <div>
		<ul>
			<li>Camera: {imgData.Model}</li>
			<li>Lens: {imgData.Lens}</li>
			<li>Focal Length: {imgData.FocalLength}</li>
			<li>Aperture: {imgData.ApertureValue}</li>
			<li>Shutter Speed: {imgData.ShutterSpeed}</li>
			<li>ISO: {imgData.ISO}</li>
			
		</ul>
	  </div>
    </>
  );
}
