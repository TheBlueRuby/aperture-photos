import styles from "./styles.module.css";
import UploadArea from "./UploadArea";

export default async function Page() {
	return (
		<div className={styles.uploadContainer}>
			<UploadArea />
		</div>
	);
}
