import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

const iconMap = {
  success: <CheckCircle className="text-green-600 w-6 h-6" />,
  error: <XCircle className="text-red-600 w-6 h-6" />,
  warning: <AlertTriangle className="text-amber-500 w-6 h-6" />,
  info: <Info className="text-blue-600 w-6 h-6" />,
};

const styleMap = {
  success: {
    container: "border-2 border-green-400 bg-green-300/25",
    progressBar: "bg-green-600",
  },
  error: {
    container: "border-2 border-red-400 bg-red-300/25",
    progressBar: "bg-red-600",
  },
  warning: {
    container: "border-2 border-amber-400 bg-amber-300/25",
    progressBar: "bg-amber-600",
  },
  info: {
    container: "border-2 border-blue-400 bg-blue-300/25",
    progressBar: "bg-blue-600",
  },
};

const Notification = ({
  id = "",
  title = "",
  description = "",
  type = "error",
  onRemove = () => {},
  cta = "",
}: {
  id: string;
  title: string;
  description?: string;
  type?: NotificationType;
  onRemove?: (id: string) => void;
  cta?: any;
}) => {
  return (
    <div
      className={`p-6 rounded-xl flex flex-col w-md relative ${styleMap[type].container}`}
    >
      <button
        onClick={() => onRemove(id)}
        className="absolute right-6 cursor-pointer"
      >
        X
      </button>
      <div className="flex items-start w-[90%] gap-4">
        <div className="flex items-start gap-4 w-full">
          {iconMap[type]}
          <div className="flex flex-col gap-2 text-left">
            <span>{title}</span>
            {!!description && <span>{description}</span>}
          </div>
        </div>
        {!!cta && <div className="max-w-full max-h-full">{cta}</div>}
      </div>
      <div
        className={`w-full h-2.5 absolute bottom-0 left-0 rounded-b-xl ${styleMap[type].progressBar}`}
      ></div>
    </div>
  );
};

export default Notification;
