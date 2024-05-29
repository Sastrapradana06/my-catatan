export default function Alert({
  status,
  type,
  message,
}: {
  status: boolean;
  type: string;
  message: string;
}) {
  if (!status) return null;

  return (
    <div className="w-full  h-max absolute left-0 bottom-[80px]">
      <div
        className={`flex w-max m-auto items-center p-4 mb-4 text-sm rounded-lg ${
          type === "success"
            ? "text-green-400 bg-gray-800  border-green-800"
            : "text-red-400 bg-gray-800 border-red-800"
        }  `}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill={type === "success" ? "currentColor" : "red"}
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="flex justify-center items-center gap-2">
          {/* <p className="font-medium">
            {type === "success" ? "Success," : "Gagal,"}
          </p> */}
          <span className="text-gray-300">{message}</span>
        </div>
      </div>
    </div>
  );
}
