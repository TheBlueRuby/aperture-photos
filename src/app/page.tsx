import { supabase } from "@/supabase";
import PhotoDisplay from "./components/PhotoDisplay";

export default async function Home() {
	const { data: tableData } = await supabase
		.from("image-metadata")
		.select("id");
	console.log(tableData);
	return (
		<>
			{tableData?.map((image) => {
				return <PhotoDisplay imageId={image.id} />;
			})}
		</>
	);
}
