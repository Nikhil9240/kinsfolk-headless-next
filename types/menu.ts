export type MenuItem = {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
};

export type MenuTreeItem = MenuItem & {
  children: MenuTreeItem[];
};