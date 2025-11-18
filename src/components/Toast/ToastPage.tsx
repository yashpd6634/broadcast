import toastService from "../../services/ToastService";

const ToastPage = () => {
  return (
    <div className="h-screen w-screen bg-black/60 flex flex-col items-center justify-center">
      <div className="text-5xl font-bold">Toast Page</div>
      <button
        className="my-8 border-2 border-white px-6 py-3 rounded-lg cursor-pointer text-white hover:bg-white hover:text-black transition-all"
        onClick={() =>
          toastService.sendToast({
            title: "Sample Notification",
            description: "This is a sample notification",
            type: "info",
            position: "topRight",
          })
        }
      >
        Show Notification
      </button>
    </div>
  );
};

export default ToastPage;
