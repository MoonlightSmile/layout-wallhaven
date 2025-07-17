import Section from "./Section";
import type { ImageItem } from "../utils/layout";

type LayoutProps<T extends ImageItem> = {
  height: number;
  gap?: number;
  w: number;
  list: T[][];
};
const Layout = <T extends ImageItem>(props: LayoutProps<T>) => {
  return (
    <div className="w-full">
      {(props.list ?? []).map((i, index) => {
        return <Section<T> key={`section-${index}`} {...props} list={i} />;
      })}
    </div>
  );
};

export default Layout;
