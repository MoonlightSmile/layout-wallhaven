import { useEffect, useMemo, useState } from "react";
import { calcImageRow, type ImageItem } from "../utils/layout";
import Item from "./Item";
import { pick } from "lodash";

type SectionProps<T extends ImageItem> = {
  list: T[];
  height: number;
  gap?: number;
  w: number;
};

const Section = <T extends ImageItem>(props: SectionProps<T>) => {
  const [width, setWidth] = useState(0);

  const grid = useMemo(() => {
    return calcImageRow({
      list: props.list,
      clientWidth: width,
      ...pick(props, ["height", "gap", "w"]),
    });
  }, [props, width]);

  useEffect(() => {
    const onResize = () => {
      const section = document.querySelector(".layout-section");
      if (section) {
        setWidth(section.getBoundingClientRect().width);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="w-full flex flex-col layout-section">
      {grid.map((i, index) => {
        return (
          <div className="flex flex-row w-full" key={index}>
            {i.list.map((j, index) => {
              return (
                <div
                  className="flex-inline"
                  key={j.id}
                  style={{
                    marginRight: index === i.list.length - 1 ? 0 : props.gap,
                    marginBottom: props.gap,
                    marginLeft: index === 0 ? props.gap : 0,
                  }}
                >
                  <Item item={j} i={i} index={index} />
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default Section;
