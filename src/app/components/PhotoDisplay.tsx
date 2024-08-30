import Image from "next/image";
import getImageData from "@/getImageData";
import styles from "./PhotoDisplay.module.css";
import { supabase } from "@/supabase";
import CameraInfoCard from "./CameraInfoCard";

export default async function PhotoDisplay(
	props: Readonly<{ imageId: string, key: string }>
) {
	let imgData = await getImageData(props.imageId);

	let title: string = await getColumnFromImage(props.imageId, "title");
	let tags: string[] = await getColumnFromImage(props.imageId, "tags");

	let ownerId: string = await getColumnFromImage(props.imageId, "owner");
	let author = "";
	const { data } = await supabase
		.from("profiles")
		.select("displayname")
		.eq("id", ownerId);
	if (data != null && data.length > 0) {
		author = data[0].displayname;
	}

	let altText = "Photo including " + tags;
	return (
		<div className={styles["image-card"]}>
			<Image
				src={props.imageId}
				width={1024}
				height={768}
				alt={altText}
				className={styles["image"]}
			/>
			<div className={styles["text-container"]}>
				<div>
					<h1 className="text-5xl mb-2">{title}</h1>
					<p>by {author}</p>
					<br />
					<h2 className="text-3xl">Camera Info:</h2>
					<div className={styles["meta-container"]}>
						<CameraInfoCard label="Camera" value={imgData.Model} />
						<CameraInfoCard label="Lens" value={imgData.Lens} />
						<CameraInfoCard label="Focal Length" value={imgData.FocalLength} />
						<CameraInfoCard label="Aperture" value={imgData.ApertureValue} />
						<CameraInfoCard label="Shutter Speed" value={imgData.ShutterSpeed} />
						<CameraInfoCard label="ISO" value={imgData.ISO} />
					</div>
					<br />
					<h2 className="text-2xl">Tags:</h2>
					<ul className={styles["tag-container"]}>
						{tags.map((tag) => {
							return (
								<li key={tag} className={styles["tag"]}>
									{tag}
								</li>
							);
						})}
					</ul>
				</div>
				<a
					href={"/photo/" + props.imageId}
					className="text-blue-500 underline"
				>
					Permalink
				</a>
			</div>
		</div>
	);
}

async function getColumnFromImage(
	imageId: string,
	column: string
): Promise<any> {
	let columnContents: any;
	const { data } = await supabase
		.from("image-metadata")
		.select(column)
		.eq("id", imageId);
	if (data != null && data.length > 0) {
		columnContents = data[0][column as keyof typeof data[0]];
	}

	return columnContents;
}
