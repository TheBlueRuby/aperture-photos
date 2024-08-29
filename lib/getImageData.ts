import exifr from "exifr";

type CameraData = {
  Model: string;
  Lens: string;
  ApertureValue: string;
  ShutterSpeed: string;
  ISO: string;
  FocalLength: string;
};
function cameraData(
  Model?: string,
  Lens?: string,
  ApertureValue?: string,
  ShutterSpeed?: string,
  ISO?: string,
  FocalLength?: string
): CameraData {
  let ret = {
    Model: "Unknown",
    Lens: "Unknown",
    ApertureValue: "Unknown",
    ShutterSpeed: "Unknown",
    ISO: "Unknown",
    FocalLength: "Unknown",
  };
  if (Model != undefined) {
    ret.Model = Model;
  }
  if (Lens != undefined) {
    ret.Lens = Lens;
  }
  if (ApertureValue != undefined) {
    ret.ApertureValue = "f" + ApertureValue;
  }
  if (ShutterSpeed != undefined) {
    ret.ShutterSpeed = "1/" + Math.round(1 / parseFloat(ShutterSpeed));
  }
  if (ISO != undefined) {
    ret.ISO = ISO;
  }
  if (FocalLength != undefined) {
    ret.FocalLength = FocalLength + "mm";
  }
  return ret;
}

export default async function getImageData(
  imageId: string
): Promise<CameraData> {
  return exifr
    .parse(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageId}`
    )
    .then(
      (output) => {
        if (output != undefined) {
          return cameraData(
            output.Make + " " + output.Model,
            output.Lens,
            output.FNumber,
            output.ExposureTime,
            output.ISO,
            output.FocalLengthIn35mmFormat
          );
        } else {
          return cameraData();
        }
      },
      (error) => {
        console.error(error);
        return cameraData();
      }
    );
}
