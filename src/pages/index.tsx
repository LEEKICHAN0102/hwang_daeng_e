import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

interface DataResponseDetail {
  url: string;
  liked: boolean;
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, mutate: boundMutate } = useSWR<DataResponseDetail>(
    "https://dogs-api.nomadcoders.workers.dev"
  );
  const likedBtn = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, liked: !prev.liked }, false);
  };
  const newDog = async () => {
    setLoading(true);
    await boundMutate();
    setLoading(false);
  };
  return (
    <div className="bg-gray-500 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl mb-12 font-bold">🐶 황댕이 🐶</h1>
      <div className="flex justify-center items-center">
        {data && !loading ? (
          <video
            src={data.url}
            autoPlay
            loop
            playsInline
            className="max-w-screen h-[50vh] object-contain"
          />
        ) : (
            <img 
              src="https://s3.orbi.kr/data/file/united2/a3d5535cada6416b86d1d7fa572cdafc.gif"
            />
        )}
      </div>
      <div className="mt-12 space-x-4">
        <button
          className="bg-white p-4 text-xl font-bold text-black rounded-full"
          onClick={newDog}
        >
          Another Dog
        </button>
        <button
          className="bg-blue-400 p-4 text-xl font-bold text-white rounded-full"
          onClick={likedBtn}
        >
          {data?.liked ? "Like 😃" : "DisLike😅"}
        </button>
      </div>
    </div>
  );
};

export default Home;
