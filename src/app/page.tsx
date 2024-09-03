import { supabase } from "@/supabase/client";
import PhotoDisplay from "./components/PhotoDisplay";

export default async function Home() {
	const { data: tableData } = await supabase
		.from("image-metadata")
		.select("id")
		.limit(10)
		.order("uploaded_at", { ascending: false });
	return (
		<>
			{tableData?.map((image) => {
				return <PhotoDisplay key={image.id} imageId={image.id} />;
			})}
		</>
	);
}
