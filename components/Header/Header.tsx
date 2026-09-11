import { getMenuItems, type MenuItem } from "@/lib/navigation";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  let menuItems: MenuItem[] = [];

  try {
    const data = await getMenuItems();

    menuItems = Array.isArray(data)
      ? data
      : [];

    console.log(
      "Server WordPress Header Menu:",
      menuItems.length
    );
  } catch (error) {
    console.error(
      "Failed to fetch WordPress Header Menu:",
      error
    );

    // WordPress temporarily unavailable.
    // Do not break the entire website.
    menuItems = [];
  }

  return (
    <HeaderClient
      menuItems={menuItems}
    />
  );
}