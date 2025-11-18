import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Notification from "../components/Toast/Notification/Notification";
import toastService from "../services/ToastService";

const ToastContext = createContext({});

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<any>>([]);
  const [removingToasts, setRemovingToasts] = useState<Set<string>>(new Set());

  const addNotification = useCallback(
    ({
      title,
      description,
      type,
      cta,
      position,
    }: {
      title: string;
      description?: string;
      type: string;
      cta?: string;
      position?: string;
    }) => {
      const toast = {
        id: Date.now().toString(),
        title,
        description,
        type,
        cta,
        position,
      };

      setToasts((prevToasts) => [...prevToasts, toast]);
    },
    []
  );

  useEffect(() => {
    toastService.registerNotification(addNotification);
  }, []);

  const removeNotification = useCallback((id: string) => {
    // Mark as removing to apply exit animation
    setRemovingToasts((prev) => new Set(prev).add(id));

    // Remove after animation completes
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      setRemovingToasts((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300); // Match animation duration
  }, []);

  

  const position: PositionType =
    toasts.length > 0 ? toasts[0].position : "topRight";

  const getAnimationClass = (toast: any) => {
    const isRemoving = removingToasts.has(toast.id);
    const isRight =
      toast.position === "topRight" || toast.position === "bottomRight";

    if (isRemoving) {
      return isRight ? "notification-exit-right" : "notification-exit-left";
    }
    return isRight ? "notification-enter-right" : "notification-enter-left";
  };

  return (
    <ToastContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div
        className={`fixed z-50 flex flex-col gap-4 ${positionMap[position]}`}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className={getAnimationClass(toast)}>
            <Notification
              {...toast}
              onRemove={() => removeNotification(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const positionMap = {
  topRight: "top-25 right-2.5",
  topLeft: "top-25 left-2.5",
  bottomRight: "bottom-10 right-2.5",
  bottomLeft: "bottom-10 left-2.5",
};

type PositionType = "topRight" | "topLeft" | "bottomRight" | "bottomLeft";

type NotificationContextType = {
  addNotification: (notification: {
    title: string;
    description: string;
    type: string;
    position: string;
  }) => void;
  // add other properties if needed
};

export const useNotification = (): NotificationContextType => {
  return useContext(ToastContext) as NotificationContextType;
};

export default ToastProvider;
