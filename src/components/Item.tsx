import type { ImageItem, Result } from "../utils/layout";

type ItemProps<T extends ImageItem> = {
  item: T;
  index?: number;
  i: Result<T>[number];
};

const Item = <T extends ImageItem>(props: ItemProps<T>) => {
  const { item, i } = props;
  return (
    <img
      src={item.thumbs.original}
      className="flex"
      style={{
        height: i.height.toNumber(),
        width: i.height.mul(item.ratio).toNumber(),
      }}
      onClick={() => {
        window.open(item.path, "_blank");
      }}
    />
  );
};

export default Item;
