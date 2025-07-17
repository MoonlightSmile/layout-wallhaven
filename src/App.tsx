import Layout from "./components/Layout";
import { createAlova } from "alova";
import adapterFetch from "alova/fetch";
import { useCallback, useState } from "react";
import data from "./data.json";
import { InView } from "react-intersection-observer";

type Params = {
  apikey: string;
  sorting:
    | "date_added*"
    | "relevance"
    | "random"
    | "views"
    | "favorites"
    | "toplist";
  /**
   * sfw/sketchy/nsfw
   */
  order?: "asc" | "desc*";
  purity: "100" | "110" | "111" | "010" | "011" | "001";
  topRange: "1d" | "3d" | "1w" | "1M*" | "3M" | "6M" | "1y";
  page?: number;
  /**
   * general/anime/people
   */
  categories?: "100" | "110" | "111";
};

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  responded: (res) => res.json(),
  baseURL: "https://netease-cloud-music-api-five-omega-11.vercel.app/wallhaven",
});
type Item = (typeof data.data)[number];
const App = () => {
  const [list, setList] = useState<Item[][]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const onLoadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    alovaInstance
      .Get("/search", {
        params: {
          page,
          sorting: "toplist",
          purity: "100",
          topRange: "1w",
        } as Params,
      })
      .then((_e) => {
        const e = _e as { data: Item[] };
        setList((prev) => [...prev, e.data]);
        setPage((prev) => prev + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, page]);
  return (
    <div className="w-full">
      <Layout<Item> height={300} w={80} gap={5} list={list} />

      <InView
        onChange={(e) => {
          if (!e || loading) return;
          onLoadMore();
        }}
      >
        <div className="w-full h-full bg-red-500 text-center text-white">
          {loading ? "加载中..." : "加载更多"}
        </div>
      </InView>
    </div>
  );
};

export default App;
