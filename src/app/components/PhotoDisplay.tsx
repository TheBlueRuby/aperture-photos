import Image from "next/image";
import getImageData from "@/getImageData";

export default async function PhotoDisplay(props: { imageId: string }) {
  let imagePath = props.imageId + ".jpg";

  let imgData = await getImageData(props.imageId);

  let tags: string[] = [];
  let altText = "Photo including " + tags;
  return (
    <div className="flex space-x-4 m-8">
      <Image
        src={imagePath}
        width={1024}
        height={768}
        alt={altText}
        className="flex-auto rounded-3xl"
      />
      <div className="flex-auto rounded-3xl bg-white/10 p-5">
	  <h1 className="text-3xl">Title</h1>
        <ul>
          <li>Camera: {imgData.Model}</li>
          <li>Lens: {imgData.Lens}</li>
          <li>Focal Length: {imgData.FocalLength}</li>
          <li>Aperture: {imgData.ApertureValue}</li>
          <li>Shutter Speed: {imgData.ShutterSpeed}</li>
          <li>ISO: {imgData.ISO}</li>
        </ul>
      </div>
    </div>
  );
}
