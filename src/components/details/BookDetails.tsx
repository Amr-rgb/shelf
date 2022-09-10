import { useParams } from "react-router-dom";
import { Header } from "./Header";

export const BookDetails = () => {
  const { bookId } = useParams();

  const details = {
    book_id: 896220,
    name: "Close Ups: From The Golden Age Of The Silent Cinema",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/book/111x148._SX50_.png",
    url: "https://www.goodreads.com/book/show/896220.Close_Ups?from_search=true&from_srp=true&qid=NIsMMSmPhN&rank=16",
    authors: ["John Richard Finch"],
    rating: 0,
    created_editions: 1,
  };

  return (
    <div>
      <Header />

      <div className="space-y-6 bg-white p-4 py-8 rounded-xl">
        <p className="uppercase font-caudex font-bold text-xl text-center">
          book details
        </p>
        <span className="block w-full h-[1px] bg-lightGreen"></span>
        {Object.entries(details).map(([title, value]) => (
          <BookDetail key={title} title={title} value={value} />
        ))}
      </div>
    </div>
  );
};

const BookDetail = ({ title, value }: { title: any; value: any }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{title} :</p>
      {title === "cover" ? (
        <div
          className="bg-cover bg-center shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20"
          style={{
            backgroundImage: `url(${value})`,
          }}
        ></div>
      ) : title === "url" ? (
        <a
          className="text-sm leading-relaxed underline inline-block truncate w-full"
          href={value}
          target="_blank"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm leading-relaxed">{value}</p>
      )}
    </div>
  );
};
