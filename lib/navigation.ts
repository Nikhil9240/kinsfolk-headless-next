import { fetchFromWordPress } from "./wordpress";

export type MenuItem = {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
};

const GET_MENU_ITEMS = `
  query GetMenuItems {
    menuItems(first: 100) {
      nodes {
        id
        label
        url
        parentId
      }
    }
  }
`;

export async function getMenuItems(): Promise<MenuItem[]> {
  const data = await fetchFromWordPress(GET_MENU_ITEMS);

  console.log(
    "WORDPRESS MENU RESPONSE:",
    JSON.stringify(data?.menuItems?.nodes, null, 2)
  );

  const items = data?.menuItems?.nodes ?? [];

  console.log("WORDPRESS MENU COUNT:", items.length);

  return items;
}