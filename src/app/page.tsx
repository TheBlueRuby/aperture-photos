import { supabase } from "@/supabase";
import PhotoDisplay from "./components/PhotoDisplay";

export default async function Home() {
  const { data: tableData, error: tableError } = await supabase.from("image-metadata").select("imgId");

  return (
    <>
      {tableData?.map((image) => {
        return <PhotoDisplay imageId={image.imgId} />;
      })}
    </>
  );
}
