import styles from "./CameraInfoCard.module.css";

export default function CameraInfoCard(
	params: Readonly<{
		label: string;
		value: string;
	}>
) {
	return (
		<div className={styles["info-card"]}>
			<p className="text-2xl">{params.label}</p>
			<p>{params.value}</p>
		</div>
	);
}
