"use client";

import { useState } from "react";
import styles from "./UploadArea.module.css";
import handleUpload from "./actions";

export default function UploadArea() {
	const [uploadState, setUploadState] = useState("Click to upload a photo");
	const [imagePreview, setImagePreview] = useState("/aperture.svg");
	return (
		<form action={handleUpload} className={styles.uploadForm}>
			<input
				type="text"
				name="title"
				id="titleInput"
				placeholder="Photo Title"
				className={styles.textInput}
			/>
			<div
				className={styles.uploadArea}
				onClick={() => {
					document.getElementById("uploadArea")?.click();
				}}
			>
				<img src={imagePreview} alt="Preview" className={styles.previewImage} />
				<input
					type="file"
					name="photo"
					accept="image/*"
					className="hidden"
					id="uploadArea"
					onChange={(e) => {
						if (e.target.files !== null && e.target.files.length > 0) {
							setUploadState(e.target.files[0].name);

							setImagePreview(URL.createObjectURL(e.target.files[0]));
						}
					}}
				/>
				<label
					htmlFor="uploadArea"
					className={styles.uploadLabel}
					id="uploadLabel"
				>
					{uploadState}
				</label>
			</div>
			<input
				type="text"
				name="tags"
				id="tags"
				placeholder="Comma-Seperated Photo Tags (e.g aviation,cars,landscapes)"
				className={styles.textInput}
			/>
			<button type="submit" className={styles.uploadButton}>
				Upload
			</button>
		</form>
	);
}
