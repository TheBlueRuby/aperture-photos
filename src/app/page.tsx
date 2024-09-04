import { createClient } from "@/supabase/noauth";
import PhotoDisplay from "./components/PhotoDisplay";

export default async function Home() {
	const supabase = createClient();
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
