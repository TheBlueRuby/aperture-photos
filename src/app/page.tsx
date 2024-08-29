import { supabase } from "@/supabase";
import Image from "next/image";

export default async function Home() {
  const { data, error } = await supabase.storage.from("images").list("folder", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "dsc" },
  });
  return <></>;
}
