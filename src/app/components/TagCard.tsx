import styles from "./TagCard.module.css";

export default function TagCard(params: Readonly<{tag: string}>) {
	let tagFormatted = "";
	params.tag.split(" ").forEach(word => {
		let firstCapital = word.charAt(0).toUpperCase();
		let rest = word.slice(1);
		tagFormatted += firstCapital + rest + " ";
	});
	return (<div className={styles["tag-card"]}>{tagFormatted}</div>);
}
