import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/supabase/client";
import { getImgUrl } from "@/image-loader";

import styles from "./PhotoDisplay.module.css";

import getImageData from "@/getImageData";
import CameraInfoCard from "./CameraInfoCard";
import TagCard from "./TagCard";

export default async function PhotoDisplay(
	props: Readonly<{ imageId: string; key: string }>
) {
	const supabase = createClient();
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
			<Link
				href={getImgUrl(props.imageId)}
				className={styles["image-link"]}
			>
				<Image
					src={props.imageId}
					width={1024}
					height={768}
					alt={altText}
					className={styles["image"]}
				/>
			</Link>
			<div className={styles["text-container"]}>
				<div>
					<h1 className="text-5xl mb-2">{title}</h1>
					<p>by {author}</p>
					<br />
					<h2 className="text-3xl">Camera Info:</h2>
					<div className={styles["meta-container"]}>
						<CameraInfoCard label="Camera" value={imgData.Model} />
						<CameraInfoCard label="Lens" value={imgData.Lens} />
						<CameraInfoCard
							label="Focal Length"
							value={imgData.FocalLength}
						/>
						<CameraInfoCard
							label="Aperture"
							value={imgData.ApertureValue}
						/>
						<CameraInfoCard
							label="Shutter Speed"
							value={imgData.ShutterSpeed}
						/>
						<CameraInfoCard label="ISO" value={imgData.ISO} />
					</div>
					<br />
					<h2 className="text-2xl">Tags:</h2>
					<div className={styles["meta-container"]}>
						{tags.map((tag) => {
							return <TagCard key={tag} tag={tag}></TagCard>;
						})}
					</div>
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
	const supabase = createClient();
	let columnContents: any;
	const { data } = await supabase
		.from("image-metadata")
		.select(column)
		.eq("id", imageId);
	if (data != null && data.length > 0) {
		columnContents = data[0][column as keyof (typeof data)[0]];
	}

	return columnContents;
}
