type bookType = {
  id: string;
  title: string;
  authors: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

type BookCardType = {
  book: bookType;
};

export const Latest = () => {
  const latestBooks = [
    {
      id: "1",
      title: "The Goldfinch",
      authors: ["Donna Tartt"],
      read: 124,
      pages: 200,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hNKNOpY_W-Xlr_O6cCppzUX-fxkDKK88GEem1-kFdsAMNRTX5rjd5AkLAkh_J_GBBIc&usqp=CAU",
    },
    {
      id: "2",
      title: "The Goldfinch",
      authors: ["Donna Tartt"],
      read: 113,
      pages: 300,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hNKNOpY_W-Xlr_O6cCppzUX-fxkDKK88GEem1-kFdsAMNRTX5rjd5AkLAkh_J_GBBIc&usqp=CAU",
    },
  ];

  return (
    <div className="mt-14">
      <p className="mb-8 font-bold text-green">Continue Reading</p>
      <div className="space-y-12">
        {latestBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export const BookCard = ({ book }: BookCardType) => {
  const percentage: number = Number(
    ((book.read / book.pages) * 100).toFixed(0)
  );

  return (
    <div className="flex items-center">
      <div
        className="bg-cover bg-center shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20"
        style={{
          backgroundImage: `url(${book.imgUrl})`,
        }}
      ></div>

      <div className="ml-6 mr-auto space-y-2 flex-1 max-w-[12rem]">
        <p className="capitalize font-caudex font-bold text-xl leading-6 w-28">
          {book.title}
        </p>
        <p className="text-sm opacity-30">
          {book.authors.map((author, idx, arr) => (
            <span className="capitalize">
              {author}
              {idx < arr.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col space-y-4 text-center">
        <p className="font-medium text-lg text-green opacity-70">
          {percentage}%
        </p>
        <div
          className="progress-circle w-8 h-8 rounded-full"
          style={{
            background: `conic-gradient(#28353c ${percentage}%, #fff ${percentage}% ${
              100 - percentage
            }%)`,
          }}
        ></div>
      </div>
    </div>
  );
};
