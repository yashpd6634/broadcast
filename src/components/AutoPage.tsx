import { useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import toastService from "../services/ToastService";

const data = [
  {
    id: "1",
    value: "Frontend System Design",
  },
  {
    id: "2",
    value: "Backend System Design",
  },
  {
    id: "3",
    value: "Database Design",
  },
  {
    id: "4",
    value: "Microservices Architecture",
  },
  {
    id: "5",
    value: "Cloud Computing",
  },
  {
    id: "6",
    value: "DevOps Practices",
  },
  {
    id: "7",
    value: "Containerization with Docker",
  },
  {
    id: "8",
    value: "Kubernetes Orchestration",
  },
  {
    id: "9",
    value: "API Design and Development",
  },
  {
    id: "10",
    value: "Security Best Practices",
  },
];

function AutoPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-1">
      <h1 className="text-4xl text-black font-bold">Frontend System Design</h1>
      <AutoComplete
        data={data}
        onSelect={(value: string) => console.log(value)}
      />
    </div>
  );
}

const AutoComplete = ({
  data,
  onSelect,
}: {
  data: Array<{ id: string; value: string }>;
  onSelect: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [hide, setHide] = useState(false);
  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    setHide(false);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleSelect = (d: { id: string; value: string }) => {
    onSelect(d.value);
    setInputValue(d.value);
    setHide(true);
    toastService.sendToast({
      title: "Selected",
      description: `You selected: ${d.value}`,
      type: "success",
      position: "topRight",
    });
  };

  const suggestedData = useMemo(
    () =>
      data.filter((d) =>
        d.value.toLowerCase().includes(debouncedValue.toLowerCase())
      ),
    [data, debouncedValue]
  );

  return (
    <>
      <div className="text-2xl font-bold ">Search Auto Complete</div>
      <div className="relative">
        <input
          type="text"
          onChange={handleChange}
          value={inputValue}
          className="w-xl border border-gray-300 rounded px-4 py-2 font-bold bg-white text-black"
        />
        {debouncedValue && (
          <button
            className="absolute right-2 top-1/7 text-black font-bold cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
            onClick={handleClear}
          >
            X
          </button>
        )}
      </div>
      {debouncedValue && !hide && (
        <SuggestionList data={suggestedData} onSelect={handleSelect} />
      )}
    </>
  );
};

const SuggestionList = ({
  data,
  onSelect,
}: {
  data: Array<{ id: string; value: string }>;
  onSelect: (data: { id: string; value: string }) => void;
}) => {
  return (
    <div className="w-xl bg-amber-100 text-black flex flex-col items-center justify-center">
      {data.map((d) => (
        <button
          className="border border-gray-300 px-2 py-1 hover:bg-amber-200 w-full text-left"
          key={d.id}
          onClick={() => onSelect(d)}
        >
          {d.value}
        </button>
      ))}
    </div>
  );
};

export default AutoPage;
