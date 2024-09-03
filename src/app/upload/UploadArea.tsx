"use client";
import styles from "./UploadArea.module.css";

export default async function UploadArea() {
	return (
		<form
			action="/api/upload"
			method="post"
			encType="multipart/form-data"
			className={styles.uploadForm}
		>
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
			<button type="submit" className={styles.uploadButton}>
				Upload
			</button>
		</form>
	);
}
