"use client";

import styles from "./UploadArea.module.css";
import handleUpload from "./actions";

export default function UploadArea() {
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
				<input
					type="file"
					name="photo"
					accept="image/*"
					className="hidden"
					id="uploadArea"
				/>
				<label htmlFor="uploadArea" className={styles.uploadLabel}>
					Click to upload a photo
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
