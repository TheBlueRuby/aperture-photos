import { createClient } from "@/supabase/noauth";
import PhotoDisplay from "../components/PhotoDisplay";

export default async function Home({ params }: { params: { user: string } }) {
	const supabase = createClient();
	const { data: userId } = await supabase
		.from("profiles")
		.select("id")
		.eq("username", params.user);
	if (!userId) {
		return <div>User not found</div>;
	}
	const { data: tableData } = await supabase
		.from("image-metadata")
		.select("id")
		.eq("owner", userId[0].id)
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
